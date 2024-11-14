// Firebase Authentication handling
function handleGoogleSignIn() {
  console.log("Sign-in button clicked"); // Log for debugging
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Use signInWithPopup instead of signInWithRedirect
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

// Wait for the window to load completely before running the rest of the Firebase code
window.addEventListener('load', () => {
  // Check if Firebase has initialized
  console.log("Firebase apps:", firebase.apps);

  // Ensure Firebase is initialized before using it
  if (firebase.apps.length === 0) {
    console.error("Firebase has not been initialized.");
    return;
  }

  const auth = firebase.auth();

  // Optional log out function
  function handleSignOut() {
    auth.signOut().then(() => {
      document.getElementById('login-container').style.display = 'flex';
      document.getElementById('app-content').style.display = 'none';
    });
  }

  // Widget functions
  function closeWidget(button) {
    const widget = button.closest('.widget');
    widget.style.display = 'none';
  }

  function resetAllWidgets() {
    const initialPositions = [
      { selector: '.daily-quote', left: 20, top: 20 },
      { selector: '.warrior-timeline', left: 260, top: 20 },
      { selector: '.training-tips', left: 500, top: 20 },
      { selector: '.time-widget', left: 20, top: 200 },
      { selector: '.holidays-widget', left: 260, top: 200 },
      { selector: '.countdown-widget', left: 500, top: 200 }
    ];
    initialPositions.forEach(pos => {
      const widget = document.querySelector(pos.selector);
      widget.style.left = `${pos.left}px`;
      widget.style.top = `${pos.top}px`;
      widget.style.display = 'block';
    });
  }

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

  function loadDynamicContent() {
    document.getElementById("dailyIdiom").textContent = "Bite the bullet";
    document.getElementById("idiomDescription").textContent = "To face a difficult situation with courage.";
  }

  // Initialize dragging functionality for widgets and load dynamic content
  document.querySelectorAll('.widget .widget-header').forEach(header => {
    header.addEventListener('mousedown', (event) => startDrag(event, header.closest('.widget')));
  });
  loadDynamicContent();
});