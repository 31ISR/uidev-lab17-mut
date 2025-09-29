const elementSeconds = document.getElementById('seconds');
const elementMinutes = document.getElementById('minutes');
const elementHours = document.getElementById('hours');

const start = document.getElementById('startBtn');
const stop = document.getElementById('stopBtn');
const lap = document.getElementById("lapBtn");
const reset = document.getElementById("resetBtn");

let count = 0;
let timer = null;
let laps = [];

function updateClock() {
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    elementSeconds.textContent = formattedSeconds;
    elementMinutes.textContent = formattedMinutes;
    elementHours.textContent = formattedHours;
}

start.addEventListener('click', () => {

    start.setAttribute('disabled', 'true')
      lap.disabled = false
      stop.disabled = false



    if (timer) return;
    timer = setInterval(() => {
        count++;
        updateClock();
        console.log(count);

        if (count >= 10000) {
            clearInterval(timer);
            timer = null;
        }
    }, 1000);
});

stop.addEventListener('click', () => {
    start.disabled = false
    lap.disabled = true
    stop.disabled = true

    if (timer) {
        clearInterval(timer);
        timer = null;
    }
});

lap.addEventListener('click', () => {
    laps.push(count);
});

reset.addEventListener('click', () => {
    start.disabled = false
    lap.disabled = true
    stop.disabled = true
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    count = 0;
    laps = [];
    updateClock();
});
