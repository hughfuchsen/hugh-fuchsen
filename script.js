function setFixedViewportHeight() {
  const height = window.innerHeight - 30;

  document.documentElement.style.setProperty(
      '--fixed-viewport-height',
      `${height}px`
  );
}

setFixedViewportHeight();

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

function toggleExpandMusicWindow(windowID) {

  const windowElement = document.getElementById("music-explore");

  windowElement.style.display =
      windowElement.style.display === "none" ? "block" : "none";
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
  windowElement.style.backgroundColor = 'rgb(255, 255, 123)';

  setTimeout(() => {
      windowElement.style.backgroundColor = '';
  }, 1500);

  // if (window.location.pathname === '/train-chasey') {
  //     document.addEventListener('DOMContentLoaded', () => {
  //         showWindow('window-game-dev');
  //     });
  // }

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
  }, 1500);

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
let currentAlbum = '';
let currentPlaylist = '';

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

  // shuffle(tracks);

  current = 0;

  loadTrack(current);

  audio.play();

  document.getElementById('playPauseToggle').textContent = '⏸';
}

function playRandomTrack() {
  if (tracks.length === 0) return;

  let randomIndex;

  do {
      randomIndex = Math.floor(Math.random() * tracks.length);
  } while (tracks.length > 1 && randomIndex === currentTrackIndex);

  loadTrack(randomIndex);
  audio.play();
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
const trackArt = document.getElementById('trackArt');
const trackName = document.getElementById('trackName');


let allTracks = [];   // full dataset (with tags)
let tracks = [];      // playback queue
let current = 0;


// fetch('./playlist.json')
//   .then(res => res.json())
//   .then(data => {

//     // supports both formats:
//     const list = data.tracks || data;

//     allTracks = list.map(t => ({
//       url: t.url,
//       tags: t.tags || []
//     }));

//     tracks = [...allTracks];

//     shuffle(tracks);
//     loadTrack(0);
//   });

fetch('/playlist.json')
    .then(res => res.json())
    .then(data => {

        const list = data.tracks || data;

        allTracks = list.map(t => ({
            url: t.url,
            img: t.img,
            tags: t.tags || []
        }));

        populateAlbums();

        const musicLoaded = loadMusicFromURL();

        if (!musicLoaded) {
            loadPlaylistBasedOnTag('featured');
        }


    });

function loadPlaylistBasedOnTag(tag) {

  currentTag = tag;

  tracks = allTracks.filter(track =>
    track.tags.includes(tag)
  );

  if (tracks.length === 0) {
    console.log("No tracks found for:", tag);
    return;
  }

  // shuffle(tracks);

  current = 0;

  loadTrack(current);

  document.getElementById('playPauseToggle').textContent = '▶';
}



function loadTrack(index) {

  const track = tracks[index];

  if (!track) return;

  const file = track.url.split('/').pop();

  let name = file
      .replace(/\.[^/.]+$/, "")
      .replace(/^\d+[\s.\-_]*/, "")
      .replace(/-/g, " ");

  trackName.textContent = name.toLowerCase();


  trackArt.src = "https://music.hughfuchsen.workers.dev/" + track.img;

  console.log("Artwork URL:", trackArt.src);

  audio.src =
      "https://music.hughfuchsen.workers.dev/" + track.url;

  updatePlaylistUI();

  if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
          title: name.toLowerCase(),
          artist: "hugh fuchsen"
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (!tracks.length) return;
  
        current = (current - 1 + tracks.length) % tracks.length;
        loadTrack(current);
  
        audio.play().catch(error => {
            console.log('Playback failed:', error);
        });
    });
  
    navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (!tracks.length) return;
  
        current = (current + 1) % tracks.length;
        loadTrack(current);
  
        audio.play().catch(error => {
            console.log('Playback failed:', error);
        });
    });
  
    // Disable the 10-second seek actions where supported
    try {
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
    } catch (error) {
        console.log('Seek handlers unavailable:', error);
    }
  }
}


