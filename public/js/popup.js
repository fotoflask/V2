console.log("work")

document.querySelector("#open-fpopup").addEventListener("click",function(){
    document.body.classList.add("active-fpopup");
    console.log("clicked")

});
document.querySelector(".fpopup  .close-btn").addEventListener("click",function(){
    document.body.classList.remove("active-fpopup");

});

const wrapper = document.querySelector(".fwrapper");
            const fileName = document.querySelector(".file-name");
            const defaultBtn = document.querySelector("#default-btn");
            const customBtn = document.querySelector("#custom-btn");
            const cancelBtn = document.querySelector("#cancel-btn i");
            const img = document.querySelector(".fimage img");
            let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
            function defaultBtnActive(){
              defaultBtn.click();
            }
            defaultBtn.addEventListener("change", function(){
              const file = this.files[0];
              if(file){
                const reader = new FileReader();
                reader.onload = function(){
                  const result = reader.result;
                  img.src = result;
                  wrapper.classList.add("active");
                }
                cancelBtn.addEventListener("click", function(){
                  img.src = "";
                  document.getElementById("f4").reset();
                  wrapper.classList.remove("active");
                })
                reader.readAsDataURL(file);
              }
              if(this.value){
                let valueStore = this.value.match(regExp);
                fileName.textContent = valueStore;
              }
            });