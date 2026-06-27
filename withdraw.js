import { auth, db } from "./config.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

function shakeField(field){

field.style.border=
"2px solid #ef4444";

field.animate(
[
{transform:"translateX(-6px)"},
{transform:"translateX(6px)"},
{transform:"translateX(-6px)"},
{transform:"translateX(6px)"},
{transform:"translateX(0px)"}
],
{
duration:400
}
);

setTimeout(()=>{

field.style.border=
"none";

},1000);

}

document.getElementById(
"withdrawBtn"
).onclick = async () => {

const nameField=
document.getElementById(
"name"
);

const numberField=
document.getElementById(
"number"
);

const bankField=
document.getElementById(
"bank"
);

const amountField=
document.getElementById(
"amount"
);

const btn=
document.getElementById(
"withdrawBtn"
);

const name=
nameField.value;

const number=
numberField.value;

const bank=
bankField.value;

const amount=
amountField.value;

let hasError=false;

[
nameField,
numberField,
bankField,
amountField
]
.forEach(field=>{

if(
!field.value.trim()
){

shakeField(field);

hasError=true;

}

});

if(hasError){

btn.innerText=
"Fill all fields";

setTimeout(()=>{

btn.innerText=
"Withdraw";

},2000);

return;

}

const user=
auth.currentUser;

if(!user){

btn.innerText=
"Not logged in";

setTimeout(()=>{

btn.innerText=
"Withdraw";

},2000);

return;

}

btn.innerText=
"Submitting...";

await addDoc(

collection(
db,
"withdrawals"
),

{

uid:user.uid,
name,
number,
bank,
amount,

status:"Pending",

date:Date.now()

}

);

btn.innerText=
"Submitted ✓";

setTimeout(()=>{

btn.innerText=
"Withdraw";

},2500);

};
