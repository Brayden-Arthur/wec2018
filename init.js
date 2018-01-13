// add listeners for the sidebar links and build router
// must be loaded with defer

// credit to http://krasimirtsonev.com
var Router = {
  routes: [],
  mode: null,
  root: '/',
  getFragment: function() {
      var fragment = '';
      if(this.mode === 'history') {
          fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
          fragment = fragment.replace(/\?(.*)$/, '');
          fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
      } else {
          var match = window.location.href.match(/#(.*)$/);
          fragment = match ? match[1] : '';
      }
      return this.clearSlashes(fragment);
  },
  clearSlashes: function(path) {
      return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },
  add: function(re, handler) {
    if(typeof re == 'function') {
        handler = re;
        re = '';
    }
    this.routes.push({ re: re, handler: handler});
    return this;
  },
  check: function(f) {
    var fragment = f || this.getFragment();
    for(var i=0; i<this.routes.length; i++) {
        var match = fragment.match(this.routes[i].re);
        if(match) {
            match.shift();
            this.routes[i].handler.apply({}, match);
            return this;
        }
    }
    return this;
  },
  listen: function() {
    var self = this;
    var current = self.getFragment();
    var fn = function() {
        if(current !== self.getFragment()) {
            current = self.getFragment();
            self.check(current);
        }
    }
    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },
  navigate: function(path) {
    path = path ? path : '';
    window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    return this;
  }
}

Router.navigate()

// adding routes
Router
.add(/time/, () => {
  console.log('loading /time')
  showPage('time')
  setBackground('time')
})
.add(/notes/, () => {
  showPage('notes')
})
.add(/todo/, () => {
  showPage('todo')
})
.add(/calendar/, () => {
  showPage('calendar')
}).add(() => {
  console.log('empty path, defaulting to /time')
  Router.navigate('/time')
})
.listen()

console.log('redirecting to /time')
Router.navigate('/time')

// .add(/products\/(.*)\/edit\/(.*)/, function() {
//   console.log('products', arguments);
// })

let currentPage
const renderedPages = {}

function showPage(id) {
  if (currentPage) {
    if (currentPage.id == id) {
      console.log('page already loaded, skipping')
      return
    }
    currentPage.className = ''
  }
  // only render it once to preserve state
  if (!renderedPages[id]) {
    const page = document.querySelector(`template#${id}`)
    const wrapper = document.createElement('main')
    wrapper.appendChild(document.importNode(page.content, true))
    document.body.removeChild(page)
    renderedPages[id] = wrapper
    document.body.appendChild(renderedPages[id])
  }
  currentPage = renderedPages[id]
  currentPage.className = 'page'
  console.log('showPage sets id', id)
  currentPage.id = id
}

function setBackground(id) {
  // choose a random background image
  const number = (() => {
    const max = 2, min = 0
    return Math.floor(Math.random()*(max - min + 1) + min)
  })()
  // `background: linear-gradient(#0001, #0001), url('images/${number}.jpg')`
  const timePage = document.getElementById(id)
  timePage.style.backgrondImage = `url('images/${number}.jpg')`
}

const links = document.querySelectorAll('nav section h2')
Array.prototype.forEach.call(links, elem => {
  elem.addEventListener('click', ev => {
      Router.navigate(`${elem.innerText.toLowerCase()}`)
  })
})
