(() => {
  'use strict';

  const VIDEO_URLS = {
    teamwork: 'https://www.pexels.com/download/video/7989444/',
    design: 'https://www.pexels.com/download/video/5081433/',
    audiovisual: 'https://www.pexels.com/download/video/19197555/'
  };

  const style = document.createElement('style');
  style.textContent = `
    .logo-no-bg{display:block;width:100%;height:auto;max-height:74px;object-fit:contain;object-position:left center;mix-blend-mode:screen;filter:contrast(1.04);background:transparent}
    .footer-logo.logo-no-bg{width:min(360px,100%);max-height:86px}
    .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:0;opacity:.5;filter:grayscale(.15) saturate(.7) contrast(1.14)}
    .hero-video-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.94) 0%,rgba(0,0,0,.76) 48%,rgba(0,0,0,.36) 100%),linear-gradient(0deg,rgba(0,0,0,.76),rgba(0,0,0,.05) 56%,rgba(0,0,0,.52))}
    .hero::before{z-index:2}.hero .orb{z-index:3}.hero-content{z-index:4!important}
    .video-art{background:#050505}
    .project-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:1;filter:grayscale(.12) saturate(.72) contrast(1.12)}
    .video-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.58)),linear-gradient(90deg,rgba(255,0,0,.28),transparent 55%)}
    .video-art .project-brand-logo{position:absolute;z-index:4;width:82%;height:auto;left:9%;top:50%;transform:translateY(-50%);object-fit:contain}
    .video-art .play{z-index:4}
    .video-source{position:absolute;left:18px;bottom:18px;z-index:5;padding:8px 11px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(0,0,0,.58);backdrop-filter:blur(8px);font-size:.62rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
    .video-loaded .film-strip{display:none}
    body.reduce-motion video{display:none!important}
    @media(prefers-reduced-motion:reduce){video{display:none!important}.hero{background:#050505}.video-art{background:#111}}
  `;
  document.head.appendChild(style);

  function makeVideo(url, className, label) {
    const video = document.createElement('video');
    video.className = className;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', label);
    const source = document.createElement('source');
    source.src = url;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.addEventListener('canplay', () => video.parentElement?.classList.add('video-loaded'), { once: true });
    video.addEventListener('error', () => {
      video.hidden = true;
      video.parentElement?.classList.remove('video-loaded');
    });
    return video;
  }

  document.querySelectorAll('.logo-render').forEach((placeholder) => {
    const img = document.createElement('img');
    img.src = 'logo.webp';
    img.alt = placeholder.getAttribute('aria-label') || 'Middea — Acessibilidade, Marketing e Design';
    img.className = `${placeholder.className.replace('logo-render', '').trim()} logo-no-bg`;
    img.width = 700;
    img.height = 60;
    placeholder.replaceWith(img);
  });

  const hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.hero-video')) {
    const video = makeVideo(VIDEO_URLS.teamwork, 'hero-video', 'Equipe criativa colaborando em um projeto');
    video.setAttribute('aria-hidden', 'true');
    const shade = document.createElement('div');
    shade.className = 'hero-video-shade';
    shade.setAttribute('aria-hidden', 'true');
    hero.prepend(shade);
    hero.prepend(video);
  }

  const brandingArt = document.querySelector('.art-brand');
  if (brandingArt && !brandingArt.querySelector('video')) {
    brandingArt.classList.add('video-art');
    const video = makeVideo(VIDEO_URLS.design, 'project-video', 'Designer trabalhando em uma composição visual');
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    const label = document.createElement('span');
    label.className = 'video-source';
    label.textContent = 'Design em processo';
    brandingArt.prepend(overlay);
    brandingArt.prepend(video);
    brandingArt.append(label);
  }

  const filmArt = document.querySelector('.art-film');
  if (filmArt && !filmArt.querySelector('video')) {
    filmArt.classList.add('video-art');
    const video = makeVideo(VIDEO_URLS.audiovisual, 'project-video', 'Videomaker operando uma câmera profissional');
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    const label = document.createElement('span');
    label.className = 'video-source';
    label.textContent = 'Captação audiovisual';
    filmArt.prepend(overlay);
    filmArt.prepend(video);
    filmArt.append(label);
  }

  const portfolioLead = document.querySelector('#portfolio .section-lead');
  if (portfolioLead && !portfolioLead.textContent.includes('vídeos foram selecionados')) {
    portfolioLead.textContent += ' Os vídeos foram selecionados para representar colaboração, design e produção audiovisual.';
  }

  const legal = document.querySelector('.legal span:last-child');
  if (legal) legal.textContent = 'Portfólio de capacidades da agência. Vídeos de apoio: Pexels.';

  const header = document.getElementById('header');
  addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 24), { passive: true });

  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mainMenu');
  menuToggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const filters = [...document.querySelectorAll('.filter')];
  const projects = [...document.querySelectorAll('.project')];
  filters.forEach((button) => button.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    const target = button.dataset.filter;
    projects.forEach((project) => {
      const categories = project.dataset.category.split(' ');
      project.hidden = target !== 'all' && !categories.includes(target);
    });
  }));

  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalList = document.getElementById('modalList');
  const modalVisual = document.getElementById('modalVisual');
  const close = document.getElementById('modalClose');
  let lastFocus = null;

  function openProject(project) {
    lastFocus = document.activeElement;
    modalTitle.textContent = project.dataset.title;
    modalDesc.textContent = project.dataset.desc;
    modalList.innerHTML = project.dataset.deliverables.split('|').map((item) => `<li>${item}</li>`).join('');
    modalVisual.textContent = project.dataset.title.split(' ').slice(0, 2).join(' ').toUpperCase();
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    close.focus();
  }
  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    lastFocus?.focus();
  }
  projects.forEach((project) => {
    project.addEventListener('click', () => openProject(project));
    project.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(project);
      }
    });
  });
  close?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });
  document.getElementById('modalCta')?.addEventListener('click', closeModal);

  let font = 16;
  document.getElementById('fontBtn')?.addEventListener('click', () => {
    font = font >= 19 ? 16 : font + 1;
    document.documentElement.style.fontSize = `${font}px`;
  });
  document.getElementById('motionBtn')?.addEventListener('click', () => {
    const reduced = document.body.classList.toggle('reduce-motion');
    document.querySelectorAll('video').forEach((video) => {
      if (reduced) video.pause();
      else video.play().catch(() => {});
    });
  });

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting && !document.body.classList.contains('reduce-motion')) video.play().catch(() => {});
      else video.pause();
    });
  }, { rootMargin: '160px', threshold: .05 });
  document.querySelectorAll('.project-video').forEach((video) => videoObserver.observe(video));

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video').forEach((video) => video.pause());
  }

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
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (sending) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Revise os campos obrigatórios.';
      return;
    }
    sending = true;
    const button = form.querySelector('button[type=submit]');
    button.disabled = true;
    button.textContent = 'Preparando mensagem...';
    const data = new FormData(form);
    const text = `Olá! Meu nome é ${data.get('name')}. Meu WhatsApp é ${data.get('phone')}. Tenho interesse em ${data.get('service')}. Sobre o projeto: ${data.get('message')}`;
    status.textContent = 'Abrindo o WhatsApp...';
    setTimeout(() => {
      const url = `https://wa.me/556993590429?text=${encodeURIComponent(text)}`;
      const opened = window.open(url, '_blank', 'noopener');
      if (!opened) location.href = url;
      sending = false;
      button.disabled = false;
      button.textContent = 'Enviar pelo WhatsApp';
    }, 350);
  });
})();