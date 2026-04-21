
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
  windowElement.style.backgroundColor = 'rgb(255, 255, 123)';

  setTimeout(() => {
      windowElement.style.backgroundColor = '';
  }, 3000);
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

  const nameWithoutExt = file.replace(/\.[^/.]+$/, "");

  trackName.textContent = nameWithoutExt;
  audio.src = "https://music.hughfuchsen.workers.dev/" + track.url;
  console.log(tracks.length)
}


function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
}

function camelToWords(str) {
  // insert space before every uppercase letter, except at start
  const withSpaces = str.replace(/([A-Z])/g, ' $1').trim();
  return withSpaces.toLowerCase();
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

// let selectedTags = new Set();
// let activeTrackIndex = null;

// const BASE = "https://music.hughfuchsen.workers.dev/";

// function openTagEditor(index) {
//   activeTrackIndex = index;

//   const track = allTracks[index];

//   selectedTags = new Set(track.tags || []);

//   document.getElementById('tag-editor').style.display = 'block';
//   document.getElementById('editor-title').textContent = track.url;

//   renderEditorTags();
//   renderTags();
// }

// function toggleTag(tag, el) {
//   if (selectedTags.has(tag)) {
//     selectedTags.delete(tag);
//     el.classList.remove('active');
//   } else {
//     selectedTags.add(tag);
//     el.classList.add('active');
//   }
// }
// trackName.onclick = () => openEditor(tracks[current]);


// function playAll() {
//   tracks = [...allTracks];
//   shuffle(tracks);
//   current = 0;

//   loadTrack(current);
//   audio.play();
// }

// function playTag(tag) {
//   const filtered = allTracks.filter(t => safeTags(t).includes(tag));

//   if (!filtered.length) return;

//   tracks = filtered;
//   shuffle(tracks);
//   current = 0;

//   loadTrack(current);
//   audio.play();
// }

// function openEditor(track) {
//   activeTrackIndex = allTracks.indexOf(track); // 🔥 find real index

//   selectedTags = new Set(track.tags || []);

//   document.getElementById('tag-editor').style.display = 'block';
//   document.getElementById('editor-title').textContent = track.url;

//   renderEditorTags();
//   renderTags();
// }

// function renderEditorTags() {
//   const container = document.getElementById('editor-tags');
//   container.innerHTML = '';

//   const track = allTracks[activeTrackIndex];

//   (track.tags || []).forEach(tag => {
//     const el = document.createElement('span');
//     el.textContent = tag + ' ✕';

//     el.onclick = () => {
//       track.tags = track.tags.filter(t => t !== tag);
//       renderEditorTags();
//     };

//     container.appendChild(el);
//     container.appendChild(document.createTextNode(' '));
//   });
// }

// function addTag() {
//   const input = document.getElementById('new-tag');
//   const tag = input.value.trim();

//   if (!tag) return;

//   const track = allTracks[activeTrackIndex];

//   if (!track.tags.includes(tag)) {
//     track.tags.push(tag);
//   }

//   input.value = '';
//   renderEditorTags();
// }

// function saveTags() {
//   fetch('https://music.hughfuchsen.workers.dev/save-tags', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       index: activeTrackIndex,
//       tags: [...selectedTags]
//     })
//   })
//   .then(() => fetch('https://music.hughfuchsen.workers.dev/playlist.json'))
//   .then(res => res.json())
//   .then(data => {
//     allTracks = data.tracks;

//     tracks = [...allTracks];
//     shuffle(tracks);

//     renderTags();
//     alert('saved');
//   });
// }



// function safeTags(track) {
//   if (!track.tags) track.tags = [];
//   return track.tags;
// }

// function playSelectedTags() {
//   if (selectedTags.size === 0) return;

//   const filtered = allTracks.filter(track =>
//     safeTags(track).some(tag => selectedTags.has(tag))
//   );

//   tracks = filtered;
//   shuffle(tracks);
//   current = 0;

//   loadTrack(current);
//   audio.play();
// }

// play button handles playback

// controls