const timeSlider = document.getElementById('timeSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
    timeSlider.max = audio.duration;
    durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    timeSlider.max = Number.isFinite(audio.duration) ? audio.duration : 0;
    timeSlider.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

timeSlider.addEventListener('input', () => {
    audio.currentTime = Number(timeSlider.value);
});


// if ('mediaSession' in navigator) {
//   navigator.mediaSession.setActionHandler('previoustrack', () => {
//       if (!tracks.length) return;

//       current = (current - 1 + tracks.length) % tracks.length;
//       loadTrack(current);

//       audio.play().catch(error => {
//           console.log('Playback failed:', error);
//       });
//   });

//   navigator.mediaSession.setActionHandler('nexttrack', () => {
//       if (!tracks.length) return;

//       current = (current + 1) % tracks.length;
//       loadTrack(current);

//       audio.play().catch(error => {
//           console.log('Playback failed:', error);
//       });
//   });

//   // Disable the 10-second seek actions where supported
//   try {
//       navigator.mediaSession.setActionHandler('seekbackward', null);
//       navigator.mediaSession.setActionHandler('seekforward', null);
//   } catch (error) {
//       console.log('Seek handlers unavailable:', error);
//   }
// }



function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}



function openPlaylistFromURL(playlistSlug) {
  const tag = playlistSlug.toLowerCase();

  const matchingTracks = allTracks.filter(track =>
      track.tags.some(t => t.toLowerCase() === tag)
  );

  if (matchingTracks.length === 0) {
      console.log("Playlist not found:", tag);
      return false;
  }

  currentTag = tag;
  tracks = [...matchingTracks];
  // shuffle(tracks);
  current = 0;

  loadTrack(current);

  document.getElementById('playPauseToggle').textContent = '▶';

  // Show the normal music player / explore view
  document.getElementById('music-explore').style.display = 'none';
  document.getElementById('music-albums-section').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'none';
  document.getElementById('music-playlist-section').style.display = 'none';

  openPlaylist(playlistSlug);

  return true;
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

function getNextTrackIndex(direction = 1) {
  if (shuffleEnabled && tracks.length > 1) {
      let randomIndex;

      do {
          randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === current);

      return randomIndex;
  }

  return (current + direction + tracks.length) % tracks.length;
}

document.getElementById('next').onclick = () => {
  if (shuffleEnabled) {
      playNextShuffledTrack();
  } else {
      current = (current + 1) % tracks.length;
      loadTrack(current);
      audio.play();
      document.getElementById('playPauseToggle').textContent = '⏸';
  }
};

document.getElementById('prev').onclick = () => {
  if (shuffleEnabled && shuffleHistoryPosition > 0) {
      shuffleHistoryPosition--;
      current = shuffleHistory[shuffleHistoryPosition];
  } else {
      current = (current - 1 + tracks.length) % tracks.length;
  }

  loadTrack(current);
  audio.play();
  document.getElementById('playPauseToggle').textContent = '⏸';
};



let shuffleEnabled = false;
let repeatMode = 0; // 0 = off, 1 = repeat all, 2 = repeat one

let shuffleHistory = [];
let shuffleHistoryPosition = -1;

function playNextShuffledTrack() {
  if (tracks.length <= 1) return;

  // If we've gone backwards in history, discard the future
  shuffleHistory = shuffleHistory.slice(0, shuffleHistoryPosition + 1);

  let availableTracks = tracks
      .map((_, index) => index)
      .filter(index => index !== current);

  const randomIndex = Math.floor(Math.random() * availableTracks.length);
  current = availableTracks[randomIndex];

  shuffleHistory.push(current);
  shuffleHistoryPosition = shuffleHistory.length - 1;

  loadTrack(current);
  audio.play();
  document.getElementById('playPauseToggle').textContent = '⏸';
}

function toggleShuffle() {
    shuffleEnabled = !shuffleEnabled;

    const button = document.getElementById('shuffle');
    button.classList.toggle('active', shuffleEnabled);
}

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;

    const button = document.getElementById('repeat');

    if (repeatMode === 0) {
        button.textContent = '🔁';
        button.classList.remove('active');
        button.title = 'Repeat off';
    } else if (repeatMode === 1) {
        button.textContent = '🔁';
        button.classList.add('active');
        button.title = 'Repeat all';
    } else {
        button.textContent = '🔂';
        button.classList.add('active');
        button.title = 'Repeat one';
    }
}

