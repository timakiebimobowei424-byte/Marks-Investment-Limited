import {auth,db}
from "./config.js";

import {
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document
.getElementById(
"depositBtn"
)

.onclick=async()=>{

const amount=
document
.getElementById(
"amount"
).value;

const method=
document
.getElementById(
"method"
).value;

const user=
auth.currentUser;

if(!amount){

alert(
"Enter amount"
);

return;

}

await addDoc(

collection(
db,
"transactions"
),

{

uid:user.uid,
type:"Deposit",
amount:amount,
method:method,
status:"Pending",
date:Date.now()

}

);

alert(
"Deposit submitted for approval"
);

window.location=
"transactions.html";

};