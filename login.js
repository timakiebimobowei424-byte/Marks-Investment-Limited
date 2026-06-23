import {auth}
from "./config.js";

import {

signInWithEmailAndPassword,
sendPasswordResetEmail

}

from
"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


document
.getElementById(
"loginBtn"
)

.onclick=async()=>{

const email=
document.getElementById(
"email"
).value;

const password=
document.getElementById(
"password"
).value;

try{

const user=
await signInWithEmailAndPassword(

auth,
email,
password

);

if(

!user.user.emailVerified

){

alert(
"Verify your email first"
);

return;

}

window.location=
"dashboard.html";

}

catch(error){

alert(error.message);

}

};


document
.getElementById(
"forgotBtn"
)

.onclick=async()=>{

const email=
document.getElementById(
"email"
).value;

if(!email){

alert(
"Enter your email first"
);

return;

}

await sendPasswordResetEmail(
auth,
email
);

alert(
"Password reset link sent"
);

};