(() => {
  'use strict';

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

  // Cabecera: marca el scroll con una línea dorada
  const header = $('#header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menú móvil
  const menuBtn = $('.menu-btn');
  const nav = $('#nav');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Cerrar' : 'Menú';
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Enlace de la página actual (sirve para todas las páginas del sitio)
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('#nav a').forEach((a) => {
    if (a.getAttribute('href') === current) a.setAttribute('aria-current', 'page');
  });

  // Año del pie
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Citas
  const quoteBox = $('#quote');
  if (quoteBox) {
    const quotes = [
      { text: 'Conócete a ti mismo.', author: 'Inscripción del templo de Apolo en Delfos' },
      { text: 'El asombro es el comienzo de la filosofía.', author: 'Platón, Teeteto' },
      { text: 'Solo sé que no sé nada.', author: 'Atribuida a Sócrates' },
      { text: 'La vida sin examen no merece ser vivida.', author: 'Sócrates, en la Apología de Platón' },
      { text: 'El ser humano es, por naturaleza, un animal político.', author: 'Aristóteles, Política' },
      { text: 'Nadie se baña dos veces en el mismo río.', author: 'Atribuida a Heráclito' }
    ];
    const text = $('#quote-text');
    const author = $('#quote-author');
    let index = Math.floor(Math.random() * quotes.length);

    const show = (i) => {
      text.textContent = `«${quotes[i].text}»`;
      author.textContent = quotes[i].author;
    };
    show(index);

    $('#quote-btn').addEventListener('click', () => {
      quoteBox.classList.add('swap');
      setTimeout(() => {
        index = (index + 1) % quotes.length;
        show(index);
        quoteBox.classList.remove('swap');
      }, 250);
    });
  }
})();