document.getElementById('shuffle').onclick = toggleShuffle;
document.getElementById('repeat').onclick = toggleRepeat;


audio.addEventListener('ended', () => {
  if (repeatMode === 2) {
      // Repeat the current track
      audio.currentTime = 0;
      audio.play();
      return;
  }

  if (repeatMode === 0 && !shuffleEnabled && current === tracks.length - 1) {
      // Stop at the end when repeat is off
      document.getElementById('playPauseToggle').textContent = '▶';
      return;
  }

  // Continue to another track
  current = getNextTrackIndex(1);
  loadTrack(current);
  document.getElementById('playPauseToggle').textContent = '⏸';
  audio.play();
});


if ('mediaSession' in navigator) {

  navigator.mediaSession.setActionHandler('previoustrack', () => {
      current = (current - 1 + tracks.length) % tracks.length;
      loadTrack(current);
      audio.play();
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
      current = (current + 1) % tracks.length;
      loadTrack(current);
      audio.play();
  });

}

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

function getAlbumFromTrack(track) {

  const parts = track.url.split('/');

  // Expected:
  // artist / albums / album / track.m4a

  if (parts.length >= 4 && parts[1] === 'albums') {
      return parts[2];
  }

  return null;
}

function getAlbums() {

  const albums = [];

  allTracks.forEach(track => {

      const album = getAlbumFromTrack(track);

      if (album && !albums.includes(album)) {
          albums.push(album);
      }

  });

  return albums;
}

function populateAlbums() {

  const container = document.getElementById('music-albums');

  container.innerHTML = '';

  const albums = getAlbums();

  albums.forEach(album => {

      const button = document.createElement('button');

      button.textContent = album
          .replace(/-/g, ' ')
          .toLowerCase();



      button.id = 'explore';
      button.onclick = () => openAlbum(album);

      container.appendChild(button);

  });
}


function openAlbum(albumName) {
  const container = document.getElementById('music-album-tracks');
  container.innerHTML = '';
  currentAlbum = albumName;

  history.replaceState(null, '', `/album/${encodeURIComponent(albumName)}`);

  const albumTracks = allTracks.filter(track => {
      const parts = track.url.split('/');

      return (
          parts.length >= 4 &&
          parts[1] === 'albums' &&
          parts[2] === albumName
      );
  });

  albumTracks.forEach((track, index) => {
      const button = document.createElement('button');
      button.id = 'explore';

      const file = track.url.split('/').pop();

      const name = file
          .replace(/\.[^/.]+$/, '')
          .replace(/^\d+[\s._-]+/, '')
          .replace(/-/g, ' ')
          .toLowerCase();

      button.textContent = name;
      button.onclick = () => playAlbumTrack(albumTracks, index);

      container.appendChild(button);
  });
  
  // Set the album as the current playlist
  tracks = [...albumTracks];
  current = 0;
  currentTag = '';

  // Only load the first track if nothing is currently playing
  if (tracks.length > 0 && audio.paused) {
    loadTrack(current);
    document.getElementById('playPauseToggle').textContent = '▶';
  }

  updatePlaylistUI();

  document.getElementById('music-explore').style.display = 'none';
  document.getElementById('music-albums-section').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'block';
}



