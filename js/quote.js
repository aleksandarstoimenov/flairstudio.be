/* Flair Studio — formulaire de demande de devis (quote.html et offer.html).
   - note d'où vient la demande (utm_source / utm_campaign de l'adresse) dans le champ caché "source"
   - envoie la demande à Netlify Forms sans quitter la page et affiche un message de confirmation
   - si l'envoi échoue (par ex. en local, hors Netlify), ouvre le logiciel de mail avec la demande pré-remplie
   - vérifie que l'adresse mail a un vrai domaine : forme complète, fautes de frappe courantes (gmial.com…),
     puis existence du domaine (il doit pouvoir recevoir du mail) via le DNS public de Cloudflare.
     Seul le domaine (ce qui suit @) est envoyé à Cloudflare. Si le DNS ne répond pas, on laisse passer. */
(function () {
  var form = document.querySelector('[data-quote]');
  if (!form) return;
  // textes affichés par le script, selon la langue de la page (<html lang>)
  var FR = document.documentElement.lang === 'fr';
  var T = FR ? {
    sending: 'Envoi…',
    full: 'Indiquez une adresse e-mail complète, par exemple nom@bureau.be.',
    mean: function (a) { return 'Vouliez-vous dire ' + a + '\u00a0?'; },
    nodomain: function (d) { return 'Nous ne trouvons pas «\u00a0' + d + '\u00a0». Vérifiez votre adresse e-mail.'; },
    subject: 'Demande de devis – ',
    mail: 'Votre logiciel de mail devrait s’ouvrir avec votre demande. Sinon, écrivez-nous à hello@flairstudio.be.',
    thanks: 'Merci. Votre demande est bien partie, nous revenons vers vous rapidement.'
  } : {
    sending: 'Sending…',
    full: 'Please enter a full email address, like name@studio.be.',
    mean: function (a) { return 'Did you mean ' + a + '?'; },
    nodomain: function (d) { return 'We can’t find “' + d + '”. Please check your email address.'; },
    subject: 'Quote request – ',
    mail: 'Your email app should open with your request. If it doesn’t, write to hello@flairstudio.be.',
    thanks: 'Thank you. Your request is on its way, and we’ll get back to you shortly.'
  };
  var status = form.querySelector('.form-status');
  var params = new URLSearchParams(location.search);
  var src = form.querySelector('[name="source"]');
  var utm = [params.get('utm_source'), params.get('utm_campaign')].filter(Boolean).join(' / ');
  if (utm) src.value = src.value + ' (' + utm + ')';

  var btn = form.querySelector('button[type="submit"]');
  var label = btn.textContent;

  // Texte du bouton : il se brouille (flou 2 px, 120 ms), change, puis redevient net. Le flou masque le passage d'un mot à l'autre.
  function setLabel(text) {
    btn.classList.add('swap');
    setTimeout(function () { btn.textContent = text; btn.classList.remove('swap'); }, 120);
  }
  function busy(on) {   // pendant l'envoi : bouton bloqué, "Sending…" ; sinon retour au texte d'origine
    btn.disabled = on;
    btn.classList.toggle('sending', on);
    setLabel(on ? T.sending : label);
  }
  // Message : il apparaît en montant de 8 px (400 ms, voir .form-status dans style.css)
  // Le message est écrit une image après l'affichage de la zone (role="status") : les lecteurs d'écran
  // n'annoncent un changement que dans une zone déjà présente, pas un texte qui apparaît en même temps qu'elle.
  function say(text) {
    status.classList.add('enter');
    status.hidden = false;
    void status.offsetWidth;   // applique l'état de départ avant de lancer la transition
    requestAnimationFrame(function () {
      status.textContent = text;
      status.classList.remove('enter');
    });
  }

  // --- vérification de l'adresse mail ---
  var email = form.querySelector('[name="email"]');
  var TYPOS = {
    'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gamil.com': 'gmail.com',
    'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'outlok.com': 'outlook.com', 'outlook.co': 'outlook.com',
    'yahoo.co': 'yahoo.com', 'yaho.com': 'yahoo.com', 'icloud.co': 'icloud.com', 'iclod.com': 'icloud.com', 'skynet.b': 'skynet.be', 'telenet.b': 'telenet.be'
  };
  var known = {};   // domaine -> existe ou non (pour ne demander qu'une fois)
  function domainOf(v) {
    var m = /^[^\s@]+@((?:[a-z0-9-]+\.)+[a-z]{2,})$/i.exec(v.trim());
    return m ? m[1].toLowerCase() : null;
  }
  function dns(d, type) {
    return fetch('https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(d) + '&type=' + type, { headers: { accept: 'application/dns-json' } })
      .then(function (r) { return r.json(); });
  }
  function domainExists(d) {
    if (d in known) return Promise.resolve(known[d]);
    return dns(d, 'MX').then(function (r) {
      if (r.Status === 0 && r.Answer && r.Answer.length) return true;   // le domaine reçoit du mail
      if (r.Status === 3) return false;                                  // le domaine n'existe pas
      return dns(d, 'A').then(function (a) { return a.Status === 0 && !!(a.Answer && a.Answer.length); });
    }).then(function (ok) { known[d] = ok; return ok; }, function () { return true; });   // DNS injoignable : on ne bloque pas
  }
  function checkEmail() {
    email.setCustomValidity('');
    var v = email.value.trim();
    if (!v) return Promise.resolve(true);
    var d = domainOf(v);
    if (!d) { email.setCustomValidity(T.full); return Promise.resolve(false); }
    if (TYPOS[d]) { email.setCustomValidity(T.mean(v.split('@')[0] + '@' + TYPOS[d])); return Promise.resolve(false); }
    return domainExists(d).then(function (ok) {
      if (!ok) email.setCustomValidity(T.nodomain(d));
      return ok;
    });
  }
  email.addEventListener('input', function () { email.setCustomValidity(''); });
  email.addEventListener('change', function () { checkEmail().then(function (ok) { if (!ok) email.reportValidity(); }); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.querySelector('[name="_gotcha"]').value) return;   // robot
    var data = new FormData(form);
    function viaMail() {   // secours : si l'envoi échoue (ou en local, hors Netlify), le logiciel de mail s'ouvre avec la demande
      var lines = ['name', 'email', 'phone', 'stage', 'deadline', 'files', 'message', 'source']
        .map(function (k) { return data.get(k) ? k + ': ' + data.get(k) : ''; }).filter(Boolean);
      location.href = 'mailto:hello@flairstudio.be?subject=' + encodeURIComponent(T.subject + (data.get('name') || '')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      say(T.mail);
    }
    busy(true);
    checkEmail().then(function (ok) {
      if (!ok) { busy(false); email.reportValidity(); email.focus(); return; }
      send();
    });
    function send() {
      // Netlify Forms : envoi en arrière-plan vers la page elle-même
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          // demande envoyée : comptée par le Pixel Meta et Google Tag Manager s'ils sont chargés (js/tracking.js)
          if (window.fbq) window.fbq('track', 'Lead');
          if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', form: form.getAttribute('name') || '' });
          // les champs s'effacent en fondu (200 ms), puis le message de confirmation monte à leur place
          form.classList.add('leaving');
          setTimeout(function () {
            form.querySelectorAll('.field, .form-foot').forEach(function (el) { el.hidden = true; });
            form.classList.remove('leaving');
            say(T.thanks);
          }, 200);
        })
        .catch(function () { busy(false); viaMail(); });
    }
  });
})();
