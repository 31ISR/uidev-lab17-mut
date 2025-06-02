let startTime = 0
let elapsedTime = 0
let timerInterval = null
let isRunning = false
let lapCount = 0

const startBtn = document.getElementById("startBtn")
const stopBtn = document.getElementById("stopBtn")
const lapBtn = document.getElementById("lapBtn")
const resetBtn = document.getElementById("resetBtn")
const hoursElement = document.getElementById("hours")
const minutesElement = document.getElementById("minutes")
const secondsElement = document.getElementById("seconds")
const hoursCircle = document.getElementById("hours-circle")
const minutesCircle = document.getElementById("minutes-circle")
const secondsCircle = document.getElementById("seconds-circle")
const lapsContainer = document.getElementById("lapsContainer")
const lapList = document.getElementById("lapList")

const circumference = 2 * Math.PI * 52 

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime
        timerInterval = setInterval(updateDisplay, 10) 
        isRunning = true

        startBtn.disabled = true
        stopBtn.disabled = false
        lapBtn.disabled = false
    }
}

function stopStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval)
        isRunning = false

        startBtn.disabled = false
        stopBtn.disabled = true
        lapBtn.disabled = true
    }
}

function resetStopwatch() {
    clearInterval(timerInterval)
    isRunning = false
    elapsedTime = 0
    lapCount = 0

    updateDisplay()

    startBtn.disabled = false
    stopBtn.disabled = true
    lapBtn.disabled = true

    lapList.innerHTML = ""
    lapsContainer.style.display = "none"
}

function recordLap() {
    if (isRunning) {
        lapCount++
        const currentTime = formatTime(elapsedTime)

        const lapItem = document.createElement("div")
        lapItem.className = "lap-item"
        lapItem.innerHTML = `
                    <span class="lap-number">Lap ${lapCount}</span>
                    <span class="lap-time">${currentTime}</span>
                `

        lapList.insertBefore(lapItem, lapList.firstChild)
        lapsContainer.style.display = "block"
    }
}

function updateDisplay() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime
    }

    const totalSeconds = Math.floor(elapsedTime / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    hoursElement.textContent = hours.toString().padStart(2, "0")
    minutesElement.textContent = minutes.toString().padStart(2, "0")
    secondsElement.textContent = seconds.toString().padStart(2, "0")

    updateCircleProgress(hoursCircle, hours, 24) 
    updateCircleProgress(minutesCircle, minutes, 60) 
    updateCircleProgress(secondsCircle, seconds, 60) 
}

function updateCircleProgress(circle, value, max) {
    const progress = (value / max) * circumference
    circle.style.strokeDasharray = `${progress} ${circumference}`
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const ms = Math.floor((milliseconds % 1000) / 10)

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms
        .toString()
        .padStart(2, "0")}`
}

updateDisplay()

startBtn.addEventListener("click", startStopwatch)
stopBtn.addEventListener("click", stopStopwatch)
lapBtn.addEventListener("click", recordLap)
resetBtn.addEventListener("click", resetStopwatch)
