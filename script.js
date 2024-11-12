let offsetX, offsetY, draggedElement, resizing = false, startWidth, startHeight;
const MIN_WIDTH = 200; // Minimum width for resizing
const MIN_HEIGHT = 100; // Minimum height for resizing

// Start dragging or resizing
function startDrag(event) {
  if (event.target.classList.contains('resize-handle')) {
    resizing = true;
    draggedElement = event.target.closest('.widget');
    startWidth = draggedElement.offsetWidth;
    startHeight = draggedElement.offsetHeight;
    offsetX = event.clientX;
    offsetY = event.clientY;
    document.addEventListener('mousemove', resizeElement);
    document.addEventListener('mouseup', stopResize);
    document.body.style.userSelect = "none"; // Disable text selection
  } else if (event.target.classList.contains('draggable-area')) {
    draggedElement = event.target.closest('.widget');
    draggedElement.style.position = 'absolute';
    offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
    offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDrag);
    document.body.style.userSelect = "none"; // Disable text selection
  }
}

// Resize the widget
function resizeElement(event) {
  if (resizing && draggedElement) {
    let newWidth = startWidth + (event.clientX - offsetX);
    let newHeight = startHeight + (event.clientY - offsetY);

    // Enforce minimum width and height
    if (newWidth >= MIN_WIDTH) draggedElement.style.width = `${newWidth}px`;
    if (newHeight >= MIN_HEIGHT) draggedElement.style.height = `${newHeight}px`;
  }
}

// Stop resizing
function stopResize() {
  resizing = false;
  document.removeEventListener('mousemove', resizeElement);
  document.removeEventListener('mouseup', stopResize);
  document.body.style.userSelect = ""; // Re-enable text selection
}

// Drag the widget
function dragElement(event) {
  if (draggedElement && !resizing) {
    draggedElement.style.left = `${event.clientX - offsetX}px`;
    draggedElement.style.top = `${event.clientY - offsetY}px`;
  }
}

// Stop dragging
function stopDrag() {
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.userSelect = ""; // Re-enable text selection
  draggedElement = null;
}

// Load dynamic content on page load
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

window.onload = () => {
  document.querySelectorAll('.widget').forEach(widget => {
    widget.addEventListener('mousedown', startDrag);
  });
  loadDynamicContent();
};
