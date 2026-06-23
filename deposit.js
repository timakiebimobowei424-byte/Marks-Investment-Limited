import { auth, db } from "./config.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document.getElementById("depositBtn").addEventListener("click", async () => {

const amount = document.getElementById("amount").value;
const method = document.getElementById("method").value;

if (!amount) {
alert("Enter amount");
return;
}

const user = auth.currentUser;

if (!user) {
alert("Not logged in");
return;
}

await addDoc(collection(db, "transactions"), {
uid: user.uid,
type: "Deposit",
amount: amount,
method: method,
status: "Pending",
date: Date.now()
});

if (method === "Bitcoin") {

alert(
"Send $" + amount +
"\n\nTo Bitcoin Address:\nbc1qq0phsp53j20svznj8e9sy0cwqytqfh99e3jvts"
);

} else {

alert(method + "\n\nComing Soon");

}

});