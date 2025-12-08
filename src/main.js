import { initializeApp } from "firebase/app";
import Swal from "sweetalert2";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import $ from "jquery";
import { initURLListener } from "./model.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhHrD4LX798EmbIUwVb5pRyhCmjyV1xG0",
  authDomain: "keurig-8fb46.firebaseapp.com",
  projectId: "keurig-8fb46",
  storageBucket: "keurig-8fb46.firebasestorage.app",
  messagingSenderId: "492940377414",
  appId: "1:492940377414:web:796fb6d4ad11cabbbd7947",
  measurementId: "G-WKV219TMFE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let canSeeInformation = false;

console.log("Firebase initialized:", app);
console.log("Auth object:", auth);

// Use event delegation to handle dynamically loaded buttons
$(document).on("click", "#login-btn", function (e) {
  e.preventDefault();
  console.log("Login button clicked");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("Email:", email, "Password:", password);
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User logged in successfully");
      Swal.fire("Success", "User logged in successfully", "success");
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      Swal.fire("Error", error.message, "error");
    });
});

$(document).on("click", "#signup-btn", function (e) {
  e.preventDefault();
  console.log("Signup button clicked");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log("Email:", email, "Password:", password);

  if (!email || !password) {
    Swal.fire("Error", "Please enter email and password", "error");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      console.log("User signed up successfully:", user);
      Swal.fire("Success", "Account created successfully!", "success");
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      Swal.fire("Error", error.message, "error");
    });
});

// Initialize the routing system
initURLListener();
