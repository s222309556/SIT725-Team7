var userId;
var orderId;
var sellerId;
var buyerId;
var orderName;
var orderStatus;
var orderDate;
var orderDeliveryMethod;

var seller;
var buyer;

document.addEventListener("DOMContentLoaded", function () {
  checkSession();
  fetchOrderDetails();
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
      const order = res.data;
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

          document.getElementById("orderName").innerText = orderName;
          document.getElementById("orderStatus").innerText = orderStatus;
          document.getElementById("orderDate").innerText = orderDate;
          document.getElementById("orderDeliveryMethod").innerText =
            orderDeliveryMethod;
          if (userId == sellerId) {
            document.getElementById("orderBuySellName").innerText =
              "Buyer Name : " + buyer.name;
          } else {
            document.getElementById("orderBuySellName").innerText =
              "Seller Name : " + seller.name;
            //hide acceptButton
            document.getElementById("acceptButton").style.display = "none";
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