function openPlaylist(playlistName) {
  const container = document.getElementById('music-playlist-tracks');
  container.innerHTML = '';

  history.replaceState(
      null,
      '',
      `/playlist/${encodeURIComponent(playlistName)}`
  );

  let playlistTracks;

  if (playlistName.toLowerCase() === 'all') {
      playlistTracks = [...allTracks];
  } else {
      playlistTracks = allTracks.filter(track =>
          track.tags.some(tag =>
              tag.toLowerCase() === playlistName.toLowerCase()
          )
      );
  }

  playlistTracks.forEach((track, index) => {
      const button = document.createElement('button');
      button.id = 'explore';

      const file = track.url.split('/').pop();
      const name = file
          .replace(/\.[^/.]+$/, '')
          .replace(/^\d+[\s._-]+/, '')
          .replace(/-/g, ' ')
          .toLowerCase();

      button.textContent = name;
      button.onclick = () => playPlaylistTrack(playlistTracks, index, playlistName);

      container.appendChild(button);
  });

  document.getElementById('music-explore').style.display = 'none';
  document.getElementById('music-albums-section').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'none';
  document.getElementById('music-a-to-z-section').style.display = 'none';
  document.getElementById('music-playlist-section').style.display = 'none';
  document.getElementById('music-playlist-tracks-section').style.display = 'block';
}



function playPlaylistTrack(playlistTracks, index, playlistName) {
  tracks = [...playlistTracks];
  current = index;
  currentTag = playlistName;

  loadTrack(current);
  updatePlaylistUI();

  audio.play()
      .then(() => {
          document.getElementById('playPauseToggle').textContent = '⏸';
      })
      .catch(error => console.log('Playback failed:', error));
}




function openAlbumFromURL(albumSlug) {
  const album = getAlbums().find(
      name => name.toLowerCase() === albumSlug.toLowerCase()
  );

  if (!album) {
      console.log('Album not found:', albumSlug);
      return false;
  }

  openAlbum(album);
  
  return true;
}


function playAlbumTrack(albumTracks, index) {

  tracks = [...albumTracks];

  current = index;
  currentTag = '';
  loadTrack(current);
  
  let name = currentAlbum.replace(/-/g, " ");

  tagName.textContent = name.toLowerCase();

  updatePlaylistUI();

  audio.play();

  document.getElementById('playPauseToggle').textContent = '⏸';
}

function openAlbumsSection() {

  document.getElementById('music-explore').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'none';
  document.getElementById('music-albums-section').style.display = 'block';
  document.getElementById('music-a-to-z-section').style.display = 'none';
  document.getElementById('music-playlist-section').style.display = 'none';
  document.getElementById('music-playlist-tracks-section').style.display = 'none';

}

function openMusicTagsIDSection() {

  document.getElementById('music-albums-section').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'none';
  document.getElementById('music-explore').style.display = 'block';
  document.getElementById('music-a-to-z-section').style.display = 'none';
  document.getElementById('music-playlist-section').style.display = 'none';
  document.getElementById('music-playlist-tracks-section').style.display = 'none';

}

function openPlaylistSection() {

  document.getElementById('music-albums-section').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'none';
  document.getElementById('music-explore').style.display = 'none';
  document.getElementById('music-a-to-z-section').style.display = 'none';
  document.getElementById('music-playlist-section').style.display = 'block';
  document.getElementById('music-playlist-tracks-section').style.display = 'none';

}

function getTrackName(track) {

  const file = track.url.split('/').pop();

  return file
      .replace(/\.[^/.]+$/, '')
      .replace(/^\d+[\s._-]*/, '')
      .replace(/-/g, ' ')
      .toLowerCase();
}

