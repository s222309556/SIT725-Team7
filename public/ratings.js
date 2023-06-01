var points = 0;
var tier = "Browns";

// Function to add points
// function addPoints() {
//  points += 5;
//  document.getElementById("points").innerHTML = points;
// updateProgressBars();
// updateTier();
//}

// Function to add points
// Function to add points
async function addPoints() {
  points += 5;
  document.getElementById("points").innerHTML = points;
  updateProgressBars();
  updateTier();

  // Get the current userId from session storage
  let userId = sessionStorage.getItem("userId");

  // Make sure the userId is not null before making the request
  if (userId) {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/points`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: points }), // Here you can replace 5 with any number of points you want to add
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.error('User is not logged in.');
  }
}



// Function to update progress bars
function updateProgressBars() {
  var nextTierPoints = (tier == "Browns" ? 10 : (tier == "Silver" ? 20 : (tier == "Gold" ? 30 : 40)));
  document.getElementById("pointsProgressToNextTier").value = (points % nextTierPoints);
  document.getElementById("pointsProgressToVoucher").value = (points % 50);
  document.getElementById("pointsProgressToBook").value = (points % 100);
}

// Function to update tier
function updateTier() {
  if (points > 30) {
    tier = "Platinum";
  } else if (points > 20) {
    tier = "Gold";
  } else if (points > 10) {
    tier = "Silver";
  } else {
    tier = "Browns";
  }
  document.getElementById("tier").innerHTML = tier;
}

// Function to redeem points
function redeemPoints() {
  var redeemValue = document.getElementById("redeemSelect").value;
  if (points >= redeemValue) {
    // Generate random voucher code
    var voucherCode = Math.floor(1000 + Math.random() * 9000);
    alert("Your voucher code is: " + voucherCode);
    points -= redeemValue;
    document.getElementById("points").innerHTML = points;
    updateProgressBars();
    updateTier();
  } else {
    alert("You don't have enough points to redeem.");
  }
}
