(() => {
  'use strict';

  const ITEMS = {
    'Sistema de marca completo': {
      image: 'assets/portfolio/branding.svg',
      alt: 'Materiais de identidade visual, aplicações de marca, paleta e embalagem.'
    },
    'Conteúdo que organiza o feed': {
      image: 'assets/portfolio/social-media.svg',
      alt: 'Smartphones com peças de conteúdo e planejamento visual para redes sociais.'
    },
    'Landing page de conversão': {
      image: 'assets/portfolio/web-design.svg',
      alt: 'Monitor exibindo uma landing page moderna e responsiva.'
    },
    'Filme de marca e conteúdo vertical': {
      image: 'assets/portfolio/audiovisual.svg',
      alt: 'Câmera profissional e monitor de edição representando produção audiovisual.'
    },
    'Conteúdo com tradução em Libras': {
      image: 'assets/portfolio/libras.svg',
      alt: 'Estúdio de gravação com intérprete representando produção de conteúdo em Libras.'
    },
    'Campanha integrada 360°': {
      image: 'assets/portfolio/campaign.svg',
      alt: 'Peças digitais e físicas representando uma campanha publicitária integrada.'
    },
    'Editorial, papelaria e materiais físicos': {
      image: 'assets/portfolio/print.svg',
      alt: 'Materiais impressos, papelaria e embalagem organizados em uma composição editorial.'
    },
    'Fotografia e direção de arte': {
      image: 'assets/portfolio/photography.svg',
      alt: 'Estúdio fotográfico com câmera, iluminação e produto em pedestal.'
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    #portfolio .project-media-image{background:#111}
    #portfolio .project-image{width:100%;height:100%;object-fit:cover;object-position:center;display:block;transition:transform .75s cubic-bezier(.2,.8,.2,1),filter .35s}
    #portfolio .project:hover .project-image{transform:scale(1.035);filter:contrast(1.04) saturate(1.05)}
    .portfolio-image-fallback{position:absolute;inset:0;display:grid;place-items:center;padding:28px;text-align:center;background:linear-gradient(135deg,#f00,#4d0000);color:#fff;font-weight:900;letter-spacing:-.04em}
    .portfolio-image-fallback[hidden]{display:none}
    .modal-process-image{width:100%;height:100%;min-height:390px;object-fit:cover;object-position:center;display:block;background:#111}
    .modal-process-image[hidden]{display:none}
    .modal-image-badge{position:absolute;left:18px;top:18px;z-index:4;padding:9px 12px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(0,0,0,.64);backdrop-filter:blur(8px);color:#fff;font-size:.62rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
    @media(max-width:920px){.modal-process-image{min-height:300px}}
    @media(max-width:620px){.modal-process-image{min-height:245px}.modal-image-badge{font-size:.55rem;max-width:calc(100% - 36px)}}
  `;
  document.head.appendChild(style);

  const projects = [...document.querySelectorAll('#portfolio .project')];

  function imageFallback(image, title) {
    image.hidden = true;
    const fallback = image.nextElementSibling;
    if (!fallback) return;
    fallback.hidden = false;
    fallback.textContent = title;
  }

  projects.forEach(project => {
    const data = ITEMS[project.dataset.title];
    if (!data) return;
    project.dataset.image = data.image;
    delete project.dataset.video;

    const media = project.querySelector('.project-media');
    if (!media) return;
    media.className = 'project-media project-media-image';
    media.innerHTML = '';

    const image = document.createElement('img');
    image.className = 'project-image';
    image.src = data.image;
    image.alt = data.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    const fallback = document.createElement('div');
    fallback.className = 'portfolio-image-fallback';
    fallback.hidden = true;
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', data.alt);

    image.addEventListener('error', () => imageFallback(image, project.dataset.title));
    media.append(image, fallback);
  });

  const oldModal = document.getElementById('projectModal');
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'projectImageModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'projectImageModalTitle');
  modal.innerHTML = `
    <div class="modal-panel modal-panel-process">
      <button class="modal-close" type="button" aria-label="Fechar detalhes">×</button>
      <div class="modal-process-grid">
        <div class="modal-process-media">
          <img class="modal-process-image" alt="" decoding="async">
          <div class="modal-video-fallback" hidden>IMAGEM DO SERVIÇO</div>
          <span class="modal-image-badge">Imagem representativa do serviço</span>
        </div>
        <div class="modal-process-copy">
          <small class="index">Apresentação do serviço</small>
          <h3 id="projectImageModalTitle"></h3>
          <p class="modal-image-description"></p>
          <div class="modal-workflow-box">
            <h4>Etapas do trabalho</h4>
            <ol class="modal-workflow"></ol>
          </div>
        </div>
      </div>
      <div class="modal-cols">
        <div><h4>O que este projeto resolve</h4><p class="modal-image-solution"></p></div>
        <div><h4>Entregáveis possíveis</h4><ul class="modal-image-list"></ul></div>
      </div>
      <a href="#contato" class="btn btn-primary modal-image-cta">Solicitar projeto semelhante</a>
    </div>`;
  oldModal?.insertAdjacentElement('afterend', modal);
  oldModal?.remove();

  const close = modal.querySelector('.modal-close');
  const image = modal.querySelector('.modal-process-image');
  const fallback = modal.querySelector('.modal-video-fallback');
  const title = modal.querySelector('#projectImageModalTitle');
  const desc = modal.querySelector('.modal-image-description');
  const workflow = modal.querySelector('.modal-workflow');
  const solution = modal.querySelector('.modal-image-solution');
  const list = modal.querySelector('.modal-image-list');
  let lastFocus = null;

  function openProject(project) {
    const data = ITEMS[project.dataset.title];
    if (!data) return;
    lastFocus = document.activeElement;
    title.textContent = project.dataset.title;
    desc.textContent = project.dataset.desc || '';
    solution.textContent = project.dataset.solution || 'Organiza estratégia, produção, revisão e entrega em um processo claro.';
    workflow.innerHTML = (project.dataset.workflow || '').split('|').filter(Boolean).map(item => `<li>${item}</li>`).join('');
    list.innerHTML = (project.dataset.deliverables || '').split('|').filter(Boolean).map(item => `<li>${item}</li>`).join('');
    image.src = data.image;
    image.alt = data.alt;
    image.hidden = false;
    fallback.hidden = true;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    close.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    lastFocus?.focus();
  }

  image.addEventListener('error', () => {
    image.hidden = true;
    fallback.hidden = false;
    fallback.textContent = title.textContent || 'IMAGEM DO SERVIÇO';
  });

  projects.forEach(project => {
    project.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openProject(project);
    }, true);
    project.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openProject(project);
    }, true);
  });

  close.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  modal.querySelector('.modal-image-cta').addEventListener('click', closeModal);
  addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
})();