function openAtoZSection() {

  const container = document.getElementById('music-a-to-z-tracks');

  container.innerHTML = '';

  // Sort tracks alphabetically by displayed name
  const sortedTracks = [...allTracks].sort((a, b) => {

      const nameA = getTrackName(a);
      const nameB = getTrackName(b);

      return nameA.localeCompare(nameB);

  });
  

  let currentLetter = '';

  sortedTracks.forEach((track) => {

      const name = getTrackName(track);

      // Get first letter
      const letter = name.charAt(0).toLowerCase();

      // Add letter heading when the letter changes
      if (letter !== currentLetter) {

          currentLetter = letter;

          const heading = document.createElement('div');

          heading.textContent = letter;
          heading.className = 'a-to-z-heading';

          container.appendChild(heading);
      }

      // Create track button
      const button = document.createElement('button');

      button.id = 'explore';
      button.textContent = name;

      
      button.onclick = () => {
        // Use the entire catalogue in alphabetical order
        tracks = [...sortedTracks];

        // Start at the clicked track
        current = tracks.findIndex(t => t.url === track.url);

        if (current === -1) return;

        currentTag = 'all a-z';

        loadTrack(current);
        updatePlaylistUI();

        audio.play()
            .then(() => {
                document.getElementById('playPauseToggle').textContent = '⏸';
            })
            .catch(error => {
                console.log('Playback failed:', error);
            });
      };


      container.appendChild(button);

  });

  document.getElementById('music-explore').style.display = 'none';
  document.getElementById('music-albums-section').style.display = 'none';
  document.getElementById('music-album-tracks-section').style.display = 'none';
  document.getElementById('music-a-to-z-section').style.display = 'block';
  document.getElementById('music-playlist-section').style.display = 'none';
  document.getElementById('music-playlist-tracks-section').style.display = 'none';

}


// function loadSongFromURL() {

//     const parts = window.location.pathname
//         .split('/')
//         .filter(part => part !== '');

//     console.log("URL path:", window.location.pathname);
//     console.log("URL parts:", parts);

//     // Must be /listen/song-name
//     if (parts.length !== 2 || parts[0] !== 'listen') {
//         console.log("Not a song URL");
//         return false;
//     }

//     const songSlug = parts[1].toLowerCase();

//     console.log("Looking for song:", songSlug);

//     const trackIndex = allTracks.findIndex(track => {

//         const filename = track.url
//             .split('/')
//             .pop()
//             .replace(/\.[^/.]+$/, '')
//             .replace(/^\d+[\s._-]*/, '')
//             .toLowerCase();

//         console.log("Comparing against:", filename);

//         return filename === songSlug;

//     });

//     console.log("Found track index:", trackIndex);

//     if (trackIndex === -1) {
//         console.log("Song not found:", songSlug);
//         return false;
//     }

//     tracks = [...allTracks];

//     current = trackIndex;

//     currentTag = '';

//     loadTrack(current);

//     console.log("Loaded:", tracks[current].url);

//     audio.play()
//         .then(() => {
//             console.log("Audio started");
//         })
//         .catch(error => {
//             console.log("Autoplay blocked:", error);
//         });

//     document.getElementById('playPauseToggle').textContent = '⏸';

//     return true;
// }



function loadMusicFromURL() {
  const parts = window.location.pathname
      .split('/')
      .filter(part => part !== '');

  if (parts.length !== 2) return false;

  const type = parts[0].toLowerCase();
  const slug = decodeURIComponent(parts[1]).toLowerCase();

  if (type === 'listen') {
      const trackIndex = allTracks.findIndex(track => {
          const filename = track.url
              .split('/')
              .pop()
              .replace(/\.[^/.]+$/, '')
              .replace(/^\d+[\s._-]+/, '')
              .toLowerCase();

          return filename === slug;
      });

      if (trackIndex === -1) return false;

      tracks = [...allTracks];
      current = trackIndex;
      currentTag = '';

      loadTrack(current);

      audio.play()
          .then(() => {
              document.getElementById('playPauseToggle').textContent = '⏸';
          })
          .catch(error => console.log('Autoplay blocked:', error));

      return true;
  }

  if (type === 'album') {
      openAlbumFromURL(slug);
      return true;
  }

  

  if (type === 'playlist') {
      openPlaylistFromURL(slug);
      return true;
  }

  return false;
}


// vercel

// ,
//     {
//       "source": "/train-chasey",
//       "destination": "/index.html"
//     }