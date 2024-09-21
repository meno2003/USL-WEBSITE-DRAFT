// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuJMV18G9SuUu9Mm1geK_-Z_-SUvw0vSw",
  authDomain: "usl-database.firebaseapp.com",
  projectId: "usl-database",
  storageBucket: "usl-database.appspot.com",
  messagingSenderId: "803247786780",
  appId: "1:803247786780:web:7a20909f40166fcf8548d9",
  measurementId: "G-X3KZXMTV9K"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit form data to Firestore
function submitData(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const team = document.getElementById('dropdown').value;
  const teamId = document.getElementById('team-name').value;

  // Add data to Firestore
  addDoc(collection(db, 'PlayerDetails'), {
    name: name,
    surname: surname,
    email: email,
    degree: localStorage.getItem("Course"),
    team: team,
    teamId: teamId
  })
  .then((docRef) => {
    console.log('Document written with ID: ', docRef.id);
    alert('Sign up successful!');
  })
  .catch((error) => {
    console.error('Error adding document: ', error);
    alert('Error signing up, please try again.');
  });
}

// Bind submit event when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('survey-form').addEventListener('submit', submitData);

});

