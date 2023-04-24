            // console.log("HH");
            var modal = document.getElementById("myModal");

            // Get the image and insert it inside the modal - use its "alt" text as a caption
            var img_d = document.getElementById("profilepic");
            var modalImg_d = document.getElementById("img01");
           

            img_d.onclick = function(){
                console.log("clicked pic"+img_d.src)
                modalImg_d.src = img_d.src;
                console.log(modalImg_d.src+"");
            modal.style.display = "block";
            // captionText.innerHTML = this.alt;
            }

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }