// Initialize variables for dragging
let offsetX, offsetY;

// Function to start dragging an element
function startDrag(event, element) {
  offsetX = event.clientX - element.getBoundingClientRect().left;
  offsetY = event.clientY - element.getBoundingClientRect().top;

  document.onmousemove = (e) => dragElement(e, element);
  document.onmouseup = stopDrag;
}

// Function to drag the element
function dragElement(event, element) {
  element.style.left = `${event.clientX - offsetX}px`;
  element.style.top = `${event.clientY - offsetY}px`;
}

// Function to stop dragging
function stopDrag() {
  document.onmousemove = null;
  document.onmouseup = null;
}

// Array of warrior idioms with descriptions
const idioms = [
  { 
    text: "Bite the bullet", 
    description: "To endure a painful experience or face a difficult situation head-on." 
  },
  { 
    text: "Fight fire with fire", 
    description: "To use the same tactics or methods as your opponent." 
  },
  // Add more idioms with descriptions as needed
];

// Function to get a daily idiom
function getDailyIdiom() {
  const date = new Date();
  const index = date.getDate() % idioms.length;
  const idiom = idioms[index];
  
  document.getElementById("dailyIdiom").textContent = idiom.text;
  document.getElementById("idiomDescription").textContent = idiom.description;
}

// Array of daily quotes
const quotes = [
  "Strength does not come from physical capacity. It comes from an indomitable will.",
  "Victory is reserved for those who are willing to pay its price.",
  "A warrior never worries about his fear.",
  "One who conquers himself is greater than another who conquers a thousand times.",
  "The more you sweat in training, the less you bleed in battle."
];

// Function to get a daily quote
function getDailyQuote() {
  const date = new Date();
  const quoteIndex = date.getDate() % quotes.length;
  document.getElementById("dailyQuote").textContent = quotes[quoteIndex];
}

// Array of historical warrior events for the timeline
const events = [
  { year: "480 BC", event: "Battle of Thermopylae" },
  { year: "1180 AD", event: "Samurai rise in Japan" },
  { year: "1775 AD", event: "Formation of the Continental Army" },
];

// Function to load the warrior timeline
function loadTimeline() {
  const timeline = document.getElementById("timeline");
  events.forEach(event => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${event.year}</strong> - ${event.event}`;
    timeline.appendChild(listItem);
  });
}

// Array of weekly training tips
const tips = [
  "Practice mindfulness to build mental resilience.",
  "Incorporate interval training to increase stamina.",
  "Focus on flexibility to reduce injury risk.",
  "Engage in shadowboxing for agility and strength.",
  "Use progressive overload for steady strength gains."
];

// Function to get a weekly training tip
function getWeeklyTip() {
  const week = Math.floor(new Date().getDate() / 7);
  document.getElementById("weeklyTip").textContent = tips[week % tips.length];
}

// Function to update time and date
function updateTimeAndDate() {
  const now = new Date();
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, options);

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  
  document.getElementById("currentDate").textContent = formattedDate;
  document.getElementById("currentTime").textContent = formattedTime;
}

// Initialize all widgets on page load and add dragging functionality
window.onload = () => {
  // Initialize widgets
  getDailyIdiom();
  getDailyQuote();
  loadTimeline();
  getWeeklyTip();
  updateTimeAndDate();

  // Set interval to update time every second
  setInterval(updateTimeAndDate, 1000);

  // Add dragging functionality to each widget
  document.querySelectorAll('.widget').forEach(widget => {
    widget.onmousedown = (event) => startDrag(event, widget);
  });
};
