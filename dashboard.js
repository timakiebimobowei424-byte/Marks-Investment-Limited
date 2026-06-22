import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
doc,
getDoc,
setDoc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

let currentUser;

// ======================
// AUTH CHECK
// ======================
onAuthStateChanged(auth, async (user) => {

if (!user) {
window.location.href = "login.html";
return;
}

currentUser = user;

document.getElementById("userEmail").innerText = user.email;

// load user data
await loadUserData(user.uid);

});

// ======================
// LOAD USER DATA
// ======================
async function loadUserData(uid) {

const ref = doc(db, "users", uid);
const snap = await getDoc(ref);

// if user doesn't exist, create account
if (!snap.exists()) {

await setDoc(ref, {
email: currentUser.email,
balance: 0,
profit: 0,
invested: 0
});

return loadUserData(uid);
}

const data = snap.data();

document.getElementById("balance").innerText = "₦" + data.balance;
document.getElementById("profit").innerText = "₦" + data.profit;
document.getElementById("invested").innerText = "₦" + data.invested;
}

// ======================
// DEPOSIT
// ======================
document.getElementById("depositBtn").onclick = () => {
document.getElementById("depositModal").style.display = "block";
};

document.getElementById("confirmDeposit").onclick = async () => {

const amount = Number(document.getElementById("depositAmount").value);

if (!amount || amount <= 0) return alert("Invalid amount");

const ref = doc(db, "users", currentUser.uid);

await updateDoc(ref, {
balance: increment(amount),
invested: increment(amount)
});

alert("Deposit successful");

location.reload();
};

// ======================
// WITHDRAW
// ======================
document.getElementById("withdrawBtn").onclick = () => {
document.getElementById("withdrawModal").style.display = "block";
};

document.getElementById("confirmWithdraw").onclick = async () => {

const amount = Number(document.getElementById("withdrawAmount").value);

const ref = doc(db, "users", currentUser.uid);
const snap = await getDoc(ref);

if (snap.data().balance < amount) {
return alert("Insufficient balance");
}

await updateDoc(ref, {
balance: increment(-amount)
});

alert("Withdrawal successful");

location.reload();
};

// ======================
// LOGOUT
// ======================
document.getElementById("logoutBtn").onclick = async () => {
await signOut(auth);
window.location.href = "login.html";
};