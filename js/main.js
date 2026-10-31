/* Flair Studio — animations communes à toutes les pages.
   1. Accueil : le menu reste en haut ; une bande claire apparaît derrière dès qu'on descend.
      Un clic sur la vidéo fait descendre la page jusqu'au contenu.
   2. Accueil : les vidéos du hero s'enchaînent en fondu, en boucle.
   3. Les grands paragraphes (.t-big, .t-huge) sont découpés en mots pour monter ligne par ligne, l'une après l'autre.
   4. Chaque section .fx reçoit la classe "in" quand elle entre dans l'écran ;
      un bloc .fx-late à l'intérieur attend que ses 3/4 soient visibles (paragraphes principaux de about us et get in touch).
   Le texte reste écrit normalement dans le HTML : le découpage se fait ici, à l'ouverture de la page. */
(function () {
  var root = document.documentElement;
  var LINE_DELAY = 0.07;   // secondes entre deux lignes d'un grand paragraphe (30-80 ms : au-delà, les derniers mots, liens compris, arrivent trop tard)
  var CARD_DELAY = 0.05;   // secondes entre deux vignettes de projet qui apparaissent ensemble (plafonné à 8 vignettes)

  // Rechargement de la page : retour tout en haut (hero), sans reprendre la position ni l'ancre (#...), et les animations
  // d'arrivée rejouent comme à la première visite. Le retour arrière (page projet -> accueil) garde, lui, la position.
  var navEntry = window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  if (navEntry && navEntry.type === 'reload') {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    var toTop = function () { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); };   // 'instant' : html a scroll-behavior: smooth
    toTop();
    document.addEventListener('DOMContentLoaded', toTop);
    window.addEventListener('pagehide', function () { history.scrollRestoration = 'auto'; });   // en quittant la page : le retour arrière retrouvera la position
  }

  // Lance une vidéo muette. Si le navigateur refuse (iPhone en mode économie d'énergie), un bouton lecture apparaît
  // au centre de la vidéo (style.css, .play-btn) ; un tap la lance. Le bouton disparaît dès que la vidéo joue.
  window.flairPlay = function (v) {
    var pr = v.play();
    if (!pr) return;
    pr.catch(function (err) {
      var box = v.parentNode;
      if (!err || err.name !== 'NotAllowedError' || !box || box.querySelector(':scope > .play-btn')) return;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'play-btn';
      b.setAttribute('aria-label', root.lang === 'fr' ? 'Lire la vidéo' : 'Play video');
      b.innerHTML = '<svg viewBox="0 0 18 20" aria-hidden="true"><path d="M2 1.5v17L17 10z" fill="currentColor"></path></svg>';
      b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); var p2 = v.play(); if (p2) p2.catch(function () {}); });
      v.addEventListener('playing', function () { b.remove(); }, { once: true });
      if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
      box.appendChild(b);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    // 0. Mobile : bouton "menu" qui ouvre la navigation en plein écran
    var menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
      var head = menuBtn.closest('.site-header');
      var openLabel = menuBtn.getAttribute('aria-label'), closeLabel = menuBtn.dataset.close || 'Close menu';
      var setMenu = function (open) {
        head.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? closeLabel : openLabel);
      };
      menuBtn.addEventListener('click', function () { setMenu(!head.classList.contains('open')); });
      head.querySelectorAll('.nav-main a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    }

    // 1. Menu fixé avec bande au scroll
    var header = document.querySelector('.site-header.on-hero');
    if (header) {
      var onScroll = function () {
        var down = window.scrollY > 10;
        header.classList.toggle('scrolled', down);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Clic sur le hero (hors liens) : la page descend jusqu'au contenu, sous la bande de navigation
    var hero = document.querySelector('.hero');
    if (hero && hero.nextElementSibling) {
      hero.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        // iPhone en mode économie d'énergie : la lecture automatique est bloquée. Le premier tap lance la vidéo au lieu de faire descendre la page.
        var hv = hero.querySelector('.hero-vid');
        if (hv && hv.paused && hv.currentSrc) { window.flairPlay(hv); return; }
        var nav = header ? header.offsetHeight : 0;
        window.scrollTo({ top: hero.nextElementSibling.getBoundingClientRect().top + window.scrollY - nav, behavior: 'smooth' });
      });
    }

    // Animations réduites : les vidéos en lecture automatique restent arrêtées sur leur image de départ (attribut poster)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('video[autoplay], video[data-play]').forEach(function (v) { v.autoplay = false; v.pause(); v.removeAttribute('src'); v.querySelectorAll('source').forEach(function (s) { s.remove(); }); v.load(); });
      return;
    }

    // Petites vidéos (cartes, attribut data-autoplay) : elles ne jouent, et ne se téléchargent, que lorsqu'elles approchent de l'écran
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) window.flairPlay(e.target); else e.target.pause();
        });
      }, { rootMargin: '200px 0px' });
      document.querySelectorAll('video[data-autoplay]').forEach(function (v) { vio.observe(v); });
    }

    // Vidéo du hero (attribut data-play) : elle démarre une fois la page chargée, pour laisser passer d'abord textes, polices
    // et premières images. En attendant, son image d'aperçu (poster) est affichée.
    var heroVid = document.querySelector('.hero-vid[data-play]');
    if (heroVid) {
      var startHero = function () { heroVid.preload = 'auto'; window.flairPlay(heroVid); };
      if (document.readyState === 'complete') startHero(); else window.addEventListener('load', startHero, { once: true });
    }

    // 2. Vidéos du hero : quand l'une se termine, la suivante démarre en fondu
    //    La vidéo suivante n'est téléchargée que 8 s avant la fin de celle qui joue (pas 19 Mo d'un coup à l'ouverture).
    //    (une seule vidéo dans le hero : elle tourne en boucle)
    var vids = document.querySelectorAll('.hero-vid');
    vids.forEach(function (v, i) {
      if (vids.length < 2) { v.loop = true; return; }
      v.addEventListener('timeupdate', function () {
        var next = vids[(i + 1) % vids.length];
        if (next.dataset.loading || next.preload === 'auto' || !v.duration || v.duration - v.currentTime > 8) return;   // déjà chargée : rien à faire
        next.dataset.loading = '1'; next.preload = 'auto'; next.load();
      });
      v.addEventListener('ended', function () {
        var next = vids[(i + 1) % vids.length];
        next.currentTime = 0;
        next.play();
        next.classList.add('on');
        v.classList.remove('on');
      });
    });
  });

  // Passage vignette -> page projet : l'image de la vignette cliquée prend le nom "project-img", que la page projet donne à son image ;
  // le navigateur fait glisser l'une vers l'autre (style.css, section 13). Le nom est retiré au retour sur la page.
  function clearCardNames() { document.querySelectorAll('.card img, .card video').forEach(function (m) { m.style.viewTransitionName = ''; }); }
  document.addEventListener('click', function (e) {
    var card = e.target.closest && e.target.closest('a.card[href*="project.html"]');
    if (!card || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    clearCardNames();
    var m = card.querySelector('img, video');
    if (m) m.style.viewTransitionName = 'project-img';
  });
  window.addEventListener('pagereveal', clearCardNames);
  // Arrivée sur l'accueil (EN/FR) : pas de transition. Le visiteur scrolle tout de suite depuis la vidéo,
  // et pendant une transition le navigateur retient le scroll (petit blocage). Ailleurs, le fondu court reste.
  window.addEventListener('pagereveal', function (e) {
    if (e.viewTransition && (document.querySelector('.hero') || /(^|\/)((index|fr|nl)(\.html)?)?$/.test(location.pathname))) e.viewTransition.skipTransition();
  });

  // Grands paragraphes écrits avec des <br> (une phrase par ligne sur grand écran) : chaque morceau entre deux <br>
  // devient un bloc <span class="seg">. Le navigateur applique alors text-wrap: pretty à chacun, donc aucune phrase
  // ne finit sur un mot seul avant la coupure (« Brussels. », « créneau. » sur téléphone). Dans le HTML, on continue d'écrire des <br>.
  // Le titre du hero garde ses <br> (coupure voulue, deux ou trois mots par ligne).
  function segmentBreaks(el) {
    if (!el.querySelector(':scope > br')) return;
    var seg = null, kids = Array.prototype.slice.call(el.childNodes);
    kids.forEach(function (n) {
      if (n.nodeName === 'BR') { el.removeChild(n); seg = null; return; }
      if (!seg) { seg = document.createElement('span'); seg.className = 'seg'; el.insertBefore(seg, n); }
      seg.appendChild(n);
    });
    // espaces en début ou fin de morceau (retours à la ligne du HTML) : retirés, sinon ils décalent la ligne
    el.querySelectorAll(':scope > .seg').forEach(function (s) {
      var f = s.firstChild, l = s.lastChild;
      if (f && f.nodeType === 3) f.nodeValue = f.nodeValue.replace(/^[ \t\n\r\f]+/, '');
      if (l && l.nodeType === 3) l.nodeValue = l.nodeValue.replace(/[ \t\n\r\f]+$/, '');
      if (!s.textContent.trim()) s.remove();
    });
  }
  // Paragraphe sans <br> : l'espace entre les deux derniers mots devient insécable, donc le dernier mot n'est jamais seul
  // sur sa ligne. text-wrap: pretty ne suffit pas sur les longs paragraphes d'un téléphone (« throughout. », « publication. »).
  // Les phrases découpées en .seg n'en ont pas besoin (déjà équilibrées) : le collage y gênerait l'équilibrage.
  // Seulement quand les deux mots sont dans le même texte (pas autour d'un lien) et restent courts (21 signes max ensemble).
  function glueLastWords(el) {
    if (el.querySelector(':scope > .seg')) return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), last = null;
    while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) last = walker.currentNode;
    if (!last) return;
    var v = last.nodeValue, end = v.replace(/[ \t\n\r\f]+$/, ''), m = /([^ \t\n\r\f]+)[ \t\n\r\f]+([^ \t\n\r\f]+)$/.exec(end);
    if (!m || (m[1] + m[2]).length > 21) return;
    last.nodeValue = end.slice(0, m.index) + m[1] + '\u00a0' + m[2] + v.slice(end.length);
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.t-big, .t-huge, .hero-lead').forEach(segmentBreaks);
    document.querySelectorAll('.t-big, .t-huge, .hero-lead, .text2, .faq summary > span').forEach(glueLastWords);
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  // Découpe chaque mot d'un élément en <span class="ln"><span>mot</span></span>, en gardant liens et retours à la ligne.
  // - On coupe seulement sur les espaces ordinaires : les espaces insécables (&nbsp; avant ? ! : ; en français) restent
  //   dans le mot, donc la ponctuation ne part jamais seule à la ligne.
  // - Une ponctuation collée juste après un lien (« … 81 14</a>. ») est attachée au lien dans un <span class="nw">,
  //   pour qu'elle ne se retrouve pas seule sur une ligne.
  var SPACE = /([ \t\n\r\f]+)/;
  function splitWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var parts = node.nodeValue.split(SPACE);
      var frag = document.createDocumentFragment();
      var glue = null;   // ponctuation à coller à l'élément qui précède
      var inLink = node.parentNode !== el && node.parentNode.closest('a');
      parts.forEach(function (part, i) {
        if (!part) return;
        if (SPACE.test(part) && /^[ \t\n\r\f]+$/.test(part)) {
          // Dans un lien souligné, l'espace entre deux mots monte avec eux, trait compris : petit bloc .sp avec une espace insécable,
          // suivi d'un espace de largeur nulle qui garde la possibilité d'aller à la ligne.
          if (inLink && i > 0 && i < parts.length - 1) {
            var so = document.createElement('span'); so.className = 'ln sp';
            var si = document.createElement('span'); si.textContent = ' ';
            so.appendChild(si); frag.appendChild(so); frag.appendChild(document.createTextNode('​'));
            return;
          }
          frag.appendChild(document.createTextNode(' ')); return;
        }
        var outer = document.createElement('span');
        outer.className = 'ln';
        var inner = document.createElement('span');
        inner.textContent = part;
        outer.appendChild(inner);
        var prev = node.previousSibling;
        if (i === 0 && prev && prev.nodeType === 1 && prev.nodeName !== 'BR' && !prev.classList.contains('ln')) { glue = { prev: prev, word: outer }; return; }
        frag.appendChild(outer);
      });
      var parent = node.parentNode;
      if (glue) {
        var nw = document.createElement('span');
        nw.className = 'nw';
        parent.insertBefore(nw, glue.prev);
        nw.appendChild(glue.prev);
        nw.appendChild(glue.word);
      }
      parent.replaceChild(frag, node);
    });
  }

  // Donne à chaque mot le retard de sa ligne (mesurée à l'écran), en continuant d'un paragraphe au suivant dans la section.
  // Les mots d'un bloc .fx-late sont laissés à ce bloc, qui a son propre déclencheur.
  function staggerLines(scope) {
    var line = -1, lastTop = -Infinity, base = parseFloat(scope.dataset.fxDelay) || 0;   // data-fx-delay : retard de départ (titre du hero)
    // on mesure d'abord tous les mots (une seule mise en page), puis on écrit les retards : pas d'aller-retour lecture/écriture
    var words = Array.prototype.filter.call(scope.querySelectorAll('.t-big .ln, .t-huge .ln, .hero-title .ln'), function (w) {
      var late = w.closest('.fx-late');
      return !(late && late !== scope);
    });
    var tops = words.map(function (w) { return w.getBoundingClientRect().top; });
    words.forEach(function (w, j) {
      if (tops[j] > lastTop + 2) { line++; lastTop = tops[j]; }
      w.firstChild.style.transitionDelay = (base + line * LINE_DELAY) + 's';
    });
    // espace de lien tombé en fin de ligne : on masque son trait (pas de bout de soulignement qui dépasse)
    words.forEach(function (w, j) {
      if (w.classList.contains('sp')) w.classList.toggle('eol', !words[j + 1] || tops[j + 1] > tops[j] + 2);
    });
  }

  window.flairAnimate = function (scope) {
    (scope || document).querySelectorAll('.fx .t-big, .fx .t-huge, .fx .hero-title').forEach(function (el) {
      if (!el.dataset.split) { splitWords(el); el.dataset.split = '1'; }
    });
    (scope || document).querySelectorAll('.fx:not(.in)').forEach(function (s) { io.observe(s); });
    (scope || document).querySelectorAll('.fx .fx-late:not(.in)').forEach(function (s) { ioLate.observe(s); });
  };

  // Vignettes de projet d'une même section : elles apparaissent l'une après l'autre (CARD_DELAY), pas toutes d'un coup.
  function staggerCards(scope) {
    scope.querySelectorAll('.card').forEach(function (c, i) {
      var d = Math.min(i, 8) * CARD_DELAY + 's';
      c.querySelectorAll('img, video, .cap').forEach(function (el) { el.style.transitionDelay = d; });
    });
  }

  function reveal(e, obs) {
    if (e.isIntersecting) { staggerLines(e.target); staggerCards(e.target); e.target.classList.add('in'); obs.unobserve(e.target); }
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { reveal(e, io); });
  }, { rootMargin: '0px 0px -12% 0px' });
  // .fx-late : se déclenche quand 75 % du bloc est visible, c.-à-d. quand son point aux 3/4 (depuis le haut) entre dans l'écran.
  // Si le bloc est plus haut que l'écran (téléphone à l'horizontale, zoom, grand texte), il ne peut jamais être visible à 75 % :
  // il se déclenche alors dès qu'il occupe 75 % de la zone visible. Sans ça, le texte restait invisible pour toujours.
  var STEPS = [];
  for (var t = 0; t <= 20; t++) STEPS.push(t / 20);
  var ioLate = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var fills = e.rootBounds && e.intersectionRect.height >= 0.75 * e.rootBounds.height;
      if (e.intersectionRatio >= 0.75 || fills) reveal(e, ioLate);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: STEPS });

  // Images d'une section : elles apparaissent dans l'ordre de la page, en fondu court, jamais avant celle qui les précède
  // (sinon elles surgissent dans l'ordre où elles finissent de charger). Celles qui arrivent ensemble se suivent de près.
  // La première image du premier écran s'affiche dès son arrivée, sans fondu : c'est elle que le navigateur mesure.
  function inOrder(section) {
    var imgs = Array.prototype.slice.call(section.querySelectorAll('img')), k = 0;
    var first = section.classList.contains('fx-first');
    // wait : invisible jusqu'à son tour ; waited : garde son fondu d'apparition (style.css)
    imgs.forEach(function (im, j) { if (!im.complete && !(first && j === 0)) im.classList.add('wait', 'waited'); });
    function next() {
      var n = 0;
      while (k < imgs.length && imgs[k].complete) {
        var im = imgs[k++];
        if (!im.classList.contains('wait')) continue;
        if (section.classList.contains('in')) im.style.transitionDelay = (n++ * 0.06) + 's';
        im.classList.remove('wait');
      }
      if (k < imgs.length) { imgs[k].addEventListener('load', next, { once: true }); imgs[k].addEventListener('error', next, { once: true }); }
    }
    next();
  }

  root.classList.add('js-fx');
  document.addEventListener('DOMContentLoaded', function () {
    // Sections déjà à l'écran à l'ouverture : animation adoucie (style.css, .fx-first) ; textes et images sont visibles
    // dès le premier affichage au lieu d'apparaître depuis rien. Les sections plus bas gardent l'apparition complète.
    document.querySelectorAll('.fx').forEach(function (s) { if (s.getBoundingClientRect().top < window.innerHeight) s.classList.add('fx-first'); });
    window.flairAnimate();
    document.querySelectorAll('.fx').forEach(inOrder);
    // titre du hero : il monte tout de suite, sans attendre l'observateur (qui peut tarder pendant que la vidéo se charge)
    var hb = document.querySelector('.hero-bottom.fx:not(.in)');
    if (hb) { io.unobserve(hb); staggerLines(hb); hb.classList.add('in'); }
  });
})();
