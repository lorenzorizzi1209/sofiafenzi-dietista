// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// Navbar shadow on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Cookie consent banner + analytics (Google Analytics + Meta Pixel)
// Lascia i valori vuoti finche non hai gli ID reali: senza ID lo script
// non carica nulla e il banner continua comunque a funzionare.
const GA_MEASUREMENT_ID = 'G-D03G6FQD9G';
const META_PIXEL_ID = '';     // es. '000000000000000'

// Titoli di pagina inviati a Google Analytics. I nomi degli eventi di GA non ammettono
// spazi o "|", quindi i due momenti sono tracciati come page_view con un titolo dedicato.
const GA_TITLE_HOME = 'Sofia Fenzi | Home';     // quando qualcuno arriva sul sito
const GA_TITLE_PREZZI = 'Sofia Fenzi | Prezzi'; // quando vengono visualizzati i box dei prezzi

// Solo i pulsanti WhatsApp ("Scrivimi", "Fammi una domanda") contano come contatto
function trackButtonClicks() {
  document.querySelectorAll('a[href^="https://wa.me"]').forEach(el => {
    el.addEventListener('click', () => {
      const label = el.dataset.label || el.textContent.replace(/\s+/g, ' ').trim();
      if (window.gtag) {
        window.gtag('event', 'contact_click', { event_category: 'contatto', event_label: label });
      }
      if (window.fbq) {
        window.fbq('track', 'Contact', { method: label });
      }
    });
  });
}

function loadAnalytics() {
  if (window.__analyticsLoaded) return;
  window.__analyticsLoaded = true;

  if (GA_MEASUREMENT_ID) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    // Le visualizzazioni vengono inviate a mano, con i titoli dedicati qui sotto
    gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  }

  if (META_PIXEL_ID) {
    (function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // Visualizzazione 1: arrivo sul sito. Nella pagina principale ha il titolo "Home";
  // nelle altre pagine (es. cookie policy) resta il titolo normale della pagina
  if (window.gtag) {
    if (document.getElementById('hero')) {
      window.gtag('event', 'page_view', { page_title: GA_TITLE_HOME });
    } else {
      window.gtag('event', 'page_view');
    }
  }

  // Visualizzazione 2: box con i prezzi (una sola volta per visita)
  const priceBoxes = document.querySelector('.price-cards');
  if (priceBoxes) {
    const pricingObserver = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        pricingObserver.disconnect();
        if (window.gtag) window.gtag('event', 'page_view', { page_title: GA_TITLE_PREZZI });
        if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'Percorsi e Costi' });
      }
    }, { threshold: 0.25 });
    pricingObserver.observe(priceBoxes);
  }

  trackButtonClicks();
}

// Versione della scelta sui cookie. Per far rifare la scelta a tutti i visitatori
// basta aumentare il numero: le scelte salvate con versioni precedenti vengono ignorate.
const CONSENT_VERSION = 2;
const CONSENT_KEY = 'cookie_consent_v' + CONSENT_VERSION;
const LEGACY_CONSENT_KEYS = ['cookie_consent'];

// La memoria del browser può non essere disponibile (modalità privata, blocchi):
// in quel caso il banner deve comunque comparire e funzionare per la visita in corso
function readConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* scelta valida solo per questa visita */ }
}

function clearSavedConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
    LEGACY_CONSENT_KEYS.forEach(key => localStorage.removeItem(key));
  } catch (e) { /* niente da rimuovere */ }
}

// Cancella i cookie di misurazione (Google Analytics, Meta) rimasti da una scelta precedente.
// Non deve mai bloccare il banner: alcuni browser integrati (es. Instagram) possono vietare
// l'accesso a document.cookie, quindi tutto è in try/catch
function clearTrackingCookies() {
  try {
    const names = document.cookie.split(';')
      .map(c => c.split('=')[0].trim())
      .filter(n => n === '_ga' || n.indexOf('_ga_') === 0 || n === '_gid' || n === '_gat' || n === '_fbp' || n === '_fbc');
    if (!names.length) return;

    const host = location.hostname;
    const parts = host.split('.');
    const domains = [host, '.' + host];
    if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));

    names.forEach(name => {
      const expired = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = expired;
      domains.forEach(d => { document.cookie = expired + '; domain=' + d; });
    });
  } catch (e) { /* accesso ai cookie non consentito: niente da cancellare */ }
}

const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner) {
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieReject = document.getElementById('cookieReject');
  const consent = readConsent();

  // Il banner compare finché l'utente non ha scelto: nessuna scelta automatica
  if (consent === 'accepted') {
    try { loadAnalytics(); } catch (e) { /* un errore del tracciamento non deve bloccare il sito */ }
  } else {
    // prima si mostra il banner, poi si fa pulizia: un errore nella pulizia non può nasconderlo
    if (consent !== 'rejected') {
      cookieBanner.classList.add('show');
    }
    clearTrackingCookies();
  }

  cookieAccept.addEventListener('click', () => {
    saveConsent('accepted');
    cookieBanner.classList.remove('show');
    try { loadAnalytics(); } catch (e) { /* un errore del tracciamento non deve bloccare il sito */ }
  });

  cookieReject.addEventListener('click', () => {
    saveConsent('rejected');
    cookieBanner.classList.remove('show');
    clearTrackingCookies();
  });
}

// Permette di revocare o modificare la scelta sui cookie in qualsiasi momento
document.querySelectorAll('.cookie-preferences-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    clearSavedConsent();
    clearTrackingCookies();
    location.reload();
  });
});
