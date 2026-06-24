import { auth }
from "./config.js";

import {
sendPasswordResetEmail
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const modal =
document.getElementById(
"forgotModal"
);

document.getElementById(
"forgotBtn"
).onclick=()=>{

modal.style.display="flex";

};

document.getElementById(
"closeModal"
).onclick=()=>{

modal.style.display="none";

};

document.getElementById(
"sendReset"
).onclick=async()=>{

const email=
document.getElementById(
"resetEmail"
).value;

if(!email){

alert(
"Enter email"
);

return;

}

try{

await sendPasswordResetEmail(
auth,
email
);

alert(
"Reset email sent successfully"
);

modal.style.display=
"none";

}catch(error){

alert(
error.message
);

}

};
