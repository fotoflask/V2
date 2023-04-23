document.getElementById('followForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      // Send a POST request to the server with the form data
      const formData = new FormData(event.target);
      const response = await fetch('/follow', {
        method: 'POST',
        body: formData
      });

      // Check if the response was successful
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Confirmation message from the server
      } else {
        console.error('Failed to follow user:', response.statusText);
      }
    } catch (err) {
      console.error('Failed to follow user:', err);
    }
  });