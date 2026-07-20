(() => {
  'use strict';

  const VIDEO_MAP = {
    'branding-process.mp4': 'https://dnznrvs05pmza.cloudfront.net/592c58f4-4b9a-4b24-a337-3e1adb8aa74d.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGEyOWQzZjRlNjI0ZGYwYSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYwMzEyNH0.SCv8NrDfTrHRvANtsdgF9v0uOuqTLX7BK4jNQx8Waq4',
    'social-media-process.mp4': 'https://dnznrvs05pmza.cloudfront.net/adaa9f3f-e238-4eef-99bd-218d75a9d66d.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2QxZTI3Y2Y3ODUwZGFlOSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDY3MTk1MX0.x8HR3hhafmYiqeZFoX7FO-zIiuVelE8mgE0uLHgME3I',
    'web-design-process.mp4': 'https://dnznrvs05pmza.cloudfront.net/1dda2a05-6dcc-439f-8396-a230950d2a0b.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOTVhYzBhZDgzOTk1NDQ0NyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYyODk1Mn0.8K2CVjIgaVbUAzcRFqNq80sEuEbOcDNXpFCxdkMnOW4',
    'audiovisual-process.mp4': 'https://dnznrvs05pmza.cloudfront.net/a356dd48-aedd-4d96-a5b5-918f027849dc.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzIxZWI2YjgwMGQ5N2MyNSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDY2OTg4MH0.53NiDYJ8r7YmAHGBICyt38CC8IleXAZrEagudVFkRuY',
    'libras-process.mp4': 'https://dnznrvs05pmza.cloudfront.net/a4e3f2a1-4ef0-4355-b026-92b1c27d2084.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2EzOTk0ZTJhYzk4ZjhmMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYwODA5OH0.IB7Ss8WaYzJYEd-I_i28Ru9xiZZowTjGyx6xjPw7k-Y',
    'campaign-process.mp4': 'https://dnznrvs05pmza.cloudfront.net/4036e3aa-0ef2-4480-9d5c-393f11af338e.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmNhZjI2NWM5NGIxODBiYyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYyNjY1Mn0.UpLhiBOuYpHfU_LYIeEPkSJxIWrV9BShWJ4ghck6BHQ'
  };

  const approvedHeroCopy = 'Na Middea, transformamos ideias em marcas, conteúdos e experiências que aproximam pessoas, fortalecem negócios e geram resultados.';

  function replacementFor(value) {
    if (!value) return null;
    const key = Object.keys(VIDEO_MAP).find(name => value.includes(name));
    return key ? VIDEO_MAP[key] : null;
  }

  function patchMedia(root = document) {
    root.querySelectorAll?.('[data-video]').forEach(element => {
      const replacement = replacementFor(element.dataset.video);
      if (replacement) element.dataset.video = replacement;
    });

    root.querySelectorAll?.('video source').forEach(source => {
      const replacement = replacementFor(source.getAttribute('src'));
      if (!replacement || source.src === replacement) return;
      source.src = replacement;
      const video = source.parentElement;
      video?.load();
      if (!document.body.classList.contains('reduce-motion')) video?.play().catch(() => {});
    });

    root.querySelectorAll?.('video[src]').forEach(video => {
      const replacement = replacementFor(video.getAttribute('src'));
      if (!replacement || video.src === replacement) return;
      video.src = replacement;
      video.load();
      if (!document.body.classList.contains('reduce-motion')) video.play().catch(() => {});
    });
  }

  function renderLogos() {
    const placeholders = [...document.querySelectorAll('.logo-render')];
    if (!placeholders.length) return;

    fetch('logo-transparent-base64.txt', { cache: 'force-cache' })
      .then(response => {
        if (!response.ok) throw new Error('Logo não encontrada');
        return response.text();
      })
      .then(base64 => {
        const source = `data:image/webp;base64,${base64.trim()}`;
        placeholders.forEach(placeholder => {
          const image = document.createElement('img');
          image.src = source;
          image.alt = placeholder.getAttribute('aria-label') || 'Middea — Acessibilidade, Marketing e Design';
          image.className = `${placeholder.className.replace('logo-render', '').trim()} logo-no-bg`;
          image.width = 1200;
          image.height = 305;
          image.addEventListener('error', () => {
            image.replaceWith(createLogoFallback(image.alt));
          });
          placeholder.replaceWith(image);
        });
      })
      .catch(() => placeholders.forEach(placeholder => placeholder.replaceWith(createLogoFallback(placeholder.getAttribute('aria-label')))));
  }

  function createLogoFallback(label = 'Middea') {
    const fallback = document.createElement('span');
    fallback.className = 'asset-fallback-logo';
    fallback.textContent = 'MIDDEA';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', label || 'Middea');
    return fallback;
  }

  function initializeNavigation() {
    const header = document.getElementById('header');
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mainMenu');

    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
    updateHeader();
    addEventListener('scroll', updateHeader, { passive: true });

    toggle?.addEventListener('click', () => {
      const open = menu?.classList.toggle('open') || false;
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle?.setAttribute('aria-expanded', 'false');
      if (toggle) toggle.textContent = '☰';
    }));
  }

  function initializeReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .1 });
    elements.forEach(element => observer.observe(element));
  }

  function initializeFilters() {
    const filters = [...document.querySelectorAll('.filter')];
    const projects = [...document.querySelectorAll('.project')];
    filters.forEach(button => button.addEventListener('click', () => {
      filters.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const target = button.dataset.filter;
      projects.forEach(project => {
        const categories = (project.dataset.category || '').split(' ');
        project.hidden = target !== 'all' && !categories.includes(target);
      });
    }));
  }

  function initializeControls() {
    let fontSize = 16;
    document.getElementById('fontBtn')?.addEventListener('click', () => {
      fontSize = fontSize >= 19 ? 16 : fontSize + 1;
      document.documentElement.style.fontSize = `${fontSize}px`;
    });

    document.getElementById('motionBtn')?.addEventListener('click', () => {
      const reduced = document.body.classList.toggle('reduce-motion');
      document.querySelectorAll('video').forEach(video => reduced ? video.pause() : video.play().catch(() => {}));
    });
  }

  function initializeForm() {
    const phone = document.getElementById('phone');
    phone?.addEventListener('input', () => {
      let value = phone.value.replace(/\D/g, '').slice(0, 11);
      if (value.length > 6) value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      else if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      else if (value.length) value = `(${value}`;
      phone.value = value;
    });

    const form = document.getElementById('quoteForm');
    const status = document.getElementById('formStatus');
    let sending = false;
    form?.addEventListener('submit', event => {
      event.preventDefault();
      if (sending) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = 'Revise os campos obrigatórios.';
        return;
      }
      sending = true;
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Preparando mensagem...';
      }
      const data = new FormData(form);
      const text = `Olá! Meu nome é ${data.get('name')}. Meu WhatsApp é ${data.get('phone')}. Tenho interesse em ${data.get('service')}. Sobre o projeto: ${data.get('message')}`;
      if (status) status.textContent = 'Abrindo o WhatsApp...';
      window.setTimeout(() => {
        const url = `https://wa.me/556993590429?text=${encodeURIComponent(text)}`;
        const opened = window.open(url, '_blank', 'noopener');
        if (!opened) location.href = url;
        sending = false;
        if (button) {
          button.disabled = false;
          button.textContent = 'Enviar pelo WhatsApp';
        }
      }, 350);
    });
  }

  function loadPortfolioCorrection() {
    const alreadyIncluded = [...document.scripts].some(script => /portfolio-restore-v5\.js(?:\?|$)/.test(script.src));
    if (!alreadyIncluded) {
      const script = document.createElement('script');
      script.src = 'portfolio-restore-v5.js';
      script.defer = true;
      script.addEventListener('load', () => window.setTimeout(() => patchMedia(), 50));
      document.head.appendChild(script);
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      patchMedia();
      attempts += 1;
      if (attempts >= 40) window.clearInterval(timer);
    }, 250);

    new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType === 1) patchMedia(node);
      }));
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  function initialize() {
    const heroCopy = document.querySelector('.hero-message p, .hero-bottom p');
    if (heroCopy) heroCopy.textContent = approvedHeroCopy;
    renderLogos();
    initializeNavigation();
    initializeReveal();
    initializeFilters();
    initializeControls();
    initializeForm();
    loadPortfolioCorrection();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();