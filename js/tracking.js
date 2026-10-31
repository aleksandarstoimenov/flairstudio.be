/* Flair Studio — mesure des visites, VERSION DE TEST (démo).
   Meta Pixel et Google Tag Manager (qui porte Google Analytics) se chargent tout de suite, sans bandeau cookies.
   Avant la vraie mise en ligne : remplacer ce fichier par _maquette/tracking-pour-plus-tard/consent.js
   (bandeau + chargement seulement après accord, obligatoire en Belgique / UE) et remettre privacy.html.
   js/quote.js envoie fbq('track', 'Lead') et l'événement dataLayer « generate_lead » quand une demande de devis part. */
(function () {
  var META_PIXEL_ID = '1097298469967335';
  var GTM_ID = 'GTM-WQB8K5XH';   // Google Tag Manager, le même conteneur que l'ancien site (Google Analytics y est réglé)

  // Meta Pixel (code fourni par Meta)
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');

  // Google Tag Manager (code fourni par Google)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var g = document.createElement('script'); g.async = true; g.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(g);
})();
