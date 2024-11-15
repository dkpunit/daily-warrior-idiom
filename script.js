// Firebase Configuration and Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAYhTeAM_aj-coCi_nr6t5b9FzkI5RuwIs",
  authDomain: "davepunit-4338a.firebaseapp.com",
  projectId: "davepunit-4338a",
  storageBucket: "davepunit-4338a.appspot.com",
  messagingSenderId: "685471817615",
  appId: "1:685471817615:web:01e7394bdf0eba6c1435fa",
  measurementId: "G-C1Z7BXCL4C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", firebase.apps.length > 0); // Confirm initialization

// Firebase Auth and Google Sign-In
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

// Event listeners for buttons and drag functionality
window.addEventListener('load', () => {
  document.getElementById("google-signin").addEventListener("click", handleGoogleSignIn);
  document.querySelector(".reset-all").addEventListener("click", resetAllWidgets);

  // Add drag functionality for widget headers
  document.querySelectorAll('.widget .widget-header').forEach(header => {
    header.addEventListener('mousedown', (event) => startDrag(event, header.closest('.widget')));
  });

  // Add close functionality for widget close buttons
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => closeWidget(button));
  });

  loadDynamicContent(); // Load initial content on page load
});

// Reset widget positions
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

// Load dynamic content example
function loadDynamicContent() {
  document.getElementById("dailyIdiom").textContent = "Bite the bullet";
  document.getElementById("idiomDescription").textContent = "To face a difficult situation with courage.";
}

// Drag and drop functionality
let draggedElement = null;
let offsetX, offsetY;

function startDrag(event, element) {
  draggedElement = element;
  offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
  document.addEventListener('mousemove', dragElement);
  document.addEventListener('mouseup', stopDrag);
  document.body.style.userSelect = "none";
}

function dragElement(event) {
  if (draggedElement) {
    draggedElement.style.left = `${event.clientX - offsetX}px`;
    draggedElement.style.top = `${event.clientY - offsetY}px`;
  }
}

function stopDrag() {
  draggedElement = null;
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.userSelect = "";
}

// Close widget
function closeWidget(button) {
  const widget = button.closest('.widget');
  widget.style.display = 'none';
}
