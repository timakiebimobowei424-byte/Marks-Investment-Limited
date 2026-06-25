import { db,auth }
from "./config.js";

import {
collection,
getDocs,
query,
where
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
signOut
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

async function loadStats(){

try{

const users=
await getDocs(
collection(db,"users")
);

document
.getElementById("totalUsers")
.innerText=
users.size;

const deposits=
await getDocs(
query(
collection(
db,
"deposits"
),
where(
"status",
"==",
"pending"
)
)
);

document
.getElementById(
"pendingDeposits"
)
.innerText=
deposits.size;

const withdrawals=
await getDocs(
query(
collection(
db,
"withdrawals"
),
where(
"status",
"==",
"pending"
)
)
);

document
.getElementById(
"pendingWithdrawals"
)
.innerText=
withdrawals.size;

const transactions=
await getDocs(
collection(
db,
"transactions"
)
);

document
.getElementById(
"transactions"
)
.innerText=
transactions.size;

}
catch(error){

console.log(error);

}

}

loadStats();

document
.getElementById(
"logoutBtn"
)
.onclick=
async()=>{

await signOut(auth);

window.location=
"admin.login.html";

};
