// <script>
const timer = document.getElementById('#timer')
const pause = document.getElementById('#pause')
const reset = document.getElementById('#reset')
const input = document.querySelector('input')

let paused = false

pause.addEventListener('click', event => {
  // Toggle the text 'Start'/'Stop'
  paused = !paused
})

reset.addEventListener('click', event => {
  // TODO
})

const savedTime = localStorage.getItem('savedTime')
start(savedTime)

function validTime(string) {
    return /\d{1,2}:\d{2}/.match(string)
}

function tick() {
  if (paused) {
    return
  }
  const now = timer.innerHTML
  let {minutes, seconds} = presentTime.split(':').map(parseInt)
  if (seconds < 0) {
    seconds = '59'
  }
  if (seconds.toString.length == 1) {
    seconds = '0' + seconds
  }
  if (seconds == 59) {
    minutes--
  }
  if (minutes < 0) {
    alert('TODO add noise')
  }
  timer.innerHTML = `${minutes}:${seconds}`
  setTimeout(tick, 1000)
}
// </script>
/*
<div id='timer'></div>
<div class='button'>Start</div>
<input type='text' placeholder='20:00'> */