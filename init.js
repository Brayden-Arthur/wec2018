// add listeners for the sidebar links
// must be loaded with defer

const iframe = document.getElementById('main')

const links = document.querySelectorAll('nav section h2')
links.forEach(elem => {
  elem.addEventListener('click', ev => {
      const location = `pages/${elem.innerText.toLowerCase()}.html`
      main.src = location
  })
})