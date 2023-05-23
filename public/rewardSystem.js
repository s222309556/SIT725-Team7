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