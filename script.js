// Firebase Configuration and Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAYhTeAM_aj-coCi_nr6t5b9FzkI5RuwIs",
  authDomain: "www.davepunit.com",
  projectId: "davepunit-4338a",
  storageBucket: "davepunit-4338a.firebasestorage.app",
  messagingSenderId: "685471817615",
  appId: "1:685471817615:web:01e7394bdf0eba6c1435fa",
  measurementId: "G-C1Z7BXCL4C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", firebase.apps.length > 0); // Confirm initialization

// Firebase Auth and Google Sign-In Code
function handleGoogleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user.displayName);
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('app-content').style.display = 'block';
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      alert("Google sign-in failed. Please try again.");
    });
}

// Additional code for widgets, dynamic content, and drag functionality

function resetAllWidgets() {
  const initialPositions = [
    { selector: '.daily-quote', left: 20, top: 20 },
    // Add positions for other widgets as needed
  ];
  initialPositions.forEach(pos => {
    const widget = document.querySelector(pos.selector);
    widget.style.left = `${pos.left}px`;
    widget.style.top = `${pos.top}px`;
    widget.style.display = 'block';
  });
}

// Example of loading dynamic content
function loadDynamicContent() {
  document.getElementById("dailyIdiom").textContent = "Bite the bullet";
  document.getElementById("idiomDescription").textContent = "To face a difficult situation with courage.";
}

// Call loadDynamicContent when the page loads
window.onload = () => {
  loadDynamicContent();
};
