// script.js
var userId;
document.addEventListener("DOMContentLoaded", async function () {
  userId = sessionStorage.getItem("userId");
  console.log(userId);
  try {
    //Get sent orderList
    const response = await fetch(`/orders/buyerId/${userId}`);
    const data = await response.json();
    if (data.success) {
      const orderList = data.data;
      const orderListContainer = document.getElementById("sendOrderList");

      if (orderList.length > 0) {
        orderList.forEach(function (order) {
          const orderItem = document.createElement("div");
          orderItem.innerHTML = `
              <h3>Order ID: ${order.orderName}</h3>
              <p>Status: ${order.status}</p>
              <hr>
            `;
          orderListContainer.appendChild(orderItem);
        });
      } else {
        orderListContainer.innerHTML = "<p>No orders found.</p>";
      }
    } else {
      alert(data.message);
    }

    //Get received orderList
    const response2 = await fetch(`/orders/sellerId/${userId}`);
    const data2 = await response2.json();
    if (data2.success) {
      const orderList = data2.data;
      const orderListContainer = document.getElementById("receiveOrderList");

      if (orderList.length > 0) {
        orderList.forEach(function (order) {
          const orderItem = document.createElement("div");
          orderItem.innerHTML = `
                <h3>Order Name: ${order.orderName}</h3>
                <p>Status: ${order.status}</p>
                <hr>
                `;
          orderListContainer.appendChild(orderItem);
        });
      } else {
        orderListContainer.innerHTML = "<p>No orders found.</p>";
      }
    } else {
      alert(data2.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("An error occurred while retrieving the orders.");
  }
});
