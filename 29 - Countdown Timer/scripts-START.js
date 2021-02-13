let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  // display it first
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it after
    displayTimeLeft(secondsLeft);
  }, 1000);
}

const displayZeroOnTime = (type) => (type < 10 ? "0" : "");

function displayTimeLeft(seconds) {
  let remainderSeconds;
  const hours = Math.floor(seconds / 3600);
  remainderSeconds = seconds % 3600;
  const mins = Math.floor(remainderSeconds / 60);
  remainderSeconds = remainderSeconds % 60;

  const display = `${displayZeroOnTime(hours)}${hours}:${displayZeroOnTime(
    mins
  )}${mins}:${displayZeroOnTime(remainderSeconds)}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const mins = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${displayZeroOnTime(
    mins
  )}${mins}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins * 60);
});
