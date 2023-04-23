document.querySelector("#open-popup").addEventListener("click",function(btn){
    btn.preventDefault();
    document.getElementById('media-section').classList.add("active-popup");

});
document.querySelector("#cancel-btn").addEventListener("click",function(btn){
    btn.preventDefault();
    document.getElementById('media-section').classList.remove("active-popup");

});

document.querySelector('#paymentsubmitbtn').addEventListener("click",()=>{
    console.log("HHHHASDADS")
    window.location.href = '/home';
})