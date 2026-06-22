import { db } from "./firebase-config.js";

import {
collection,
query,
where,
getDocs,
updateDoc,
doc,
increment
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document.getElementById("addBalance").onclick = async () => {

const email = document.getElementById("adminEmail").value;
const amount = Number(document.getElementById("amount").value);

const q = query(collection(db, "users"), where("email", "==", email));
const snap = await getDocs(q);

snap.forEach(async (userDoc) => {
await updateDoc(doc(db, "users", userDoc.id), {
balance: increment(amount)
});
});

alert("Balance updated");
};