
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
  else if (windowID === 'window-music-player') {
            audio.pause();
            document.getElementById('playPauseToggle').textContent = '▶';
      };    

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

function showWindow(windowID) {
  const windowElement = document.getElementById(windowID);
  const isMobileView = window.matchMedia("screen and (max-width: 1200px)").matches;

  windowElement.style.display = 'block'; // make it visible

  windowElement.style.transition = 'background-color 0.5s';
  windowElement.style.backgroundColor = 'rgb(255, 132, 0)';

  setTimeout(() => {
      windowElement.style.backgroundColor = '';
  }, 3000);

  if (isMobileView) {
    // small delay to ensure element is rendered
    setTimeout(() => {
      const rect = windowElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // target 20% down from top of viewport
      const targetY = rect.top + scrollTop - window.innerHeight * 0.2;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }, 50);
  }
}

      
//for mouse over
function showColor(windowID) {

  const windowElement = document.getElementById(windowID);

  windowElement.style.transition = 'background-color 0.5s';
  windowElement.style.backgroundColor = 'rgb(255, 132, 0)';

  setTimeout(() => {
      windowElement.style.backgroundColor = '';
  }, 3000);

  // const isMobileView = window.matchMedia("screen and (max-width: 1200px)").matches;

  windowElement.style.display = 'block'; // make it visible

  // if (isMobileView) {
  //   // small delay to ensure element is rendered
  //   setTimeout(() => {
  //     const rect = windowElement.getBoundingClientRect();
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //     // target 20% down from top of viewport
  //     const targetY = rect.top + scrollTop - window.innerHeight * 0.2;

  //     window.scrollTo({ top: targetY, behavior: 'smooth' });
  //   }, 50);
  // }
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

const tagName = document.getElementById('tag-name');
const playlistNumber = document.getElementById('playlist-number');

let currentTag = '';

function updatePlaylistUI() {

  tagName.textContent =
    currentTag ? currentTag + ' ' : '';

  playlistNumber.textContent =
  `${current + 1}/${tracks.length}`;
}

function startPlaylistBasedOnTag(tag) {

  currentTag = tag;

  tracks = allTracks.filter(track =>
    track.tags.includes(tag)
  );

  if (tracks.length === 0) {
    console.log("No tracks found for:", tag);
    return;
  }

  shuffle(tracks);

  current = 0;

  loadTrack(current);

  audio.play();

  document.getElementById('playPauseToggle').textContent = '⏸';
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
              windowElement === document.getElementById('window-music-explore')||
              windowElement === document.getElementById('window-video-game-sound')||
              windowElement === document.getElementById('window-film-animation-music')||
              windowElement === document.getElementById('window-links-2')||
              windowElement === document.getElementById('window-portfolio-1') ||
              windowElement === document.getElementById('window-songkick') ||
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


const audio = document.getElementById('audio');
const trackName = document.getElementById('trackName');

let allTracks = [];   // full dataset (with tags)
let tracks = [];      // playback queue
let current = 0;


fetch('./playlist.json')
  .then(res => res.json())
  .then(data => {

    // supports both formats:
    const list = data.tracks || data;

    allTracks = list.map(t => ({
      url: t.url,
      tags: t.tags || []
    }));

    tracks = [...allTracks];

    shuffle(tracks);
    loadTrack(0);
  });


function loadTrack(index) {

  const track = tracks[index];

  if (!track) return;

  const file = track.url.split('/').pop();

  let name = file
    .replace(/\.[^/.]+$/, "")
    .replace(/^\d+[\s.\-_]*/, "")
    .replace(/-/g, " ");

  trackName.textContent = name.toLowerCase();

  audio.src =
    "https://music.hughfuchsen.workers.dev/" + track.url;

  updatePlaylistUI();
}

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}



}


// play button handles playback

// controls

document.getElementById('playPauseToggle').onclick = () => {
  if (audio.paused) {
    audio.play();
    document.getElementById('playPauseToggle').textContent = '⏸';
  } else {
    audio.pause();
    document.getElementById('playPauseToggle').textContent = '▶';
  }
};

document.getElementById('next').onclick = () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
  audio.play();
  document.getElementById('playPauseToggle').textContent = '⏸';
};

document.getElementById('prev').onclick = () => {
  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
  audio.play();
  document.getElementById('playPauseToggle').textContent = '⏸';
};

// auto next track
audio.addEventListener('ended', () => {
  current = (current + 1) % tracks.length;
  loadTrack(current);
  audio.play();
  document.getElementById('playPauseToggle').textContent = '⏸';
});

const musicWindow = document.getElementById('window-music-player');

document.addEventListener('keydown', (e) => {
// only trigger if window is "active" / focused

if (e.code === 'Space') {    // spacebar pressed
  e.preventDefault();        // prevent scrolling

  if(musicWindow.style.display !== 'none')
  {
      if (audio.paused)
      { 
          audio.play();
          document.getElementById('playPauseToggle').textContent = '⏸';
      }
      else{
          audio.pause();
          document.getElementById('playPauseToggle').textContent = '▶';
      } 
  }

}
});

