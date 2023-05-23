// User data
let userData = {
    points: 0
  };
  
  // Add mapping from points to ratings
  const pointsToRating = {
    0: 'Bronze',
    20: 'Silver',
    30: 'Gold'
  };
  
  // Update rating dynamically
  function getRating(points) {
    if (points < 20) {
        return 'Bronze';
    } else if (points < 30) {
        return 'Silver';
    } else {
        return 'Gold';
    }
  }

  // Update points display
function updatePointsDisplay() {
    // Get the points display and progress bar elements
    let pointsDisplay = document.getElementById('user-points');
    let progressBar = document.querySelector('.progress-bar');
  
    // Calculate the new width of the progress bar
    let newWidth = (userData.points / 100) * 100;
  
    // Animate the points display and progress bar
    pointsDisplay.textContent = `${userData.points} Points`;
    progressBar.style.width = `${newWidth}%`;
    progressBar.setAttribute('aria-valuenow', newWidth);
  
    // Update user rating
    let userRating = document.getElementById('user-rating');
    userRating.textContent = getRating(userData.points);
    userRating.className = getRating(userData.points).toLowerCase();
  }
  
  // Create card to display user's current points and progress
  let pointsCard = document.createElement('div');
  pointsCard.className = 'col-lg-4 mb-4';
  pointsCard.innerHTML = `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Your Points</h5>
      <p class="card-text" id="user-points">${userData.points} Points</p>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: ${(userData.points / 100) * 100}%" aria-valuenow="${(userData.points / 100) * 100}" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  </div>
  `;


  // Create card to show rating and points
let ratingsCard = document.createElement('div');
ratingsCard.className = 'col-lg-4 mb-4';
ratingsCard.innerHTML = `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Profile Ratings</h5>
    <p class="card-text">
      <i class="fa fa-trophy gold"></i> Gold: 30 Points <br>
      <i class="fa fa-trophy silver"></i> Silver: 20 Points <br>
      <i class="fa fa-trophy bronze"></i> Bronze: 10 Points
    </p>
    <p class="card-text">Your rating: <span id="user-rating" class="${getRating(userData.points).toLowerCase()}">${getRating(userData.points)}</span></p>
  </div>
</div>
`;


// Create card to exchange a book
let exchangeCard = document.createElement('div');
exchangeCard.className = 'col-lg-4 mb-4';
exchangeCard.innerHTML = `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Exchange a Book</h5>
    <form id="exchange-form">
      <div class="form-group">
        <label for="book-title">Book Title</label>
        <input type="text" class="form-control" id="book-title" placeholder="Enter book title">
      </div>
      <button type="submit" class="btn btn-primary">Exchange</button>
    </form>
  </div>
</div>
`;


// Add cards to the row
let rewardsRow = document.getElementById('rewards-row');
rewardsRow.appendChild(pointsCard);
rewardsRow.appendChild(ratingsCard);
rewardsRow.appendChild(exchangeCard);

// Add event listener to form
let exchangeForm = document.getElementById('exchange-form');
exchangeForm.addEventListener('submit', function(event) {
  event.preventDefault();

  