// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuJMV18G9SuUu9Mm1geK_-Z_-SUvw0vSw",
  authDomain: "usl-database.firebaseapp.com",
  projectId: "usl-database",
  storageBucket: "usl-database.appspot.com",
  messagingSenderId: "803247786780",
  appId: "1:803247786780:web:7a20909f40166fcf8548d9",
  measurementId: "G-X3KZXMTV9K",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit data to Firestore
function submitData() {
  // Get data from localStorage
  const name = localStorage.getItem("USL_PLAYER_NAME");
  const surname = localStorage.getItem("USL_PLAYER_SURNAME");
  const email = localStorage.getItem("USL_PLAYER_EMAIL");
  const degree = localStorage.getItem("Course");
  const team = localStorage.getItem("USL_PLAYER_TEAM");

  // Ensure all required localStorage items are available
  if (!name || !surname || !email || !degree || !team) {
    console.error("One or more localStorage items are missing.");
    alert(
      "Error: Missing data. Please make sure all required fields are filled out."
    );
    return;
  }

  // Add data to Firestore
  addDoc(collection(db, "PlayerDetails"), {
    name: name,
    surname: surname,
    email: email,
    degree: degree,
    team: team,
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Sign up successful!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Error signing up, please try again.");
    });
}

//Function to add confirmation email.

window.onload = function () {
  const currentPage = window.location.pathname;

  if (currentPage.includes("success.html")) {
    submitData();
  }
};

function sendEmail(name, surname, email) {
  const emailParams = {
    user_name: `${name} ${surname}`, // Correct usage of template literals
    user_email: email,
    message: `Dear ${name}, thank you for your payment!`, // Also corrected here
  };

  emailjs.send("your_service_id", "your_template_id", emailParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}
