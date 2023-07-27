let pokemonRepository = (function () {
  let t = [];
  async function e() {
    try {
      let t = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150'),
        e = await t.json();
      e.results.forEach(function (t) {
        let e = {
          name: t.name.charAt(0).toUpperCase() + t.name.slice(1),
          height: t.height,
          weight: t.weight,
          detailsUrl: t.url,
        };
        n(e);
      });
    } catch (o) {
      console.error(o);
    }
  }
  function n(e) {
    'object' == typeof e && 'name' in e && 'height' in e && 'weight' in e
      ? t.push(e)
      : console.log('pokemon is not correct');
  }
  function o() {
    return t;
  }
  function i(t) {
    pokemonRepository.loadDetails(t).then(function (t) {
      let e = document.getElementById('modal-container'),
        n = document.getElementById('pokedex-modal'),
        o = document.getElementById('modal-height'),
        i = document.getElementById('modal-image'),
        a = document.getElementById('modal-close');
      (n.textContent = 'Name: ' + t.name),
        (o.textContent = 'Height: ' + (0.328084 * t.height).toFixed(2) + ' ft'),
        (o.style.marginTop = '10px'),
        o.insertAdjacentHTML(
          'beforeend',
          '<br>Weight: ' + (0.220462 * t.weight).toFixed(2) + ' lbs'
        ),
        i.setAttribute('src', t.imageUrl),
        i.setAttribute('alt', t.name),
        a.addEventListener('click', function () {
          e.style.display = 'none';
        }),
        (e.style.display = 'block');
    });
  }
  async function a(t) {
    let e = t.detailsUrl;
    try {
      let n = await fetch(e),
        o = await n.json();
      (t.imageUrl = o.sprites.front_default),
        (t.weight = o.weight),
        (t.height = o.height),
        (t.types = o.types);
    } catch (i) {
      console.error(i);
    }
    return t;
  }
  return {
    add: n,
    getAll: o,
    addListItem: function t(e) {
      let n = document.getElementById('pokemonRow'),
        o = document.createElement('div'),
        a = document.createElement('button');
      o.classList.add(
        'col-lg-3',
        'col-md-4',
        'col-sm-6',
        'mb-3',
        'pokemon-card'
      ),
        (a.innerText = e.name),
        a.classList.add('btn', 'btn-primary', 'w-100'),
        a.setAttribute('data-target', '#modal-container'),
        a.setAttribute('data-toggle', 'modal'),
        o.appendChild(a),
        n.appendChild(o),
        a.addEventListener('click', () => {
          i(e);
        });
    },
    loadList: e,
    loadDetails: a,
    showDetails: i,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
