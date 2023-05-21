document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const messagesContainer = document.getElementById("messages");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageVal = messageInput.value.trim();
    if (messageVal) {
      // Send the message to the server
      let messageObj = {
        message: messageVal,
        senderId: sessionStorage.getItem("userId"),
        receiverId: "6468de59b3011c7fa306e8b5",
      };
      socket.emit("chatMessage", messageObj);
      messageInput.value = "";
    }
  });

  // Event listener for receiving messages from the server
  socket.on("message", (messageObj) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = messageObj.message;
    messagesContainer.appendChild(messageElement);
  });
});
