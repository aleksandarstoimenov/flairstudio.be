/* Flair Studio — page projet.
   Lit l'identifiant dans l'adresse (project.html?p=docks) et affiche le projet correspondant de js/projects.js. */
(function () {
  var list = (window.FLAIR_PROJECTS || []).filter(function (p) { return !p.hidden; });
  if (!list.length) return;
  var $ = function (k) { return document.querySelector('[data-p="' + k + '"]'); };

  var id = new URLSearchParams(location.search).get('p');
  var i = Math.max(0, list.findIndex(function (p) { return p.id === id; }));
  var p = list[i];
  var prev = list[(i - 1 + list.length) % list.length];
  var next = list[(i + 1) % list.length];
  var k = 0;

  document.title = p.title + ' – Flair Studio';
  $('title').textContent = p.title;
  var fr = document.documentElement.lang === 'fr';
  $('client').textContent = fr ? (p.client || '').replace(' and ', ' et ') : (p.client || '');

  // visionneuse : les images glissent horizontalement (‹ ›, clic sur l'image, flèches du clavier, glissé au doigt).
  // En boucle comme sur le site actuel : une copie de la dernière image est placée avant la première et
  // une copie de la première après la dernière ; arrivé sur une copie, on saute sans animation sur la vraie.
  var n = p.images.length, many = n > 1;
  var viewer = $('viewer'), track = $('track');
  $('prevImg').hidden = $('nextImg').hidden = !many;
  viewer.classList.toggle('many', many);

  // versions WebP de chaque photo (js/images.js, créé par outils/images.py) : le navigateur prend la plus petite qui reste nette.
  // Largeur affichée : tout l'écran sur téléphone ; sinon l'image tient dans la visionneuse, limitée par sa largeur ou sa hauteur.
  var widths = window.FLAIR_IMG || {};
  var box = viewer.getBoundingClientRect();
  var phone = window.matchMedia('(max-width: 760px)').matches;
  function webp(name, w, ws) { return (w === ws[ws.length - 1] ? 'assets/img/' : 'assets/img/' + w + '/') + name + '.webp'; }
  function shownWidth(im) {   // largeur affichée, en px CSS
    var r = (im.ratio || '1').split('/'), ratio = parseFloat(r[0]) / (parseFloat(r[1]) || 1);
    return phone || !box.height ? window.innerWidth : Math.ceil(Math.min(box.width, box.height * ratio));
  }
  function responsive(media, im) {
    var name = im.src.replace(/^.*\//, '').replace(/\.jpg$/, ''), ws = widths[name];
    if (!ws || !/\.jpg$/.test(im.src)) return;
    media.srcset = ws.map(function (w) { return webp(name, w, ws) + ' ' + w + 'w'; }).join(', ');
    media.sizes = phone || !box.height ? '100vw' : shownWidth(im) + 'px';
  }
  // image d'aperçu d'une vidéo (poster n'accepte pas srcset) : la plus petite version WebP assez nette pour cet écran
  function poster(im) {
    var name = im.src.replace(/^.*\//, '').replace(/\.jpg$/, ''), ws = widths[name];
    if (!ws || !/\.jpg$/.test(im.src)) return im.src;
    var need = shownWidth(im) * (window.devicePixelRatio || 1);
    var w = ws.filter(function (x) { return x >= need; })[0] || ws[ws.length - 1];
    return webp(name, w, ws);
  }

  function slide(im, eager, clone, first) {
    var s = document.createElement('div');
    s.className = clone ? 'slide clone' : 'slide';
    var media;
    if (im.video) {   // vidéo : muette, en boucle, lue seulement quand sa slide est à l'écran ; l'image sert d'aperçu
      media = document.createElement('video');
      media.src = im.video; media.poster = poster(im);
      media.muted = true; media.loop = true; media.playsInline = true;
      media.preload = 'none';   // rien n'est téléchargé avant la lecture (voir update) : l'aperçu s'affiche d'abord
      media.setAttribute('aria-label', im.alt);
    } else {
      media = document.createElement('img');
      responsive(media, im);   // srcset et sizes avant src : une seule image téléchargée
      media.src = im.src; media.alt = im.alt; media.decoding = 'async';
      if (!eager) media.loading = 'lazy';
      if (first) media.fetchPriority = 'high';
      // pas encore chargée : elle apparaîtra en fondu (style.css, .slide img.fade). Sauf la première affichée :
      // elle s'affiche dès son arrivée, un fondu retarderait le moment où le navigateur la compte affichée.
      if (!media.complete && !first) {
        media.classList.add('fade');
        media.addEventListener('load', function () { media.classList.add('loaded'); }, { once: true });
      }
    }
    // téléphone (images empilées) : la place est réservée avant le chargement, la page ne saute pas
    if (im.ratio) media.style.aspectRatio = im.ratio;
    s.appendChild(media);
    return s;
  }
  var order = many ? [p.images[n - 1]].concat(p.images, [p.images[0]]) : p.images;
  order.forEach(function (im, j) { track.appendChild(slide(im, j <= 2 || j === order.length - 1, many && (j === 0 || j === order.length - 1), j === (many ? 1 : 0))); });
  // téléphone : les images sont empilées (voir style.css, section 11) ; le diaporama est désactivé
  var stacked = window.matchMedia('(max-width: 760px)');

  var pos = many ? 1 : 0, busy = false;   // pos = position dans .track (copies comprises)
  function place(animate) {
    track.style.transition = animate ? '' : 'none';
    track.style.transform = 'translateX(' + (-pos * 100) + '%)';
    if (!animate) void track.offsetWidth;   // applique la position avant de remettre l'animation
  }
  // Les vidéos ne démarrent qu'une fois la page chargée : images et textes passent d'abord, l'aperçu s'affiche en attendant.
  var loaded = document.readyState === 'complete';
  if (!loaded) window.addEventListener('load', function () { loaded = true; update(); }, { once: true });
  function play(v) { window.flairPlay(v); }   // main.js : bouton lecture si l'iPhone refuse la lecture automatique
  // téléphone : les vidéos empilées ne jouent (et ne se téléchargent) que lorsqu'elles approchent de l'écran
  var near = 'IntersectionObserver' in window && new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) play(e.target); else e.target.pause(); });
  }, { rootMargin: '200px 0px' });
  function update() {
    if (stacked.matches) {
      if (!loaded) return;
      track.querySelectorAll('.slide:not(.clone) video').forEach(function (v) { if (near) near.observe(v); else play(v); });
      return;
    }
    k = many ? (pos - 1 + n) % n : 0;
    $('count').textContent = many ? (k + 1) + ' / ' + n : '';
    // seule la vidéo de la slide affichée joue
    Array.prototype.forEach.call(track.children, function (s, j) {
      var v = s.querySelector('video');
      if (!v) return;
      if (j === pos && loaded) play(v); else v.pause();
    });
  }
  function go(step) {
    if (!many || busy || stacked.matches) return;
    busy = true;
    pos += step;
    place(true);
    update();
  }
  track.addEventListener('transitionend', function (e) {
    if (e.target !== track) return;
    if (pos === 0) { pos = n; place(false); }
    if (pos === n + 1) { pos = 1; place(false); }
    update();
    busy = false;
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // pas d'animation, donc pas de transitionend : on recale tout de suite
    var goNow = go;
    go = function (step) { goNow(step); if (pos === 0) pos = n; if (pos === n + 1) pos = 1; place(false); busy = false; };
  }

  $('prevImg').addEventListener('click', function () { go(-1); });
  $('nextImg').addEventListener('click', function () { go(1); });
  track.addEventListener('click', function (e) { if (/^(IMG|VIDEO)$/.test(e.target.tagName)) go(1); });   // clic sur l'image : suivante
  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  var x0 = null;   // glissé au doigt
  viewer.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });
  place(false);
  update();

  // Transition entre pages (style.css, section 13) : l'image affichée porte le nom "project-img", à l'arrivée (pagereveal)
  // comme au départ (pageswap), pour glisser depuis la vignette cliquée ou vers le projet suivant.
  function shown() {
    if (stacked.matches) return track.querySelector('.slide:not(.clone) img, .slide:not(.clone) video');
    var s = track.children[pos];
    return s ? s.querySelector('img, video') : null;
  }
  function nameShown(e) {
    if (!e.viewTransition) return;
    track.querySelectorAll('img, video').forEach(function (m) { m.style.viewTransitionName = ''; });
    var m = shown();
    if (m) m.style.viewTransitionName = 'project-img';
  }
  window.addEventListener('pagereveal', nameShown);
  window.addEventListener('pageswap', nameShown);

  // projet précédent / suivant
  // même page que celle affichée (project.html ou project-fr.html)
  var page = fr ? 'project-fr.html' : 'project.html';
  $('prev').href = page + '?p=' + prev.id;
  $('next').href = page + '?p=' + next.id;

  // bouton de langue (en-tête et menu mobile) : on reste sur le même projet dans l'autre langue
  document.querySelectorAll('a[href="project.html"], a[href="project-fr.html"]').forEach(function (a) {
    a.href = a.getAttribute('href') + '?p=' + p.id;
  });
})();
