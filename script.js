(() => {
  'use strict';

  const VIDEO_URLS = {
    teamwork: 'https://www.pexels.com/download/video/7989444/',
    design: 'https://www.pexels.com/download/video/5081433/',
    audiovisual: 'https://www.pexels.com/download/video/19197555/'
  };

  const style = document.createElement('style');
  style.textContent = `
    .logo-no-bg{display:block;width:100%;height:auto;max-height:74px;object-fit:contain;object-position:left center;background:transparent}
    .footer-logo.logo-no-bg{width:min(360px,100%);max-height:86px}

    /* HERO — composição otimizada */
    .hero{min-height:min(980px,100svh);padding:132px 0 42px;align-items:center;isolation:isolate;background:#030303}
    .hero-video{position:absolute;inset:-2%;width:104%;height:104%;object-fit:cover;object-position:center;z-index:0;opacity:.34;filter:grayscale(.55) saturate(.58) contrast(1.12);transform:scale(1.025)}
    .hero-video-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.97) 0%,rgba(0,0,0,.88) 42%,rgba(0,0,0,.58) 72%,rgba(0,0,0,.72) 100%),linear-gradient(0deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.08) 52%,rgba(0,0,0,.68) 100%)}
    .hero::before{z-index:2;opacity:.58}
    .hero::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(circle at 74% 34%,rgba(255,0,0,.13),transparent 29%),linear-gradient(180deg,transparent 64%,#000 100%)}
    .hero .orb{z-index:3;width:310px;height:310px;right:4.5%;top:19%;opacity:.72;filter:saturate(.9);box-shadow:inset -50px -50px 90px rgba(0,0,0,.72),0 25px 85px rgba(255,0,0,.12)}
    .hero-content{z-index:4!important;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.65fr);column-gap:48px;align-items:end}
    .hero-content>.eyebrow,.hero-content>h1{grid-column:1}
    .hero .eyebrow{width:max-content;padding:10px 14px 10px 0;color:#d4d4d4}
    .hero .eyebrow::before{width:34px;height:2px;background:#ff0000}
    .hero h1{font-size:clamp(4.35rem,8.35vw,8.7rem);line-height:.87;letter-spacing:-.078em;max-width:1040px;margin:22px 0 32px;text-wrap:balance}
    .hero h1 .outline{-webkit-text-stroke:1.5px rgba(255,255,255,.94)}
    .hero h1 .accent{background:linear-gradient(90deg,#ff0000 0%,#ff3434 48%,#fff 100%);background-clip:text;-webkit-background-clip:text;color:transparent}
    .hero-bottom{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(300px,.62fr);gap:22px;align-items:stretch}
    .hero-message,.hero-actions{border:1px solid rgba(255,255,255,.16);background:linear-gradient(145deg,rgba(20,20,20,.76),rgba(4,4,4,.7));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 24px 70px rgba(0,0,0,.24)}
    .hero-message{position:relative;border-radius:24px;padding:27px 30px 28px 34px;overflow:hidden}
    .hero-message::before{content:"";position:absolute;inset:0 auto 0 0;width:4px;background:#ff0000}
    .hero-message-label{display:block;margin-bottom:11px;color:#ff4848;font-size:.66rem;font-weight:900;letter-spacing:.15em;text-transform:uppercase}
    .hero-message p{font-size:clamp(1rem,1.35vw,1.2rem);line-height:1.68;color:#e2e2e2;max-width:760px;margin:0}
    .hero-actions{border-radius:24px;padding:24px;display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:11px}
    .hero-action-label{margin:0 0 4px;color:#9c9c9c;font-size:.66rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
    .hero-actions .btn{width:100%;min-height:55px}
    .hero-actions .btn:not(.btn-primary){background:rgba(255,255,255,.04)}
    .hero-actions .btn-primary{box-shadow:0 12px 34px rgba(255,0,0,.2)}
    .hero-meta{grid-column:1/-1;margin-top:24px;padding-top:0;border-top:0;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .hero-meta .meta-card{min-height:94px;border:1px solid rgba(255,255,255,.12);border-radius:19px;background:rgba(8,8,8,.56);backdrop-filter:blur(12px);padding:18px 20px;align-items:center;transition:transform .25s ease,border-color .25s ease,background .25s ease}
    .hero-meta .meta-card:hover{transform:translateY(-3px);border-color:rgba(255,0,0,.55);background:rgba(18,18,18,.7)}
    .hero-meta .meta-card strong{min-width:66px;font-size:2rem;color:#fff}
    .hero-meta .meta-card span{color:#aaa;max-width:150px}
    .hero-signature{grid-column:2;grid-row:1 / span 2;align-self:center;justify-self:end;width:min(100%,340px);padding:18px 20px;border-left:1px solid rgba(255,255,255,.18);color:#aaa;font-size:.72rem;line-height:1.65;letter-spacing:.06em;text-transform:uppercase}
    .hero-signature strong{display:block;color:#fff;font-size:.95rem;letter-spacing:.02em;text-transform:none;margin-bottom:7px}

    /* Vídeos do portfólio */
    .video-art{background:#050505}
    .project-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:1;filter:grayscale(.12) saturate(.72) contrast(1.12)}
    .video-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.58)),linear-gradient(90deg,rgba(255,0,0,.28),transparent 55%)}
    .video-art .project-brand-logo{position:absolute;z-index:4;width:82%;height:auto;left:9%;top:50%;transform:translateY(-50%);object-fit:contain}
    .video-art .play{z-index:4}
    .video-source{position:absolute;left:18px;bottom:18px;z-index:5;padding:8px 11px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(0,0,0,.58);backdrop-filter:blur(8px);font-size:.62rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
    .video-loaded .film-strip{display:none}
    body.reduce-motion video{display:none!important}

    @media(max-width:1120px){
      .hero{min-height:auto;padding:126px 0 42px}
      .hero-content{grid-template-columns:1fr}
      .hero-content>.eyebrow,.hero-content>h1{grid-column:1}
      .hero-signature{display:none}
      .hero h1{max-width:930px}
      .hero-bottom{grid-template-columns:minmax(0,1fr) 310px}
      .hero .orb{right:-95px;top:145px;opacity:.46}
    }
    @media(max-width:760px){
      .hero{padding:108px 0 30px}
      .hero-video{opacity:.25;object-position:62% center}
      .hero-video-shade{background:linear-gradient(90deg,rgba(0,0,0,.96),rgba(0,0,0,.72)),linear-gradient(0deg,#000 0%,transparent 60%,rgba(0,0,0,.72) 100%)}
      .hero .orb{width:220px;height:220px;right:-135px;top:118px;opacity:.34}
      .hero h1{font-size:clamp(3.6rem,17.2vw,5.8rem);line-height:.88;margin:18px 0 25px}
      .hero-bottom{grid-template-columns:1fr;gap:12px}
      .hero-message{padding:23px 22px 24px 27px;border-radius:20px}
      .hero-actions{padding:18px;border-radius:20px}
      .hero-meta{grid-template-columns:1fr;gap:9px;margin-top:13px}
      .hero-meta .meta-card{min-height:76px;padding:14px 17px}
      .hero-meta .meta-card strong{font-size:1.7rem}
    }
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

  fetch('logo-transparent-base64.txt')
    .then((response) => {
      if (!response.ok) throw new Error('Não foi possível carregar a logo.');
      return response.text();
    })
    .then((base64) => {
      const logoSource = `data:image/webp;base64,${base64.trim()}`;
      document.querySelectorAll('.logo-render').forEach((placeholder) => {
        const img = document.createElement('img');
        img.src = logoSource;
        img.alt = placeholder.getAttribute('aria-label') || 'Middea — Acessibilidade, Marketing e Design';
        img.className = `${placeholder.className.replace('logo-render', '').trim()} logo-no-bg`;
        img.width = 1200;
        img.height = 305;
        placeholder.replaceWith(img);
      });
    })
    .catch(() => {
      document.querySelectorAll('.logo-render').forEach((placeholder) => {
        placeholder.textContent = 'MIDDEA';
        placeholder.style.display = 'grid';
        placeholder.style.placeItems = 'center';
        placeholder.style.fontWeight = '900';
      });
    });

  const heroCopy = document.querySelector('.hero-bottom p');
  if (heroCopy) {
    heroCopy.textContent = 'Na Middea, transformamos ideias em marcas, conteúdos e experiências que aproximam pessoas, fortalecem negócios e geram resultados.';

    if (!heroCopy.closest('.hero-message')) {
      const message = document.createElement('div');
      message.className = 'hero-message';
      const label = document.createElement('span');
      label.className = 'hero-message-label';
      label.textContent = 'Estratégia criativa com propósito';
      heroCopy.before(message);
      message.append(label, heroCopy);
    }
  }

  const heroActions = document.querySelector('.hero-actions');
  if (heroActions && !heroActions.querySelector('.hero-action-label')) {
    const actionLabel = document.createElement('p');
    actionLabel.className = 'hero-action-label';
    actionLabel.textContent = 'Escolha o próximo passo';
    heroActions.prepend(actionLabel);
  }

  const heroContent = document.querySelector('.hero-content');
  if (heroContent && !heroContent.querySelector('.hero-signature')) {
    const signature = document.createElement('aside');
    signature.className = 'hero-signature';
    signature.innerHTML = '<strong>Uma agência. Várias possibilidades.</strong>Branding, conteúdo, campanhas, web, audiovisual, fotografia e acessibilidade trabalhando na mesma direção.';
    heroContent.append(signature);
  }

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
    portfolioLead.textContent += ' Os vídeos foram selecionados para traduzir visualmente colaboração, criatividade e produção audiovisual.';
  }

  const legal = document.querySelector('.legal span:last-child');
  if (legal) legal.textContent = 'Portfólio de capacidades da agência. Vídeos de apoio: Pexels.';

  const siteVideos = [...document.querySelectorAll('video')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function updateVideoPlayback() {
    siteVideos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < innerHeight;
      if (reducedMotion.matches || document.body.classList.contains('reduce-motion') || !visible || document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    });
  }
  addEventListener('scroll', updateVideoPlayback, { passive: true });
  addEventListener('resize', updateVideoPlayback, { passive: true });
  document.addEventListener('visibilitychange', updateVideoPlayback);
  reducedMotion.addEventListener?.('change', updateVideoPlayback);
  requestAnimationFrame(updateVideoPlayback);

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
