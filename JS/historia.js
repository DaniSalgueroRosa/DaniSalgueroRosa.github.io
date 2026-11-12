(() => {
  'use strict';

  const root = document.getElementById('historia');
  const indice = document.getElementById('indice');
  const lista = document.getElementById('lista');
  const articles = [...document.querySelectorAll('.art')];
  if (!root || !indice || !lista || !articles.length) return;

  const title = (art) => art.querySelector('h2').textContent;
  const baseTitle = document.title;

  // Con JavaScript activo se muestra un artículo cada vez
  root.classList.add('js');

  // El índice se genera a partir de los propios artículos
  articles.forEach((art, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${art.id}">
      <span class="era">${art.querySelector('.era').textContent}</span>
      <div><h3>${title(art)}</h3><p>${art.querySelector('.lead-art').textContent}</p></div>
    </a>`;
    lista.append(li);

    // Navegación inferior de cada artículo: anterior, índice y siguiente
    const prev = articles[i - 1];
    const next = articles[i + 1];
    const nav = document.createElement('nav');
    nav.className = 'art-nav';
    nav.setAttribute('aria-label', 'Más artículos');
    nav.innerHTML =
      (prev ? `<a href="#${prev.id}">Anterior: ${title(prev)}</a>` : '<span></span>') +
      '<a href="#indice">Todos los artículos</a>' +
      (next ? `<a href="#${next.id}">Siguiente: ${title(next)}</a>` : '<span></span>');
    art.append(nav);
    art.querySelector('h2').tabIndex = -1;
  });

  // Si una foto no existe, se quita y el artículo ocupa todo el ancho
  document.querySelectorAll('.foto img').forEach((img) => {
    const quitar = () => img.closest('.foto').remove();
    if (img.complete && img.naturalWidth === 0) quitar();
    else img.addEventListener('error', quitar, { once: true });
  });


  // Muestra el artículo indicado en la dirección (#egipto) o el índice
  let firstRender = true;
  const render = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const active = articles.find((a) => a.id === id);

    articles.forEach((a) => a.classList.toggle('active', a === active));
    indice.hidden = Boolean(active);
    document.title = active ? `${title(active)} | El Ágora` : baseTitle;

    if (!firstRender || active) {
      root.scrollIntoView({ block: 'start' });
      if (active) active.querySelector('h2').focus({ preventScroll: true });
    }
    firstRender = false;
  };

  window.addEventListener('hashchange', render);
  render();
})();
