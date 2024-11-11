let offsetX, offsetY;

function startDrag(event, element) {
  // Get initial mouse position and element position
  offsetX = event.clientX - element.getBoundingClientRect().left;
  offsetY = event.clientY - element.getBoundingClientRect().top;

  // Attach the move event to the document
  document.onmousemove = (e) => dragElement(e, element);
  document.onmouseup = stopDrag;
}

function dragElement(event, element) {
  // Update the element’s position based on mouse movement
  element.style.left = `${event.clientX - offsetX}px`;
  element.style.top = `${event.clientY - offsetY}px`;
}

function stopDrag() {
  // Remove mousemove and mouseup events to stop dragging
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
  // Add more idioms with descriptions...
];

// Function to get a daily idiom based on the date
function getDailyIdiom() {
  const date = new Date();
  const index = date.getDate() % idioms.length;
  const idiom = idioms[index];
  
  document.getElementById("dailyIdiom").textContent = idiom.text;
  document.getElementById("idiomDescription").textContent = idiom.description;
}

// Other widget functions, like getDailyQuote, loadTimeline, getWeeklyTip, and updateTimeAndDate...
window.onload = () => {
  getDailyIdiom();
  getDailyQuote();
  loadTimeline();
  getWeeklyTip();
  updateTimeAndDate();
};

setInterval(updateTimeAndDate, 1000);
