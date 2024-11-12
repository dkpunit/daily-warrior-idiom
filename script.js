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
