(function () {
  'use strict';

  /* =============================================================
     CONTACTO — datos reales + mensajes predeterminados
     ============================================================= */
  var WA_NUMBER = '573233403286';
  var EMAIL = 'info@aipadresanto.com';

  // Mensaje por contexto (clave en data-wa). Sin emojis, voz de marca.
  var WA_MSG = {
    'default':   'Hola Padre Santo. Quiero pedir mi intervención DivinAI para mi equipo de marketing.',
    'cierre':    'Hola Padre Santo. Llevo tiempo viendo el mismo problema en mi marketing y quiero mi intervención.',
    'footer':    'Hola Padre Santo. Quiero más información sobre la intervención DivinAI.',
    'planes':    'Hola Padre Santo. Quiero consultar los planes y cuál se ajusta a mi negocio.',
    'diagnostico': 'Hola Padre Santo. Quiero empezar con el diagnóstico de mi marketing.'
  };
  var MAIL_SUBJECT = 'Quiero mi intervención DivinAI';
  var MAIL_BODY = 'Hola Padre Santo,\n\nLlevo tiempo viendo el mismo problema en mi equipo de marketing y quiero pedir mi intervención.\n\nNombre:\nEmpresa:\nWhatsApp:\n\nGracias.';

  var waLink = function (key, customText) {
    var text = customText || WA_MSG[key] || WA_MSG['default'];
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  };

  // Wire all WhatsApp links
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', waLink(el.getAttribute('data-wa'), el.getAttribute('data-wa-text')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
  // Wire all email links
  document.querySelectorAll('[data-mail]').forEach(function (el) {
    el.setAttribute('href', 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(MAIL_SUBJECT) + '&body=' + encodeURIComponent(MAIL_BODY));
  });

  /* =============================================================
     NAVBAR scroll state
     ============================================================= */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 24) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =============================================================
     MOBILE menu
     ============================================================= */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  var toggleMenu = function (force) {
    if (!mobileMenu || !burger) return;
    var open = force !== undefined ? force : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (burger) burger.addEventListener('click', function () { toggleMenu(); });
  if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { toggleMenu(false); });
  });

  /* =============================================================
     MODAL form
     ============================================================= */
  var modal = document.getElementById('modal');
  var formView = document.getElementById('formView');
  var successView = document.getElementById('successView');
  var form = document.getElementById('contactForm');
  var lastFocus = null;

  var openModal = function () {
    if (!modal) return;
    lastFocus = document.activeElement;
    if (formView) formView.hidden = false;
    if (successView) successView.hidden = true;
    if (form) form.reset();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var n = document.getElementById('f-name'); if (n) n.focus(); }, 60);
  };
  var closeModal = function () {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll('[data-modal]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (mobileMenu && mobileMenu.classList.contains('open')) toggleMenu(false);
      openModal();
    });
  });
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['f-name', 'f-email', 'f-company'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim() || (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value))) {
        input.style.borderColor = '#FF99DC'; ok = false;
      } else { input.style.borderColor = ''; }
    });
    if (!ok) return;

    // Construye el mensaje de WhatsApp con los datos capturados y lo abre.
    var name = (document.getElementById('f-name') || {}).value || '';
    var email = (document.getElementById('f-email') || {}).value || '';
    var company = (document.getElementById('f-company') || {}).value || '';
    var whats = (document.getElementById('f-whats') || {}).value || '';
    var msg = 'Hola Padre Santo, quiero pedir mi intervención DivinAI.\n\n' +
      'Nombre: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Empresa: ' + company +
      (whats ? '\nWhatsApp: ' + whats : '');
    window.open(waLink('default', msg), '_blank', 'noopener');

    if (formView) formView.hidden = true;
    if (successView) successView.hidden = false;
  });

  /* =============================================================
     HERO — rotador de Versículos del marketing
     ============================================================= */
  var verse = document.getElementById('verse');
  if (verse) {
    var verses = [
      { ref: 'Versículo del Pipeline 7:1', l1: 'Muchos leads fueron llamados.', l2: 'Pocos fueron contactados.' },
      { ref: 'Versículo del CAC 3:16', l1: 'Porque tanto amaste los anuncios,', l2: 'que olvidaste medir la conversión.' },
      { ref: 'Versículo del Lead Scoring 5:14', l1: 'No todos los leads tienen intención.', l2: 'Pero todos terminan en el mismo Excel.' },
      { ref: 'Versículo del CRM 4:12', l1: 'Y el equipo actualizaba el CRM.', l2: 'Solo cuando el director preguntaba.' },
      { ref: 'Versículo del Dashboard 2:8', l1: 'Bienaventurados los que atribuyen.', l2: 'Porque no desperdiciarán presupuesto.' }
    ];
    var refEl = verse.querySelector('.verse__ref span');
    var l1El = verse.querySelector('.v-l1');
    var l2El = verse.querySelector('.v-l2');
    var dotsWrap = document.getElementById('verseDots');
    var idx = 0, timer = null;
    var DURATION = 5200;

    // dots
    var dots = [];
    if (dotsWrap) {
      verses.forEach(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Versículo ' + (i + 1));
        if (i === 0) b.classList.add('active');
        b.addEventListener('click', function () { go(i, true); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    var paint = function (i) {
      if (refEl) refEl.textContent = verses[i].ref;
      if (l1El) l1El.textContent = verses[i].l1;
      if (l2El) l2El.textContent = verses[i].l2;
      dots.forEach(function (d, di) { d.classList.toggle('active', di === i); });
    };

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var go = function (i, manual) {
      idx = (i + verses.length) % verses.length;
      if (reduce) { paint(idx); }
      else {
        verse.classList.add('is-out');
        setTimeout(function () { paint(idx); verse.classList.remove('is-out'); }, 420);
      }
      if (manual) restart();
    };
    var next = function () { go(idx + 1); };
    var start = function () { if (!reduce) timer = setInterval(next, DURATION); };
    var restart = function () { clearInterval(timer); start(); };

    paint(0);
    start();
    // pausa al pasar el cursor
    verse.addEventListener('mouseenter', function () { clearInterval(timer); });
    verse.addEventListener('mouseleave', start);
  }

  /* =============================================================
     SACRAMENTOS — acordeón (uno abierto a la vez)
     ============================================================= */
  var sacrItems = document.querySelectorAll('.sacr');
  if (sacrItems.length) {
    var setPanel = function (item, open) {
      var panel = item.querySelector('.sacr__panel');
      var head = item.querySelector('.sacr__head');
      if (open) {
        item.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        item.classList.remove('open');
        head.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      }
    };

    var cards = document.querySelectorAll('.sacr-card');
    var setActiveCard = function (idx) {
      cards.forEach(function (c, i) { c.classList.toggle('active', i === idx); c.setAttribute('aria-selected', i === idx); });
    };

    var openOnly = function (idx) {
      sacrItems.forEach(function (other, j) { setPanel(other, j === idx); });
      setActiveCard(idx);
    };

    sacrItems.forEach(function (item, i) {
      var head = item.querySelector('.sacr__head');
      head.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        sacrItems.forEach(function (other) { if (other !== item) setPanel(other, false); });
        setPanel(item, !isOpen);
        setActiveCard(isOpen ? -1 : i);
      });
    });

    // cuadros: abren el módulo y llevan al acordeón
    cards.forEach(function (card, i) {
      card.addEventListener('click', function () {
        openOnly(i);
        var y = sacrItems[i].getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });

    // abre el primero por defecto
    setPanel(sacrItems[0], true);
    setActiveCard(0);

    // recalcula la altura del panel abierto al cambiar el tamaño de la ventana
    var resizeT;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () {
        var openItem = document.querySelector('.sacr.open');
        if (openItem) { var p = openItem.querySelector('.sacr__panel'); p.style.maxHeight = p.scrollHeight + 'px'; }
      }, 150);
    });
  }

  /* =============================================================
     SCROLL reveal
     ============================================================= */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* =============================================================
     SMOOTH scroll for same-page anchors
     ============================================================= */
  document.querySelectorAll('a[href^="#"]:not([data-modal])').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
