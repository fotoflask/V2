console.log("FOLLOWJS")

console.log(document.getElementById('followform'))

// document.getElementById('followform').addEventListener('submit', async (event) => {
//     console.log("INFOLLOW");
//     event.preventDefault(); // Prevent form submission

//     try {
//       // Send a POST request to the server with the form data
//       const formData = new FormData(event.target);
//       const response = await fetch('/follow', {
//         method: 'POST',
//         body: formData
//       }); 

//       // Check if the response was successful
//       if (response.ok) {
//         const data = await response.json();
//         console.log(yes); // Confirmation message from the server
//       } else {
//         console.error('Failed to follow user:', response.statusText);
//       }
//     } catch (err) {
//       console.error('Failed to follow user:', err);
//     }
//   });



//   $(document).ready(function(){				

//     $("#follow-button").click(function(){
//         console.log("follow click")
//       if ($("#follow-button").text() == "+ Follow"){
//         // *** State Change: To Following ***      
//         // We want the button to squish (or shrink) by 10px as a reaction to the click and for it to last 100ms    
//         $("#follow-button").animate({ width: '-=10px' }, 100, 'easeInCubic', function () {});
        
//         // then now we want the button to expand out to it's full state
//         // The left translation is to keep the button centred with it's longer width
//         $("#follow-button").animate({ width: '+=45px', left: '-=15px' }, 600, 'easeInOutBack', function () { 
//           $("#follow-button").css("color", "#fff");
//           $("#follow-button").text("Following");
  
//           // Animate the background transition from white to green. Using JQuery Color
//           $("#follow-button").animate({
//             backgroundColor: "#2EB82E",
//             borderColor: "#2EB82E"
//           }, 1000 );
//         });
//       }else{
//         $("#follow-button").animate({ width: '-=25px', left: '+=15px' }, 600, 'easeInOutBack', function () { 
//           $("#follow-button").text("+ Follow");
//           $("#follow-button").css("color", "#3399FF");
//           $("#follow-button").css("background-color", "#ffffff");
//           $("#follow-button").css("border-color", "#3399FF");
//         });
//       }
//     }); 
//   });