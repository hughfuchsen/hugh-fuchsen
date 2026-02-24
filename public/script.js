let offsetX, offsetY;
let requestId;




function closeWindow(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.style.display = 'none';

    // Stop YouTube videos from playing
    const iframes = windowElement.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
        const src = iframes[i].src;
        iframes[i].src = src;  // Resetting the src attribute
    }

    if (windowID === 'window-bio') {
        setTimeout(() => showWindow(windowID), 1000);
    }
}

function toggleReadMore(e) {
    e.preventDefault();

    const hiddenParagraph = document.querySelector('.hidden');
    hiddenParagraph.classList.toggle('show');

    const link = e.target;

    link.textContent =
        link.textContent === 'read more' ? 'read less' : 'read more';
}



function toggleLanguage() {
  const en = document.getElementById('english-version');
  const jp = document.getElementById('japanese-version');
  if (en.style.display === 'none') {
    en.style.display = 'block';
    jp.style.display = 'none';
  } else {
    en.style.display = 'none';
    jp.style.display = 'block';
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
        setTimeout(() => revertColor(windowID), 2000);
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
            if (
                windowElement === document.getElementById('window-singer-songerwriter-music') ||
                windowElement === document.getElementById('window-game-dev')||
                windowElement === document.getElementById('window-video-game-sound')||
                windowElement === document.getElementById('window-film-animation-music')||
                windowElement === document.getElementById('window-links-2')||
                windowElement === document.getElementById('window-portfolio-1') ||
                windowElement === document.getElementById('window-portfolio-2'))
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

function setZIndex(windowID) {
    const windowElement = document.getElementById(windowID);
    windowElement.style.zIndex = "front";
    // all other windows behind it
}



const email = "xandermaex@gmail.com";
const link = document.getElementById("emailCopyLink");
const originalText = link.textContent;

link.addEventListener("click", function(e) {
  e.preventDefault(); // prevent default link behavior

  // Copy email to clipboard
  navigator.clipboard.writeText(email).then(() => {
    link.textContent = "email copied!";

    // Revert text after 6 seconds
    setTimeout(() => {
      link.textContent = originalText;
    }, 6000);
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
});


// Add an event listener to handle screen resizing
window.addEventListener('resize', adjustLayout);
window.addEventListener('z-index', setZIndex);

// Initial layout adjustment on page load
document.addEventListener('DOMContentLoaded', adjustLayout);



