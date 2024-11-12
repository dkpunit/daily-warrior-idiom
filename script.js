let offsetX, offsetY, draggedElement, resizing = false, startWidth, startHeight;

// Function to start dragging an element
function startDrag(event) {
  if (event.target.classList.contains('resize-handle')) {
    // Start resizing if the resize handle is clicked
    resizing = true;
    draggedElement = event.target.closest('.widget');
    startWidth = draggedElement.offsetWidth;
    startHeight = draggedElement.offsetHeight;
    offsetX = event.clientX;
    offsetY = event.clientY;
    document.addEventListener('mousemove', resizeElement);
    document.addEventListener('mouseup', stopResize);
  } else {
    const target = event.target.closest('.draggable-area');
    if (target) {
      // Start dragging if the draggable area is clicked
      draggedElement = target.closest('.widget');
      draggedElement.style.position = 'absolute';
      offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
      offsetY = event.clientY - draggedElement.getBoundingClientRect().top;
      document.addEventListener('mousemove', dragElement);
      document.addEventListener('mouseup', stopDrag);
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
    draggedElement = null;
  }
}

// Initialize all widgets on page load
window.onload = () => {
  document.querySelectorAll('.widget').forEach(widget => {
    // Attach the mousedown event to each widget's draggable area and resize handle
    widget.addEventListener('mousedown', startDrag);
  });
};
