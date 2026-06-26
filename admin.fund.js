import { db }
from "./config.js";

import {

collection,
getDocs,
doc,
setDoc,
increment,
addDoc

}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const status=
document.getElementById("status");

document.getElementById("fundBtn").onclick=
async()=>{

const uid=
document.getElementById("email")
.value.trim();

const amount=
Number(
document.getElementById("amount")
.value
);

if(!uid||!amount){

status.innerText=
"Enter UID and amount";

return;

}

status.innerText=
"Funding...";

try{

const snap=
await getDocs(
collection(db,"users")
);

let foundUser=null;

snap.forEach(d=>{

const data=d.data();

if(
data.uid===uid ||
d.id===uid
){

foundUser={
id:d.id,
...data
};

}

});

if(!foundUser){

status.innerText=
"User not found";
return;

}

await setDoc(

doc(
db,
"wallets",
uid
),

{

balance:
increment(amount)

},

{
merge:true
}

);

await addDoc(

collection(
db,
"transactions"
),

{

uid:uid,
email:
foundUser.email || "",

amount:amount,

type:
"Admin Funding",

status:
"Completed",

date:
new Date()

}

);

status.innerText=
"Funding successful";

}
catch(error){

console.log(error);

status.innerText=
error.message;

}

};
