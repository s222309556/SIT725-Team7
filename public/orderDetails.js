var userId;
var orderId;
var order;
var sellerId;
var buyerId;
var orderName;
var orderStatus;
var orderDate;
var orderDeliveryMethod;

var seller;
var buyer;
var socket;
var otherEndName;
var otherEndId;

document.addEventListener("DOMContentLoaded", function () {
  socket = io();
  checkSession();
  fetchOrderDetails();
  handleAccept();
  handleReject();
  handleOpenChat();
  handleCloseChat();
});

//check session is set
function checkSession() {
  userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    window.location.href = "/login.html";
  }
}

async function fetchOrderDetails() {
  try {
    // Get the order ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    orderId = urlParams.get("id");

    if (!orderId) {
      console.error("Order ID is missing in the URL.");
      return;
    }
    const response = await fetch(`/orders/${orderId}`);
    const res = await response.json();
    if (res.success) {
      order = res.data;
      sellerId = order.sellerId;
      buyerId = order.buyerId;
      orderStatus = order.status;
      orderName = order.orderName;
      orderDate = order.date;
      orderDeliveryMethod = order.deliveryMethod;

      //Get seller details
      const responseSeller = await fetch(`/users/${sellerId}`);
      const resSeller = await responseSeller.json();
      if (resSeller.success) {
        seller = resSeller.data;

        //Get Buyer details
        const responseBuyer = await fetch(`/users/${buyerId}`);
        const resBuyer = await responseBuyer.json();
        if (resBuyer.success) {
          buyer = resBuyer.data;

          if (order.status == "Accepted" || order.status == "Pending") {
            document.getElementById("acceptCompletButton").innerText =
              "Complete";
          } else if (order.status == "Completed") {
            document.getElementById("acceptCompletButton").style =
              "display:none";
            document.getElementById("rejectButton").style = "display:none";
          }

          document.getElementById("orderName").innerText = orderName;
          document.getElementById("orderStatus").innerText =
            "Status : " + orderStatus;
          document.getElementById("orderDate").innerText =
            "Date : " + orderDate;
          document.getElementById("orderDeliveryMethod").innerText =
            "Delivery Method : " + orderDeliveryMethod;
          if (userId == sellerId) {
            document.getElementById("orderBuySellName").innerText =
              "Buyer Name : " + buyer.name;
            otherEndName = buyer.userName;
            otherEndId = buyerId;
            if (orderStatus == "Pending" && order.isSenderCompleted) {
              //if seller has completed the order then hide the button for seller
              document.getElementById("acceptCompletButton").style =
                "display:none";
            }
          } else {
            document.getElementById("orderBuySellName").innerText =
              "Seller Name : " + seller.name;
            otherEndName = seller.userName;
            otherEndId = sellerId;
            if (orderStatus == "Pending" && order.isSenderCompleted) {
              //if seller has completed the order then show 'Complete' button to buyer
              document.getElementById("acceptCompletButton").innerHTML =
                "Complete";
            } else {
              document.getElementById("acceptCompletButton").style =
                "display:none";
            }
          }
        } else {
          console.error(resBuyer.message);
        }
      } else {
        console.error(resSeller.message);
      }
    } else {
      console.error(res.message);
    }
  } catch (error) {
    console.error(error);
  }
}

function handleAccept() {
  document
    .getElementById("acceptCompletButton")
    .addEventListener("click", async () => {
      try {
        let req = {};
        if (order.status == "Accepted" || order.status == "Pending") {
          if (userId == sellerId) {
            if (order.isReceiverCompleted) {
              req = {
                status: "Completed",
                isSenderCompleted: true,
              };
            } else {
              req = {
                status: "Pending",
                isSenderCompleted: true,
              };
            }
          } else if (userId == buyerId) {
            if (order.isSenderCompleted) {
              req = {
                status: "Completed",
                isReceiverCompleted: true,
              };
            } else {
              req = {
                status: "Pending",
                isReceiverCompleted: true,
              };
            }
          }
        } else {
          req = {
            status: "Accepted",
          };
        }

        const response = await fetch(`/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });
        const res = await response.json();
        if (res.success) {
          //updateBook
          if (req.status == "Accepted") {
            const responseBook = await fetch(`/books/${order.bookId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isActive: false,
              }),
            });
            const resBook = await responseBook.json();
            if (resBook.success) {
              console.log("Book updated");
            } else {
              console.error(resBook.message);
            }
          }

          /////////////Point Calculation/////////////////////
          // if req.status == "Completed" then calculate points
          ////LOGIC////////
          //Call the API to calculate points

          //reload page
          window.location.reload();
        } else {
          console.error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    });
}

//function to 'rejectButton'
function handleReject() {
  document
    .getElementById("rejectButton")
    .addEventListener("click", async () => {
      try {
        const response = await fetch(`/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Rejected",
          }),
        });
        const res = await response.json();
        if (res.success) {
          //updateBook
          const responseBook = await fetch(`/books/${order.bookId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isActive: true,
            }),
          });
          const resBook = await responseBook.json();
          if (resBook.success) {
            console.log("Book updated");
          } else {
            console.error(resBook.message);
          }
          //reload page
          window.location.reload();
        } else {
          console.error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    });
}

function handleOpenChat() {
  document.getElementById("chatBtn").addEventListener("click", function () {
    document.getElementById("chatBox").style.display = "block";
    loadMessageHistory();
  });

  document.getElementById("sendBtn").addEventListener("click", function () {
    var userInput = document.getElementById("userInput");
    var message = userInput.value;
    if (message.trim() !== "") {
      // Send the message to the server
      let messageObj = {
        senderId: userId,
        receiverId: otherEndId,
        orderId: orderId,
        message: message,
      };
      socket.emit("chatMessage", messageObj);

      var messagesContainer = document.getElementById("messages");
      messagesContainer.innerHTML +=
        "<div class='message'><span style='font-style: italic;'>You:</span> " +
        message +
        "</div>";
      userInput.value = "";
    }
  });
}

function loadMessageHistory() {
  //POST message/messageHistory
  fetch("/messages/messageHistory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId: orderId,
    }),
  }).then((r) => {
    r.json().then((res) => {
      if (res.success) {
        let messages = res.data;
        for (let i = 0; i < messages.length; i++) {
          var messagesContainer = document.getElementById("messages");
          messagesContainer.innerHTML += populateMessage(messages[i]);
        }
      } else {
        console.error(data.message);
      }
    });
  });
}

function populateMessage(message) {
  let messageHtml = "";
  if (message.senderId == userId) {
    messageHtml =
      "<div class='message'><span style='font-style: italic;'>You : </span> " +
      message.message +
      "</div>";
  } else {
    messageHtml =
      "<div class='message'><span style='font-weight: bold;'>" +
      otherEndName +
      " : </span> " +
      message.message +
      "</div>";
  }
  return messageHtml;
}

function handleCloseChat() {
  document.getElementById("closeBtn").addEventListener("click", function () {
    document.getElementById("chatBox").style.display = "none";
  });
}
