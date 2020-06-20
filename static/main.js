/* Get Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const controls = player.querySelector(".player__controls");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleButton = player.querySelector(".togglePlayback");
const volume = player.querySelector(".playerVolume");
const speed = player.querySelector(".playerSpeed");
const fullscreen = player.querySelector(".toggleFullscreen");

/* Functions */
function togglePlay() {
  const icon = toggleButton.querySelector(".player__playbackIcon");
  video.paused ? video.play() : video.pause();
  icon.classList.toggle("player__playbackIcon--paused");
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleSeek(e) {
  const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = seekTime;
}

// Create fullscreen video button
function toggleFullscreen() {
  if (!document.webkitFullscreenElement) {
    if (video.requestFullScreen) {
      player.requestFullScreen();
    } else if (video.webkitRequestFullScreen) {
      player.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  } else {
    document.webkitExitFullscreen();
  }
}

var countrolsHideTimeout;
function toggleControls() {
  if (!video.paused) {
    clearTimeout(countrolsHideTimeout);
    controls.classList.add("player__controls--visible");
    countrolsHideTimeout = setTimeout(() => {
      controls.classList.remove("player__controls--visible");
    }, 3000);
  }
}

/* Hook up the event listeners */

video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", togglePlay);
volume.addEventListener("change", handleRangeUpdate);
volume.addEventListener("mousemove", handleRangeUpdate);
speed.addEventListener("change", handleRangeUpdate);

let mousedown = false;
progress.addEventListener("click", handleSeek);
progress.addEventListener("mousemove", (e) => mousedown && handleSeek(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullscreen.addEventListener("click", toggleFullscreen);
video.addEventListener("dblclick", toggleFullscreen);

video.addEventListener("mousemove", toggleControls);
controls.addEventListener("mouseover", () => {
  clearTimeout(countrolsHideTimeout);
});

changeImage = (index) => {
  let elmt = document.getElementById(`video-popup-${index}`);
  if (elmt.classList.contains("none")) {
    elmt.classList.remove("none");
  } else {
    elmt.classList.add("none");
  }
};

let timeouts = 13000;

window.onload = () => {
  setTimeout(() => {
    changeImage(1);
  }, timeouts);
  setTimeout(() => {
    changeImage(1);
  }, timeouts + 5000);
  setTimeout(() => {
    changeImage(2);
  }, timeouts + 23000);
  setTimeout(() => {
    changeImage(2);
  }, timeouts + 27000);
  setTimeout(() => {
    changeImage(3);
  }, timeouts + 32000);
  setTimeout(() => {
    changeImage(3);
  }, timeouts + 41000);
};
