import { auth } from "./firebase-config.js";

import {
signInWithEmailAndPassword,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

try {

await signInWithEmailAndPassword(auth, email, password);

alert("Login successful");

window.location.href = "dashboard.html";

} catch (error) {
alert(error.message);
}

});


// FORGOT PASSWORD
document.getElementById("forgotPassword").addEventListener("click", async (e) => {
e.preventDefault();

const email = prompt("Enter your email for password reset:");

if (!email) return;

try {

await sendPasswordResetEmail(auth, email);

alert("Password reset email sent");

} catch (error) {
alert(error.message);
}

});