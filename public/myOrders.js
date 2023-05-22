// script.js
var userId;
//check session is set

document.addEventListener("DOMContentLoaded", function () {
  if (!checkSession()) return;
  fetchOrders();
});

function checkSession() {
  userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    window.location.href = "/login.html";
    return false;
  }
}

async function fetchOrders() {
  try {
    //Get sent orderList
    const response = await fetch(`/orders/buyerId/${userId}`);
    const data = await response.json();
    if (data.success) {
      const orderList = data.data;
      populateOrders(orderList, "sent-orders-container");
    } else {
      alert(data.message);
    }

    //Get received orderList
    const response2 = await fetch(`/orders/sellerId/${userId}`);
    const data2 = await response2.json();
    if (data2.success) {
      const orderList = data2.data;
      populateOrders(orderList, "received-orders-container");
    } else {
      alert(data2.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("An error occurred while retrieving the orders.");
  }
}

function populateOrders(orders, element) {
  // Get the container element where the received orders will be appended
  const container = document.getElementById(element);

  // If there are no received orders, display a message
  if (orders.length === 0) {
    const noOrdersMessage = document.createElement("p");
    noOrdersMessage.innerText = "No orders found.";
    container.appendChild(noOrdersMessage);
    return;
  }

  // Iterate over the receivedOrders array
  orders.forEach((order) => {
    // Create the main container for each received order
    const orderContainer = document.createElement("div");
    orderContainer.style.cssText =
      "background-color: #fff; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); width:300px; margin-right:20px; text-align:center; float:left;";

    // Create the order details
    const orderTitle = document.createElement("h3");
    const orderDate = document.createElement("p");
    const orderStatus = document.createElement("p");

    orderTitle.innerText = `${order.orderName}`;
    orderTitle.style.cssText = "font-size: 1.2rem; margin-bottom: 10px;";

    orderDate.innerText = `Date: ${order.date}`;
    orderDate.style.cssText =
      "font-size: 1rem; color: #777; margin-bottom: 10px;";

    orderStatus.innerText = `Status: ${order.status}`;
    orderStatus.style.cssText =
      "font-size: 1rem; color: #777; margin-bottom: 10px;";

    orderContainer.appendChild(orderTitle);
    orderContainer.appendChild(orderDate);
    orderContainer.appendChild(orderStatus);

    // Create the buttons
    //Don't show Accept button for sent orders

    if (element === "received-orders-container") {
      const acceptButton = createButton("Accept", "orderDetails.html");
      orderContainer.appendChild(acceptButton);
    }
    const rejectButton = createButton("Reject", "orderDetails.html");
    const viewOrderButton = createButton(
      "View Order",
      "orderDetails.html?id=" + order._id
    );

    orderContainer.appendChild(rejectButton);
    orderContainer.appendChild(viewOrderButton);

    // Append the order container to the main container
    container.appendChild(orderContainer);
  });

  // Helper function to create a button element
  function createButton(text, href) {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.cssText =
      "padding: 10px 20px; font-size: 1rem; background-color: #ddd; border: none; border-radius: 5px; cursor: pointer; margin: 5px";
    button.addEventListener("click", () => {
      window.location.href = href;
    });
    const link = document.createElement("a");
    link.href = href;
    link.style.textDecoration = "none";
    link.appendChild(button);
    return link;
  }
}
