import { auth } from "./firebase-config.js";

import {
signInWithEmailAndPassword,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// LOGIN FUNCTION
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

if (!email || !password) {
alert("Fill in all fields");
return;
}

try {

await signInWithEmailAndPassword(auth, email, password);

alert("Login successful");

// go to dashboard
window.location.href = "dashboard.html";

} catch (error) {
alert(error.message);
}

});


// FORGOT PASSWORD FUNCTION
const forgot = document.getElementById("forgotPassword");

forgot.addEventListener("click", async (e) => {
e.preventDefault();

const email = prompt("Enter your email for password reset:");

if (!email) {
alert("Email required");
return;
}

try {

await sendPasswordResetEmail(auth, email);

alert("Password reset email sent");

} catch (error) {
alert(error.message);
}

});