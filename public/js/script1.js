// client.js

// Get the input element for search
const filterInput = document.getElementById('filter');

// Add event listener for input change
filterInput.addEventListener('input', () => {
  const filterValue = filterInput.value.toLowerCase(); // Get the search input value in lowercase
  
  // Get all the user list items
  const userListItems = document.querySelectorAll('.user-list li');

  // Loop through each user list item
  userListItems.forEach(item => {
    const userName = item.querySelector('.user-info h4').innerText.toLowerCase(); // Get the username of each user in lowercase
    
    // Check if the username contains the search input value
    if (userName.includes(filterValue)) {
      item.style.display = 'block'; // Show the user list item if the username matches the search input value
    } else {
      item.style.display = 'none'; // Hide the user list item if the username does not match the search input value
    }
  });
});