import {db}
from "./config.js";

import {
collection,
query,
where,
getDocs,
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const list =
document.getElementById(
"depositList"
);

async function load(){

const q=query(
collection(db,"transactions"),
where("status","==","Pending")
);

const snap=
await getDocs(q);

list.innerHTML="";

if(snap.empty){

list.innerHTML=
"No pending deposits";

return;

}

snap.forEach(d=>{

const data=d.data();

list.innerHTML+=`

<div class="card">

<p>Amount: $${data.amount}</p>

<p>Method: ${data.method}</p>

<button
onclick="approve('${d.id}')">

Approve

</button>

</div>

`;

});

}

window.approve=
async(id)=>{

await updateDoc(
doc(db,"transactions",id),
{
status:"Approved"
}
);

alert(
"Deposit approved"
);

load();

};

load();
