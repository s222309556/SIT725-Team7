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
  