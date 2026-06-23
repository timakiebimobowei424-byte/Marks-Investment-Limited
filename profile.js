import { auth, db } from "./config.js";

import {
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firstName =
document.getElementById("firstName");

const surname =
document.getElementById("surname");

const email =
document.getElementById("email");

const phone =
document.getElementById("phone");

const updateBtn =
document.getElementById("updateBtn");


onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location="login.html";
return;

}

const ref=doc(
db,
"profiles",
user.uid
);

const snap=
await getDoc(ref);

if(snap.exists()){

const data=snap.data();

firstName.value=
data.firstName||"";

surname.value=
data.surname||"";

email.value=
data.email||"";

phone.value=
data.phone||"";

}

});


updateBtn.onclick=async()=>{

const user=
auth.currentUser;

await setDoc(

doc(
db,
"profiles",
user.uid
),

{

firstName:firstName.value,
surname:surname.value,
email:email.value,
phone:phone.value

}

);

alert(
"Profile updated successfully"
);

};