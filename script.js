// Handle admin login
function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const validUsername = 'admin';
  const validPassword = 'yourSecurePassword';

  if (username === validUsername && password === validPassword) {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('app-content').style.display = 'block';
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

// Initial positions for widget reset functionality
const initialPositions = [
  { selector: '.daily-quote', left: 20, top: 20 },
  { selector: '.warrior-timeline', left: 260, top: 20 },
  { selector: '.training-tips', left: 500, top: 20 },
  { selector: '.time-widget', left: 20, top: 200 },
  { selector: '.holidays-widget', left: 260, top: 200 },
  { selector: '.countdown-widget', left: 500, top: 200 }
];

// Function to close individual widgets
function closeWidget(button) {
  const widget = button.closest('.widget');
  widget.style.display = 'none';
}

// Function to reset all widgets to their initial positions
function resetAllWidgets() {
  initialPositions.forEach(pos => {
    const widget = document.querySelector(pos.selector);
    widget.style.left = `${pos.left}px`;
    widget.style.top = `${pos.top}px`;
    widget.style.display = 'block';
  });
}

// Dragging functionality
let draggedElement = null;
let offsetX, offsetY;

function startDrag(event, element) {
  draggedElement = element;
  offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
  offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
  document.addEventListener('mousemove', dragElement);
  document.addEventListener('mouseup', stopDrag);
  document.body.style.userSelect = "none"; // Prevent text selection during drag
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
  document.body.style.userSelect = ""; // Re-enable text selection
}

// Function to load dynamic content (e.g., idioms, quotes, timeline, etc.)
function loadDynamicContent() {
  const idioms = [
    { text: "Bite the bullet", description: "To face a difficult situation with courage." },
    { text: "Stand your ground", description: "To refuse to be pushed back or give in." },
  ];

  const quotes = [
    "Strength comes from an indomitable will.",
    "Victory is reserved for those who pay its price."
  ];

  const events = [
    { year: "480 BC", event: "Battle of Thermopylae" },
    { year: "1180 AD", event: "Samurai rise in Japan" }
  ];

  const tips = [
    "Practice mindfulness to build resilience.",
    "Incorporate interval training to increase stamina."
  ];

  const date = new Date();
  const idiomIndex = date.getDate() % idioms.length;
  document.getElementById("dailyIdiom").textContent = idioms[idiomIndex].text;
  document.getElementById("idiomDescription").textContent = idioms[idiomIndex].description;

  const quoteIndex = date.getDate() % quotes.length;
  document.getElementById("dailyQuote").textContent = quotes[quoteIndex];

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = '';
  events.forEach(event => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${event.year}</strong> - ${event.event}`;
    timeline.appendChild(listItem);
  });

  const week = Math.floor(date.getDate() / 7);
  document.getElementById("weeklyTip").textContent = tips[week % tips.length];

  setInterval(() => {
    const now = new Date();
    document.getElementById("currentDate").textContent = now.toLocaleDateString();
    document.getElementById("currentTime").textContent = now.toLocaleTimeString();
  }, 1000);
}

// Initialize widgets and load content on page load
window.onload = () => {
  document.querySelectorAll('.widget .widget-header').forEach(header => {
    header.addEventListener('mousedown', (event) => startDrag(event, header.closest('.widget')));
  });
  loadDynamicContent();
};