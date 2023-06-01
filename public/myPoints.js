var userId;
var user;
document.addEventListener("DOMContentLoaded", function () {
  // Fetch and display the list of books
  checkSession();
  getUserById();
  getLeaderBoard();
  handleRedeemButton();
});

//check session is set
function checkSession() {
  userId = sessionStorage.getItem("userId");
  if (!userId) {
    // Session is set, user is logged in
    // Redirect to the addBook.html page
    window.location.href = "/login.html";
    return false;
  }
}

//app.get("/users/:id", userController.getUserById);
function getUserById() {
  fetch("/users/" + userId)
    .then((response) => response.json())
    .then((res) => {
      user = res.data;
      renderProfileInfo();
    })
    .catch((error) => console.error("Error:", error));
}

function getLeaderBoard() {
  const leaders = document.getElementById("leaders");
  fetch("/topusers")
    .then((response) => response.json())
    .then((res) => {
      let users = res.data;
      console.log(users);
      users.forEach((user) => {
        const container = document.createElement("div");
        container.style =
          "display: inline-block; background-color: #f9f9f9; padding: 10px; border-radius: 10px; margin-right: 10px; margin-top: 10px;";
        const details = document.createElement("div");
        const name = document.createElement("span");
        name.style = "font-size: 1.2rem; color: #333;";
        name.innerText = user.name;
        const points = document.createElement("p");
        points.style = "font-size: 1rem; color: #777;";
        points.innerText = user.totalPoints + " points";
        const numberOfExchanged = document.createElement("p");
        numberOfExchanged.style = "font-size: 1rem; color: #777;";
        numberOfExchanged.innerText =
          "Books exchanged : " + Math.round(user.totalPoints / 5);
        const tier = document.createElement("div");
        tier.style =
          "background-color: #f1f1f1; padding: 5px 10px; border-radius: 5px; margin-top: 10px;";
        const tierText = document.createElement("span");
        tierText.style = "font-size: 1rem; color: #777;";
        tierText.innerText = "Tier :" + user.profileLevel;
        tier.appendChild(tierText);

        details.appendChild(name);
        details.appendChild(points);
        details.appendChild(numberOfExchanged);
        details.appendChild(tier);
        container.appendChild(details);
        leaders.appendChild(container);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function renderProfileInfo() {
  document.getElementById("currentPoints").innerText = user.totalPoints;
  document.getElementById("redeemPoints").innerText =
    "Points available to redeem : " + user.redeemPoints;
  document.getElementById("currentTier").innerText =
    "My Tier : " + user.profileLevel;
  document.getElementById("pointsToNextTier").innerText =
    calculatePointsToNextTier(user.totalPoints);
  document.getElementById("pointsToNextVoucher").innerText =
    calculatePointsToNextVocher(user.redeemPoints);
  document.getElementById("pointsToFreeBook").innerText =
    calculatePointsToFreeBook(user.redeemPoints);
}

function calculatePointsToNextTier(currentPoints) {
  if (currentPoints >= 100) {
    renderPointsbar("pointsProgressToNextTier", 100, 0);
    return 0;
  } else if (currentPoints >= 50 && currentPoints < 100) {
    let remainingPoints = 100 - currentPoints;
    renderPointsbar("pointsProgressToNextTier", 50, remainingPoints);
    return remainingPoints;
  } else if (currentPoints >= 10 && currentPoints < 50) {
    let remainingPoints = 50 - currentPoints;
    renderPointsbar("pointsProgressToNextTier", 40, remainingPoints);
    return remainingPoints;
  } else if (currentPoints >= 0 && currentPoints < 10) {
    let remainingPoints = 10 - currentPoints;
    renderPointsbar("pointsProgressToNextTier", 10, remainingPoints);
    return remainingPoints;
  }
}

function calculatePointsToNextVocher(currentPoints) {
  if (currentPoints >= 50) {
    renderPointsbar("pointsProgressToVoucher", 100, 0);
    return 0;
  } else if (currentPoints < 50) {
    let remainingPoints = 50 - currentPoints;
    renderPointsbar("pointsProgressToVoucher", 50, remainingPoints);
    return 50 - currentPoints;
  }
}

function calculatePointsToFreeBook(currentPoints) {
  if (currentPoints >= 100) {
    renderPointsbar("pointsProgressToBook", 100, 0);
    return 0;
  } else if (currentPoints < 100) {
    let remainingPoints = 100 - currentPoints;
    renderPointsbar("pointsProgressToBook", 100, remainingPoints);
    return 100 - currentPoints;
  }
}

function renderPointsbar(elementId, totalPoints, value) {
  const bar = document.getElementById(elementId);
  calculated = ((totalPoints - value) / totalPoints) * 100;
  bar.value = calculated;
}

function handleRedeemButton() {
  document
    .getElementById("redeemButton")
    .addEventListener("click", function () {
      const reeemValue = document.getElementById("redeemSelect").value;
      if (reeemValue == 50) {
        redeemVoucher();
      } else if (reeemValue == 100) {
        redeemFreeBook();
      }
    });
}

function redeemVoucher() {
  if (user.redeemPoints >= 50) {
    fetch("/users/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        redeemPoints: user.redeemPoints - 50,
      }),
    }).then((response) => {
      if (response.status == 200) {
        alert("Voucher redeemed. You will receive an email shortly");
        window.location.reload();
      }
    });
  } else {
    alert("Not enough points to redeem voucher");
  }
}

function redeemFreeBook() {
  if (user.redeemPoints >= 100) {
    fetch("/users/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        redeemPoints: user.redeemPoints - 100,
      }),
    }).then((response) => {
      if (response.status == 200) {
        alert("Free book redeemed. You will receive an email shortly");
        window.location.reload();
      }
    });
  } else {
    alert("Not enough points to redeem free book");
  }
}
