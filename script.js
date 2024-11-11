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