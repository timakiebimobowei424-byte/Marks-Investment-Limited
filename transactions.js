import { auth, db } from "./config.js";

import {
collection,
query,
where,
getDocs
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location="login.html";
return;

}

const container=
document.getElementById(
"transactionsList"
);

container.innerHTML="Loading...";

const q=query(
collection(db,"transactions"),
where("uid","==",user.uid)
);

const snapshot=
await getDocs(q);

container.innerHTML="";

if(snapshot.empty){

container.innerHTML=
"<p>No transactions found</p>";

return;

}

snapshot.forEach(doc=>{

const data=doc.data();

container.innerHTML += `

<div class="row">

<div>
${data.type}
</div>

<div>
$${data.amount}
</div>

</div>

`;

});

});