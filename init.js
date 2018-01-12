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

// adding routes
Router
.add(/time/, () => {
  showPage('time')
})
.add(/notes/, () => {
  showPage('notes')
})
.add(/todo/, () => {
  showPage('todo')
})
.add(/calendar/, () => {
  showPage('calendar')
})
.add(() => {
  Router.navigate('/time')
})
.listen()

Router.navigate('/notes')

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
    currentPage.style = 'display: none'
  }
  const page = document.querySelector('template#' + id)
  // only render it once to preserve state
  if (!renderedPages[id]) {
    const wrapper = document.createElement('div')
    wrapper.appendChild(document.importNode(page.content, true))
    renderedPages[id] = wrapper
    document.body.appendChild(renderedPages[id])
  }
  currentPage = renderedPages[id]
  currentPage.style = 'display: block'
}

const links = document.querySelectorAll('nav section h2')
Array.prototype.forEach.call(links, elem => {
  elem.addEventListener('click', ev => {
      Router.navigate(`${elem.innerText.toLowerCase()}`)
  })
})