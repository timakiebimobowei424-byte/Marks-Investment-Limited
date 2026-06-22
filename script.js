const modal = document.getElementById("registerModal");

document.getElementById("openRegister").onclick =
() => modal.style.display = "block";

document.getElementById("heroRegister").onclick =
() => modal.style.display = "block";

document.getElementById("closeModal").onclick =
() => modal.style.display = "none";

window.onclick = function(e){
if(e.target == modal){
modal.style.display = "none";
}
}