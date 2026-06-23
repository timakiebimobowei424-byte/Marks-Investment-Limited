import {auth}
from "./config.js";

import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

document
.getElementById("loginBtn")
.onclick=async()=>{

const email=
document.getElementById("email").value;

const password=
document.getElementById("password").value;

try{

const user=
await signInWithEmailAndPassword(
auth,
email,
password
);

window.location.href=
"dashboard.html";

}

catch(error){

alert(error.message);

}

};