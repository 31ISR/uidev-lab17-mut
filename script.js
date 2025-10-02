const elementSeconds = document.getElementById('seconds');
const elementMinutes = document.getElementById('minutes');
const elementHours = document.getElementById('hours');

const elementCircles = document.querySelectorAll('.circle-progress')

const start = document.getElementById('startBtn');
const stop = document.getElementById('stopBtn');
const lap = document.getElementById("lapBtn");
const reset = document.getElementById("resetBtn");

let isRunning = false

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
    updateCircleProgress(elementCircles[0], hours, 24)
    updateCircleProgress(elementCircles[1], minutes, 60)
    updateCircleProgress(elementCircles[2], seconds, 60)
}

const circumference = 2 * Math.PI * 52
function updateCircleProgress(circle, value, max) {
        const progress = (value / max) * circumference
        circle.style.strokeDasharray = `${progress} ${circumference}`
    }
start.addEventListener('click', () => {

    start.setAttribute('disabled', 'true')
    lap.disabled = false
    stop.disabled = false
    isRunning = true


    


    if (timer) return;
    timer = setInterval(() => {
        count++;
        updateClock();
        console.log(count);

        if (count >= 86400000) {
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

const lapsContainer = document.querySelector('#lapsContainer')
const lapList = document.querySelector('#lapList')

let lapCount = 0
function formatTime(count){
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds
}
lap.addEventListener('click', () => {
    laps.push(count);
    if (isRunning) {
        lapCount++

        const currentTime = formatTime(count)

        const lapItem = document.createElement("div")
        lapItem.className = "lap-item"
        lapItem.innerHTML = `
                    <span class="lap-number">Lap ${lapCount}</span>
                    <span class="lap-time">${currentTime}</span>
                `

        lapList.insertBefore(lapItem, lapList.firstChild)
        lapsContainer.style.display = "block"
    }
});

reset.addEventListener('click', () => {
    lapList.innerHTML = ""
    lapsContainer.style.display = "none"
    lapCount = 0
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
