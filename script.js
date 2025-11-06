// Select elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// ----------- FUNCTIONS ----------- //

// 1. Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// 2. Update play/pause button text
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// 3. Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// 4. Handle range updates (volume and playbackRate)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// 5. Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 6. Scrub through the video (when clicking or dragging progress bar)
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// 7. Handle video load error gracefully
video.addEventListener('error', () => {
  alert('⚠️ Error: Video failed to load. Please check "download.mp4" file.');
});

// ----------- EVENT LISTENERS ----------- //

// Play / Pause controls
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Progress bar updates
video.addEventListener('timeupdate', handleProgress);

// Skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Volume and playback rate
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Progress bar scrubbing
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
