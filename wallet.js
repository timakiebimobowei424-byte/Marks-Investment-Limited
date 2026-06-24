import { auth, db } from "./config.js";

import {
doc,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

onAuthStateChanged(auth,(user)=>{

if(!user){

window.location="login.html";
return;

}

const walletRef=
doc(
db,
"wallets",
user.uid
);

onSnapshot(
walletRef,
(snapshot)=>{

if(snapshot.exists()){

const data=
snapshot.data();

document.getElementById(
"balance"
).innerText=

"$" +

Number(
data.balance||0
).toLocaleString();

}

}

);

});
