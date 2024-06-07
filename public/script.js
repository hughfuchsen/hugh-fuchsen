let offsetX, offsetY;
let requestId;



function closeWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.style.display = 'none';
    if (windowID == 'window-bio') {
        setTimeout(() => showWindow(windowID), 1000);
    }
}


// for clicking
function showWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    const isMobileView = window.matchMedia("screen and (max-width: 1200px)").matches;

    if (isMobileView) {
        // Ensure the element is visible first
        windowElement.style.display = 'block';
        // Add a small delay before scrolling into view
        setTimeout(() => {
            windowElement.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Adjust the delay as necessary
    }
    else {
        windowElement.style.display = 'block';
    }
}            
//for mouse over
function showColor(windowID) {
    const windowElement = document.getElementById(windowID);
    const isMobileView = window.matchMedia("screen and (max-width: 1200px)").matches;

    if (isMobileView) {
        setTimeout(revertColor(windowID), 2000);
        windowElement.style.transition = 'background-color 0.5s';
        windowElement.style.backgroundColor = 'rgb(255, 255, 123)';
    }
    else {
        windowElement.style.transition = 'background-color 0.5s';
        windowElement.style.backgroundColor = 'rgb(255, 255, 123)';
    }


}

//for mouse out
function revertColor(windowID) {
    const isMobileView = window.matchMedia("screen and (max-width: 1200px)").matches;
    const windowElement = document.getElementById(windowID);

    if (isMobileView) {
         // Reverting back to original color after click
         windowElement.style.transition = 'background-color 2.5s';
         windowElement.style.backgroundColor = '';
    }
    else {
        // Reverting back to original color after click
        windowElement.style.transition = 'background-color 0.5s';
        windowElement.style.backgroundColor = '';
    }

}


// Function to adjust layout based on screen size
function adjustLayout() {
    const isMobileView = window.matchMedia("screen and (max-width: 1200px)").matches;
    const windows = document.querySelectorAll('.window');

    if (isMobileView) {
        windows.forEach(windowElement => {
            windowElement.style.display = 'block';
        });
    } else {
        windows.forEach(windowElement => {
            if (windowElement === document.getElementById('window-singer-songerwriter-music') ||
                windowElement === document.getElementById('window-game-dev'))
            {
                windowElement.style.display = 'none';
            }
            else
            {
                windowElement.style.display = 'block';
            }
        });
    }
}

function changeTabBarColor(windowID) {
    const element = document.getElementById(windowID);
    element.style.backgroundColor = 'rgb(255, 255, 123)';
    
    // Adding event listener for click
    element.addEventListener('click', function() {
        // Changing background color to rgb(255, 255, 123) on click
        element.style.transition = 'background-color 0.5s';
        element.style.backgroundColor = 'rgb(255, 255, 123)';
        
        // Adding event listener for mouseup to revert color
        function revertColor() {
            element.removeEventListener('mouseup', revertColor);
            // Reverting back to original color after click
            element.style.transition = 'background-color 0.5s';
            element.style.backgroundColor = '';
        }
        element.addEventListener('mouseup', revertColor);
    });
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

