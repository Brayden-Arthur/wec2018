// for the /time route #clock and #timer must exists

// ----------------------------------------------------------------------------
// clock
const clockWrap = document.getElementById('clock')

const clock = document.createElement('h1')
const clockOptions = { hour12: true }

const today = document.createElement('p')
const todayOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

function printClock() {
  const date = new Date()
  clock.innerText = date.toLocaleTimeString('en-ca', clockOptions)
  today.innerText = date.toLocaleString('en-ca', todayOptions)
}
printClock()
setInterval(printClock, 1000)

const div = document.createElement('div')
div.appendChild(clock)
clockWrap.appendChild(div)
clockWrap.appendChild(today)

// ----------------------------------------------------------------------------
// timer
const timerWrap = document.getElementById('timer')

const timer = document.createElement('h1')

const pauseButton = document.createElement('span')
pauseButton.innerText = 'Start'

const resetButton = document.createElement('span')
resetButton.innerText = 'Reset'

const input = document.createElement('input')
input.placeholder = 'New timer: i.e "20:00"'

const notice = document.createElement('p')

// holds the timeout for the next tick
let next
// the audio file to play when the timer completes
const audio = new Audio('TimerDoneBell.mp3')

timer.innerHTML = localStorage.getItem('timerTime') || '05:00'
const savedTime = localStorage.getItem('savedTime')
if (savedTime) {
  input.value = savedTime
}
// else use placeholder

function pause(boolAsString) {
  localStorage.setItem('paused', boolAsString)
  const text = boolAsString === 'true' ? 'Start' : 'Stop'
  pauseButton.innerText = text
  tick()
}

input.addEventListener('keyup', event => {
  pause(true)
  if (/^\d{1,2}:\d{2}$/.test(input.value)) {
    notice.innerText= ''
    localStorage.setItem('savedTime', input.value)
    reset()
  } else if (!input.value) {
    notice.innerText= ''
  } else {
    notice.innerText = 'Please use (M)M:SS format'
  }
})

pauseButton.addEventListener('click', event => {
  // flip value
  pause(localStorage.getItem('paused') === 'true' ? 'false' : 'true')
})

function reset() {
  // clearTimeout(next)
  // tick()
  timer.innerHTML = localStorage.getItem('savedTime') || '05:00'
  notice.innerText = ''
}
resetButton.addEventListener('click', reset)

function tick() {
  if (localStorage.getItem('paused') === 'true') {
    console.log('skipping!!')
    return
  }
  const now = timer.innerHTML
  let [minutes, seconds] = now.split(':').map(x => {
    return parseInt(x) || 0
  })
  if (--seconds < 0) {
    seconds = '59'
    minutes--
  }
  if (minutes < 0) {
    pause(true)
    audio.play()
    const dateText = (new Date()).toLocaleString()
    notice.innerText = `Timer completed at ${dateText}`
    return
  }
  if (seconds.toString().length == 1) {
    seconds = '0' + seconds
  }
  if (minutes.toString().length == 1) {
    minutes = '0' + minutes
  }
  const newTime = `${minutes}:${seconds}`
  timer.innerHTML = newTime
  localStorage.setItem('timerTime', newTime)
  setTimeout(tick, 1000)
}

pause(localStorage.getItem('paused'))

const elements = [timer, pauseButton, resetButton, input, notice]
for (elem of elements) {
    timerWrap.appendChild(elem)
}