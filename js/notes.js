// this is called after DOM parsing
const noteParent = document.getElementById('note_area')

draw()

function saveNotes() {
  let notes = localStorage.getItem('notes')
  if (notes == '' || notes == null) {
    console.log('no notes to save')
    return
  }
  console.log('saving notes')
  notes = notes.split(',')
  const textareas = noteParent.querySelectorAll('textarea')
  let save = false
  for (const area of textareas) {
    const safeText = area.value.replace(/,/g, '%2C')
    if (notes[area.id] !== safeText) {
      notes[area.id] = safeText
      save = true
    }
  }
  if (save) {
    localStorage.setItem('notes', notes)
  }
}
setInterval(saveNotes, 1000)

function draw() {
  noteParent.innerHTML = ''
  let notes = localStorage.getItem('notes')
  if (!notes) {
    console.log('no notes to draw')
    return
  }
  notes = notes.split(',')
  for (const noteIndex in notes) {
    const note = notes[noteIndex]

    const element = document.createElement('div')
    const textarea = document.createElement('textarea')
    textarea.id = noteIndex
    textarea.value = note.replace('%2C', ',')
    element.appendChild(textarea)
    element.className = 'note'
    const close = document.createElement('span')
    close.innerText = '\u2715'
    close.class = 'close'
    close.addEventListener('click', event => {
      notes.splice(noteIndex, 1)
      console.log('deleting')
      console.log(notes)
      localStorage.setItem('notes', notes)
      draw()
    })
    element.appendChild(close)
    noteParent.prepend(element)
  }
}

document.getElementById('add_note').addEventListener('click', event => {
  let tempNotes = localStorage.getItem('notes') || ''
  tempNotes += ',New Note!'
  localStorage.setItem('notes', tempNotes)
  draw()
})