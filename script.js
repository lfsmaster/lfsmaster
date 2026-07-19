(() => {
  'use strict';

  const VIDEO_URLS = {
    teamwork: 'https://www.pexels.com/download/video/7989444/',
    design: 'https://www.pexels.com/download/video/5081433/',
    audiovisual: 'https://www.pexels.com/download/video/19197555/'
  };

  const approvedHeroCopy = 'Na Middea, transformamos ideias em marcas, conteúdos e experiências que aproximam pessoas, fortalecem negócios e geram resultados.';

  const style = document.createElement('style');
  style.textContent = `
    .logo-no-bg{display:block;width:100%;height:auto;max-height:74px;object-fit:contain;object-position:left center;background:transparent}
    .footer-logo.logo-no-bg{width:min(360px,100%);max-height:86px}
    .hero{isolation:isolate}
    .hero-video{position:absolute;inset:-2%;width:104%;height:104%;object-fit:cover;object-position:center;z-index:0;opacity:.34;filter:grayscale(.55) saturate(.58) contrast(1.12);transform:scale(1.025)}
    .hero-video-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(0,0,0,.97),rgba(0,0,0,.86) 44%,rgba(0,0,0,.55) 76%,rgba(0,0,0,.74)),linear-gradient(0deg,rgba(0,0,0,.92),rgba(0,0,0,.08) 52%,rgba(0,0,0,.68))}
    .hero::before{z-index:2}.hero .orb{z-index:3}.hero-content{z-index:4!important}
    #portfolio{background:#080808}
    #portfolio .section-head{margin-bottom:34px}
    #portfolio .section-lead{max-width:720px}
    #portfolio .filters{display:flex;gap:8px;flex-wrap:wrap;width:max-content;max-width:100%;padding:7px;margin-bottom:26px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:#0e0e0e}
    #portfolio .filter{border:0;background:transparent;padding:10px 15px;color:#aaa;transition:background .25s,color .25s,transform .25s}
    #portfolio .filter.active,#portfolio .filter:hover{background:#ff0000;color:#fff;transform:none}
    #portfolio .projects{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:112px;gap:18px}
    #portfolio .project{position:relative;isolation:isolate;overflow:hidden;min-height:0!important;border-radius:26px;border:1px solid rgba(255,255,255,.16);background:#111;box-shadow:0 20px 65px rgba(0,0,0,.18);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .35s,box-shadow .35s}
    #portfolio .project:hover{transform:translateY(-6px);border-color:rgba(255,0,0,.72);box-shadow:0 28px 90px rgba(0,0,0,.42)}
    #portfolio .project[hidden]{display:none}
    #portfolio .project.portfolio-featured{grid-column:span 7;grid-row:span 5}
    #portfolio .project.portfolio-tall{grid-column:span 5;grid-row:span 5}
    #portfolio .project.portfolio-wide{grid-column:span 6;grid-row:span 4}
    #portfolio .project-art{position:absolute;inset:0;width:100%;height:100%!important;z-index:0;overflow:hidden;transition:transform .75s cubic-bezier(.2,.8,.2,1),filter .4s}
    #portfolio .project:hover .project-art{transform:scale(1.025)}
    #portfolio .project::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.08) 0%,rgba(0,0,0,.08) 34%,rgba(0,0,0,.9) 100%),linear-gradient(90deg,rgba(0,0,0,.38),transparent 66%)}
    #portfolio .project.portfolio-light::before{background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,.04) 38%,rgba(255,255,255,.94) 100%)}
    #portfolio .project-copy{position:absolute;inset:0;z-index:3;padding:24px;display:flex;flex-direction:column;justify-content:space-between;background:none!important}
    #portfolio .project-copy small{display:flex;align-items:center;justify-content:space-between;gap:12px;color:#ff4747;font-size:.62rem;letter-spacing:.13em;text-transform:uppercase;font-weight:900}
    #portfolio .project-copy small::after{content:attr(data-status);color:#ddd;border:1px solid rgba(255,255,255,.23);border-radius:999px;padding:8px 10px;background:rgba(0,0,0,.28);backdrop-filter:blur(8px)}
    #portfolio .project.portfolio-light .project-copy small::after{color:#111;border-color:rgba(0,0,0,.18);background:rgba(255,255,255,.62)}
    #portfolio .project-copy h3{margin:auto 0 10px;max-width:90%;font-size:clamp(1.75rem,3vw,3.45rem);line-height:.98;letter-spacing:-.052em;text-wrap:balance;color:#fff}
    #portfolio .project-copy p{max-width:620px;margin:0;color:#c8c8c8;font-size:.88rem;line-height:1.6}
    #portfolio .project.portfolio-light .project-copy h3{color:#111}
    #portfolio .project.portfolio-light .project-copy p{color:#333}
    #portfolio .portfolio-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;padding-right:64px}
    #portfolio .portfolio-tags span{font-size:.59rem;font-weight:900;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:7px 9px;background:rgba(0,0,0,.24);color:#fff}
    #portfolio .project.portfolio-light .portfolio-tags span{border-color:rgba(0,0,0,.17);background:rgba(255,255,255,.56);color:#111}
    #portfolio .project-arrow{right:22px;top:auto;bottom:22px;z-index:5;width:50px;height:50px;border-color:rgba(255,255,255,.3);background:rgba(0,0,0,.3)}
    #portfolio .project.portfolio-light .project-arrow{color:#111;border-color:rgba(0,0,0,.24);background:rgba(255,255,255,.65)}
    #portfolio .project:hover .project-arrow{transform:rotate(45deg);background:#ff0000;color:#fff;border-color:#ff0000}
    .portfolio-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;filter:grayscale(.16) saturate(.74) contrast(1.08);transition:transform .8s cubic-bezier(.2,.8,.2,1),filter .4s}
    #portfolio .project:hover .portfolio-video{transform:scale(1.04);filter:grayscale(.04) saturate(.92) contrast(1.08)}
    .portfolio-video-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,rgba(255,0,0,.2),transparent 58%),linear-gradient(180deg,transparent 42%,rgba(0,0,0,.64))}
    .portfolio-video-label{position:absolute;left:18px;top:18px;z-index:4;padding:8px 11px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(0,0,0,.58);backdrop-filter:blur(8px);font-size:.6rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#fff}
    .video-loaded .film-strip{display:none}
    .video-loaded.art-brand::before,.video-loaded.art-brand::after{opacity:.32}
    #portfolio .art-social{background:linear-gradient(145deg,#ff0000,#740000)}
    #portfolio .phone{width:43%;height:75%;top:10%;border-radius:30px}
    #portfolio .art-web{background:linear-gradient(145deg,#050505,#262626)}
    #portfolio .browser{inset:10% 7%;transform:perspective(900px) rotateX(3deg) rotateY(-5deg)}
    #portfolio .art-access{background:#fff}
    #portfolio .access-grid{inset:9%}
    #portfolio .art-campaign{background:linear-gradient(145deg,#ff0000,#550000)}
    #portfolio .poster{width:60%;left:20%;height:70%;top:14%}
    #portfolio .art-print{background:#dedede}
    #portfolio .art-photo{background:linear-gradient(160deg,#050505,#353535)}
    @media(max-width:1050px){#portfolio .project.portfolio-featured,#portfolio .project.portfolio-tall,#portfolio .project.portfolio-wide{grid-column:span 6}}
    @media(max-width:720px){
      #portfolio .filters{width:100%;overflow-x:auto;flex-wrap:nowrap;border-radius:20px;scrollbar-width:none}
      #portfolio .filters::-webkit-scrollbar{display:none}
      #portfolio .filter{flex:0 0 auto}
      #portfolio .projects{grid-template-columns:1fr;grid-auto-rows:auto;gap:14px}
      #portfolio .project,#portfolio .project.portfolio-featured,#portfolio .project.portfolio-tall,#portfolio .project.portfolio-wide{grid-column:1;grid-row:auto;min-height:500px!important}
      #portfolio .project.portfolio-featured{min-height:540px!important}
      #portfolio .project-copy{padding:20px}
      #portfolio .project-copy h3{max-width:100%;padding-right:38px;font-size:clamp(2rem,8.5vw,3.1rem)}
      #portfolio .portfolio-tags{display:none}
      #portfolio .project-arrow{right:17px;bottom:17px;width:46px;height:46px}
      .portfolio-video-label{left:14px;top:14px}
    }
    body.reduce-motion video{display:none!important}
    @media(prefers-reduced-motion:reduce){video{display:none!important}.reveal{opacity:1!important;transform:none!important}}
  `;
  document.head.appendChild(style);

  function createVideo(url, className, label) {
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
  if (heroCopy) heroCopy.textContent = approvedHeroCopy;

  const hero = document.querySelector('.hero');
  if (hero && !hero.querySelector('.hero-video')) {
    const video = createVideo(VIDEO_URLS.teamwork, 'hero-video', 'Equipe criativa colaborando em um projeto');
    video.setAttribute('aria-hidden', 'true');
    const shade = document.createElement('div');
    shade.className = 'hero-video-shade';
    shade.setAttribute('aria-hidden', 'true');
    hero.prepend(shade);
    hero.prepend(video);
  }

  const portfolioLead = document.querySelector('#portfolio .section-lead');
  if (portfolioLead) portfolioLead.textContent = 'Conceitos demonstrativos que traduzem as principais frentes da agência. Cada card reúne imagem ou vídeo, proposta, entregáveis e direção criativa na mesma área.';
  const portfolioTitle = document.querySelector('#portfolio .section-title');
  if (portfolioTitle) portfolioTitle.textContent = 'Projetos que mostram o que podemos criar juntos.';

  const projects = [...document.querySelectorAll('#portfolio .project')];
  const sizeClasses = ['portfolio-featured','portfolio-tall','portfolio-wide','portfolio-wide','portfolio-tall','portfolio-featured','portfolio-wide','portfolio-wide'];
  const statuses = ['Estratégia + Design','Conteúdo','UX/UI','Vídeo + Motion','Inclusão','Projeto 360°','Impresso','Direção de Arte'];
  const lightProjects = new Set([4, 6]);

  projects.forEach((project, index) => {
    project.classList.remove('large', 'medium', 'half');
    project.classList.add(sizeClasses[index] || 'portfolio-wide');
    if (lightProjects.has(index)) project.classList.add('portfolio-light');
    const copy = project.querySelector('.project-copy');
    const small = copy?.querySelector('small');
    if (small) small.dataset.status = statuses[index] || 'Projeto';
    if (copy && !copy.querySelector('.portfolio-tags')) {
      const tags = document.createElement('div');
      tags.className = 'portfolio-tags';
      const deliverables = (project.dataset.deliverables || '').split('|').slice(0, 3);
      tags.innerHTML = deliverables.map((item) => `<span>${item}</span>`).join('');
      copy.appendChild(tags);
    }
  });

  const brandingArt = projects[0]?.querySelector('.project-art');
  if (brandingArt && !brandingArt.querySelector('video')) {
    const video = createVideo(VIDEO_URLS.design, 'portfolio-video', 'Designer trabalhando em uma composição visual');
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-video-overlay';
    const label = document.createElement('span');
    label.className = 'portfolio-video-label';
    label.textContent = 'Design em processo';
    brandingArt.prepend(overlay);
    brandingArt.prepend(video);
    brandingArt.append(label);
  }

  const filmArt = projects[3]?.querySelector('.project-art');
  if (filmArt && !filmArt.querySelector('video')) {
    const video = createVideo(VIDEO_URLS.audiovisual, 'portfolio-video', 'Videomaker operando uma câmera profissional');
    const overlay = document.createElement('div');
    overlay.className = 'portfolio-video-overlay';
    const label = document.createElement('span');
    label.className = 'portfolio-video-label';
    label.textContent = 'Captação audiovisual';
    filmArt.prepend(overlay);
    filmArt.prepend(video);
    filmArt.append(label);
  }

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
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  }));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const filters = [...document.querySelectorAll('#portfolio .filter')];
  filters.forEach((button) => button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
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
  const closeButton = document.getElementById('modalClose');
  let lastFocus = null;

  function openProject(project) {
    lastFocus = document.activeElement;
    modalTitle.textContent = project.dataset.title;
    modalDesc.textContent = project.dataset.desc;
    modalList.innerHTML = project.dataset.deliverables.split('|').map((item) => `<li>${item}</li>`).join('');
    modalVisual.textContent = project.dataset.title.split(' ').slice(0, 2).join(' ').toUpperCase();
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    closeButton?.focus();
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
  closeButton?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });
  document.getElementById('modalCta')?.addEventListener('click', closeModal);

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll('video')];
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const pause = reducedMotion.matches || document.body.classList.contains('reduce-motion') || !entry.isIntersecting || document.hidden;
      if (pause) video.pause(); else video.play().catch(() => {});
    });
  }, { rootMargin: '180px', threshold: .05 });
  videos.forEach((video) => videoObserver.observe(video));
  document.addEventListener('visibilitychange', () => {
    videos.forEach((video) => document.hidden ? video.pause() : video.play().catch(() => {}));
  });

  let fontSize = 16;
  document.getElementById('fontBtn')?.addEventListener('click', () => {
    fontSize = fontSize >= 19 ? 16 : fontSize + 1;
    document.documentElement.style.fontSize = `${fontSize}px`;
  });
  document.getElementById('motionBtn')?.addEventListener('click', () => {
    const reduced = document.body.classList.toggle('reduce-motion');
    videos.forEach((video) => reduced ? video.pause() : video.play().catch(() => {}));
  });

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