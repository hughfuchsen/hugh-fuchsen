let offsetX, offsetY;
let requestId;

function toggleMaximizeWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.classList.toggle('maximized');

    if (windowElement.classList.contains('maximized')) {
        windowElement.style.left = '5%';
        windowElement.style.top = '5%';
    } else {
        windowElement.style.left = 'auto';
        windowElement.style.top = 'auto';
    }
}

function minimizeWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.style.display = 'none';

}

function closeWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.style.display = 'none';
    if (windowID == 'window0') {
        setTimeout(() => resetWindow(windowID), 1500);
    }
}

function resetWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.classList.remove('maximized');
    windowElement.style.left = 'auto';
    windowElement.style.top = 'auto';
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
        setTimeout(revertColor(windowID), 2000)
        windowElement.style.transition = 'background-color 0.5s';
        windowElement.style.backgroundColor = 'yellow';
    }
    else {
        windowElement.style.transition = 'background-color 0.5s';
        windowElement.style.backgroundColor = 'yellow';
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
// function adjustLayout() {
//     const isMobileView = window.matchMedia("screen and (max-width: 1px)").matches;
//     const windows = document.querySelectorAll('.window');
//     const window0 = document.getElementById('window0');

//     if (isMobileView) {
//         windows.forEach(windowElement => {
//             windowElement.style.position = 'relative';
//             windowElement.style.width = '90%';
//             windowElement.style.margin = '2rem auto';
//         });
//     } else {
//         windows.forEach(windowElement => {
//             windowElement.style.position = 'absolute';
//             if (windowElement !== document.getElementById('window0'))
//             {
//                 windowElement.style.width = '40%';
//             }
//             else
//             {
//                 windowElement.style.width = '45%';
//             }
//             windowElement.style.margin = '2rem auto';
//         });
//     }
// }

function changeTabBarColor(windowID) {
    const element = document.getElementById(windowID);
    element.style.backgroundColor = 'yellow';
    
    // Adding event listener for click
    element.addEventListener('click', function() {
        // Changing background color to yellow on click
        element.style.transition = 'background-color 0.5s';
        element.style.backgroundColor = 'yellow';
        
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

