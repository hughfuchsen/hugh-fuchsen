let offsetX, offsetY;
let requestId;

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

}

function closeWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none';
    if (windowId == 'window0' || windowId == 'window1') {
        setTimeout(() => resetWindow(windowId), 1500);
    }
}

function resetWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    windowElement.classList.remove('maximized');
    windowElement.style.left = 'auto';
    windowElement.style.top = 'auto';
    windowElement.style.display = 'block';
}

function showWindow(windowId) {
    const windowElement = document.getElementById(windowId);
    const window0 = document.getElementById('window0');
    const isMobileView = window.matchMedia("screen and (max-width: 750px)").matches;

    if (isMobileView) {
        windowElement.style.position = 'relative';
        windowElement.style.margin = '2rem auto';
        windowElement.style.width = window0.style.width;
        document.body.appendChild(windowElement);
        windowElement.scrollIntoView({ behavior: 'smooth' });
    } 
    else {
        
        // // Reset position for desktop view
        // if (windowId === 'window3') {
        //     windowElement.style.bottom = '2rem';
        //     windowElement.style.left = '2rem';
        // }
        // if (windowId === 'window2') {
        //     windowElement.style.top = '3rem';
        //     windowElement.style.right = '4rem';
        // } else {
        //     windowElement.style.left = 'auto';
        //     windowElement.style.top = 'auto';
        // }
        windowElement.style.position = 'absolute';
    }

    windowElement.style.display = 'block';
}

// Function to adjust layout based on screen size
function adjustLayout() {
    const isMobileView = window.matchMedia("screen and (max-width: 750px)").matches;
    const windows = document.querySelectorAll('.window');
    const window0 = document.getElementById('window0');

    if (isMobileView) {
        windows.forEach(windowElement => {
            windowElement.style.position = 'relative';
            windowElement.style.width = '90%';
            windowElement.style.margin = '2rem auto';
        });
    } else {
        windows.forEach(windowElement => {
            windowElement.style.position = 'absolute';
            windowElement.style.width = '40%';
            windowElement.style.margin = '2rem auto';
        });
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

// Add an event listener to handle screen resizing
window.addEventListener('resize', adjustLayout);

// Initial layout adjustment on page load
document.addEventListener('DOMContentLoaded', adjustLayout);

function copyEmail() {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    // Set its value to the email address
    tempInput.value = 'hughfuchsen@gmail.com';
    // Append it to the body
    document.body.appendChild(tempInput);
    // Select the content of the input
    tempInput.select();
    // Copy the content to the clipboard
    document.execCommand('copy');
    // Remove the temporary input element from the DOM
    document.body.removeChild(tempInput);

    // Show the toast message
    showToast();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = 'toast';
    }, 2000);
}

