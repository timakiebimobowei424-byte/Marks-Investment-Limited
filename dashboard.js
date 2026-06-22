import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

if (!user) {
alert("Not logged in");
window.location.href = "index.html";
return;
}

const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

const data = docSnap.data();

document.getElementById("balance").innerText = data.balance;
document.getElementById("profit").innerText = data.profit;
document.getElementById("invested").innerText = data.invested;

} else {
alert("No user data found");
}

});