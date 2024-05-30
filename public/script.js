let isDragging = false;
let offsetX, offsetY;
let requestId;
let verticalOffset = 0;
let dragTimeout;  // To store the timeout ID

// function startDrag(event, windowId) {
//     const windowElement = document.getElementById(windowId);

//     if (windowElement.classList.contains('maximized')) {
//         return; // Prevent dragging when maximized
//     }

//     offsetX = event.clientX - windowElement.offsetLeft;
//     offsetY = event.clientY - windowElement.offsetTop;

//     // Set a timeout to activate dragging after 0.2 seconds
//     dragTimeout = setTimeout(() => {
//         isDragging = true;
//     }, 200);

//     document.onmousemove = (event) => onMouseMove(event, windowId);
//     document.onmouseup = stopDrag;
// }

// function onMouseMove(event, windowId) {
//     if (isDragging) {
//         if (!requestId) {
//             requestId = requestAnimationFrame(() => dragWindow(event, windowId));
//         }
//     }
// }

// function dragWindow(event, windowId) {
//     const windowElement = document.getElementById(windowId);
//     const margin = 5;

//     // Calculate new positions
//     let newLeft = event.clientX - offsetX;
//     let newTop = event.clientY - offsetY;

//     // Get the window dimensions
//     const windowWidth = windowElement.offsetWidth;
//     const windowHeight = windowElement.offsetHeight;

//     // Get the viewport dimensions
//     const viewportWidth = document.documentElement.clientWidth;
//     const viewportHeight = document.documentElement.clientHeight;

//     // Boundary checks
//     if (newLeft < margin) {
//         newLeft = margin;
//     } else if (newLeft + windowWidth > viewportWidth - margin) {
//         newLeft = viewportWidth - windowWidth - margin;
//     }

//     if (newTop < margin) {
//         newTop = margin;
//     } else if (newTop + windowHeight > viewportHeight - margin) {
//         newTop = viewportHeight - windowHeight - margin;
//     }

//     // Apply the new positions
//     windowElement.style.left = `${newLeft}px`;
//     windowElement.style.top = `${newTop}px`;
//     requestId = null;
// }

// function stopDrag() {
//     clearTimeout(dragTimeout);  // Clear the timeout if mouse is released before 0.2 seconds
//     isDragging = false;
//     document.onmousemove = null;
//     document.onmouseup = null;
//     if (requestId) {
//         cancelAnimationFrame(requestId);
//         requestId = null;
//     }
// }

function toggleMaximizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.toggle('maximized');

    if (windowElement.classList.contains('maximized')) {
        windowElement.style.left = '5%';
        windowElement.style.top = '5%';
    } else {
        windowElement.style.left = 'auto';
        windowElement.style.top = 'auto';
    }
}

function minimizeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none';
    if (windowId !== 'window2') {
        setTimeout(() => resetWindow(windowId), 1500);
    }
}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none';
    if (windowId == 'window0') {
        setTimeout(() => resetWindow(windowId), 1500);
    }
}

function resetWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'block';
    windowElement.style.left = 'auto';
    windowElement.style.top = `${verticalOffset}px`;
    verticalOffset += 20; // Increase vertical offset for the next window
    windowElement.classList.remove('maximized');
}

function showWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'block';
    if (windowId === 'window2') {
        // Position the second window on the right side of the screen
        windowElement.style.left = 'calc(100% - 45%)';
        windowElement.style.top = '5%';
    }
}

// Create a custom cursor element
const customCursor = document.createElement('div');
customCursor.classList.add('custom-cursor');
customCursor.style.width = '0.5rem';
customCursor.style.height = '0.5rem';
customCursor.style.backgroundColor = 'blue';
customCursor.style.position = 'fixed';
customCursor.style.pointerEvents = 'none'; // Ensure the cursor does not interfere with mouse events
customCursor.style.zIndex = '9999'; // Ensure the cursor stays on top of other elements
customCursor.style.borderRadius = '50%'; // Make it round

// Append the cursor to the body
document.body.appendChild(customCursor);

// Update the cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

