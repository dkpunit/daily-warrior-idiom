let offsetX, offsetY, draggedElement, resizing = false, startWidth, startHeight;

// Function to start dragging or resizing an element
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
  } else {
    const target = event.target.closest('.draggable-area');
    if (target) {
      draggedElement = target.closest('.widget');
      draggedElement.style.position = 'absolute';
      offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
      offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
      document.addEventListener('mousemove', dragElement);
      document.addEventListener('mouseup', stopDrag);
      document.body.style.userSelect = "none"; // Disable text selection
    }
  }
}

// Function to resize the element
function resizeElement(event) {
  if (resizing && draggedElement) {
    draggedElement.style.width = `${startWidth + (event.clientX - offsetX)}px`;
    draggedElement.style.height = `${startHeight + (event.clientY - offsetY)}px`;
  }
}

// Function to stop resizing
function stopResize() {
  resizing = false;
  document.removeEventListener('mousemove', resizeElement);
  document.removeEventListener('mouseup', stopResize);
  document.body.style.userSelect = ""; // Re-enable text selection
}

// Function to drag the element
function dragElement(event) {
  if (draggedElement && !resizing) {
    draggedElement.style.left = `${event.clientX - offsetX}px`;
    draggedElement.style.top = `${event.clientY - offsetY}px`;
  }
}

// Function to stop dragging
function stopDrag() {
  if (!resizing) {
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
    document.body.style.userSelect = ""; // Re-enable text selection
    draggedElement = null;
  }
}

// Function to load dynamic content
function loadDynamicContent() {
  // Example arrays for idioms, quotes, timeline events, etc.
  const idioms = [
    { text: "Bite the bullet", description: "To face a difficult situation with courage." },
    { text: "Stand your ground", description: "To refuse to be pushed back or give in." },
  ];

  const quotes = [
    "Strength does not come from physical capacity. It comes from an indomitable will.",
    "Victory is reserved for those who are willing to pay its price."
  ];

  const events = [
    { year: "480 BC", event: "Battle of Thermopylae" },
    { year: "1180 AD", event: "Samurai rise in Japan" }
  ];

  const tips = [
    "Practice mindfulness to build mental resilience.",
    "Incorporate interval training to increase stamina."
  ];

  // Update daily idiom
  const date = new Date();
  const idiomIndex = date.getDate() % idioms.length;
  document.getElementById("dailyIdiom").textContent = idioms[idiomIndex].text;
  document.getElementById("idiomDescription").textContent = idioms[idiomIndex].description;

  // Update daily quote
  const quoteIndex = date.getDate() % quotes.length;
  document.getElementById("dailyQuote").textContent = quotes[quoteIndex];

  // Load warrior timeline
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = '';
  events.forEach(event => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${event.year}</strong> - ${event.event}`;
    timeline.appendChild(listItem);
  });

  // Display weekly training tip
  const week = Math.floor(date.getDate() / 7);
  document.getElementById("weeklyTip").textContent = tips[week % tips.length];

  // Update time and date
  setInterval(() => {
    const now = new Date();
    document.getElementById("currentDate").textContent = now.toLocaleDateString();
    document.getElementById("currentTime").textContent = now.toLocaleTimeString();
  }, 1000);
}

// Initialize widgets on load
window.onload = () => {
  document.querySelectorAll('.widget').forEach(widget => {
    widget.addEventListener('mousedown', startDrag);
  });
  loadDynamicContent();
};
