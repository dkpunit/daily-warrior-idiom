let offsetX, offsetY, draggedElement;

// Function to start dragging an element
function startDrag(event) {
  const target = event.target.closest('.draggable-area');
  if (target) {
    draggedElement = target.closest('.widget'); // Set the parent widget as the dragged element
    if (draggedElement) {
      offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
      offsetY = event.clientY - draggedElement.getBoundingClientRect().top;

      // Attach event listeners for moving and stopping the drag
      document.addEventListener('mousemove', dragElement);
      document.addEventListener('mouseup', stopDrag);
    }
  }
}

// Function to drag the element
function dragElement(event) {
  if (draggedElement) {
    draggedElement.style.position = 'absolute';
    draggedElement.style.left = `${event.clientX - offsetX}px`;
    draggedElement.style.top = `${event.clientY - offsetY}px`;
  }
}

// Function to stop dragging
function stopDrag() {
  if (draggedElement) {
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
    draggedElement = null;
  }
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

// Array of holidays
const holidays = [
  { name: "Thanksgiving", date: "2024-11-28" },
  { name: "Christmas", date: "2024-12-25" },
  { name: "New Year's Day", date: "2025-01-01" },
  { name: "Valentine's Day", date: "2025-02-14" },
  { name: "St. Patrick's Day", date: "2025-03-17" }
];

// Function to display the next few upcoming holidays
function displayUpcomingHolidays() {
  const today = new Date();
  const upcoming = holidays
    .filter(holiday => new Date(holiday.date) > today)
    .slice(0, 3);
  
  const holidaysList = document.getElementById("holidaysList");
  holidaysList.innerHTML = "";

  upcoming.forEach(holiday => {
    const listItem = document.createElement("li");
    listItem.textContent = `${holiday.name} - ${new Date(holiday.date).toLocaleDateString()}`;
    holidaysList.appendChild(listItem);
  });
}

// Function to calculate and display countdown to Christmas
function updateChristmasCountdown() {
  const christmasDate = new Date(new Date().getFullYear(), 11, 25);
  const now = new Date();
  
  if (now > christmasDate) {
    christmasDate.setFullYear(christmasDate.getFullYear() + 1);
  }

  const timeRemaining = christmasDate - now;
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  document.getElementById("countdownTimer").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to display the Remembrance Day widget only on November 11
function displayRemembranceDayWidget() {
  const today = new Date();
  const remembranceWidget = document.querySelector('.remembrance-widget');
  
  // Check if today is November 11
  if (today.getMonth() === 10 && today.getDate() === 11) {
    remembranceWidget.style.display = 'block';
  } else {
    remembranceWidget.style.display = 'none';
  }
}

// Initialize all widgets on page load
window.onload = () => {
  getDailyIdiom();
  getDailyQuote();
  loadTimeline();
  getWeeklyTip();
  updateTimeAndDate();
  displayUpcomingHolidays();
  updateChristmasCountdown();
  displayRemembranceDayWidget(); // Display Remembrance Day widget only on November 11

  setInterval(updateTimeAndDate, 1000);
  setInterval(updateChristmasCountdown, 1000);

  // Add dragging functionality to each widget's draggable area
  document.querySelectorAll('.draggable-area').forEach(area => {
    area.addEventListener('mousedown', startDrag);
  });
};
