(() => {
  'use strict';

  const projectData = {
    'Sistema de marca completo': {
      video: 'https://www.pexels.com/download/video/5081433/',
      workflow: ['Briefing e diagnóstico', 'Pesquisa e referências', 'Criação do sistema visual', 'Aplicações e manual'],
      solution: 'Organiza posicionamento, identidade e aplicações para que a marca seja reconhecida com consistência.'
    },
    'Conteúdo que organiza o feed': {
      video: 'https://www.pexels.com/download/video/7989444/',
      workflow: ['Definição dos pilares', 'Planejamento do calendário', 'Roteiros e direção visual', 'Design, revisão e publicação'],
      solution: 'Transforma ideias dispersas em uma comunicação planejada, coerente e pronta para redes sociais.'
    },
    'Landing page de conversão': {
      video: 'https://www.pexels.com/download/video/36628014/',
      workflow: ['Mapeamento da jornada', 'Wireframe e conteúdo', 'Design responsivo', 'Desenvolvimento, testes e publicação'],
      solution: 'Estrutura a informação para explicar a oferta, conduzir o visitante e facilitar o contato.'
    },
    'Filme de marca e conteúdo vertical': {
      video: 'https://www.pexels.com/download/video/19197555/',
      workflow: ['Conceito e briefing', 'Roteiro e pré-produção', 'Captação', 'Edição, cor e versões finais'],
      solution: 'Converte a mensagem da marca em uma narrativa audiovisual adequada a campanhas e redes sociais.'
    },
    'Experiência digital acessível': {
      title: 'Conteúdo com tradução em Libras',
      desc: 'Produção audiovisual com tradução e interpretação em Libras, do roteiro à janela final sincronizada.',
      video: 'https://www.pexels.com/download/video/10373885/',
      workflow: ['Análise e adaptação do roteiro', 'Tradução para Libras', 'Gravação com intérprete', 'Edição da janela de Libras e revisão'],
      solution: 'Leva o conteúdo ao público surdo por meio de tradução, interpretação e produção audiovisual em Libras.',
      deliverables: ['Adaptação do roteiro', 'Tradução para Libras', 'Intérprete de Libras', 'Gravação em estúdio', 'Janela de Libras', 'Sincronização e revisão'],
      libras: true
    },
    'Campanha integrada 360°': {
      video: 'https://www.pexels.com/download/video/7989444/',
      workflow: ['Conceito da campanha', 'Key visual e mensagem', 'Desdobramentos por canal', 'Lançamento e acompanhamento'],
      solution: 'Unifica diferentes peças e canais em torno de uma ideia central, evitando comunicação fragmentada.'
    },
    'Editorial, papelaria e materiais físicos': {
      video: 'https://www.pexels.com/download/video/5081433/',
      workflow: ['Planejamento do material', 'Projeto gráfico', 'Diagramação e arte-final', 'Revisão e preparação para impressão'],
      solution: 'Transforma conteúdo e identidade em materiais físicos claros, organizados e prontos para produção.'
    },
    'Fotografia e direção de arte': {
      video: 'https://www.pexels.com/download/video/35313988/',
      workflow: ['Conceito e moodboard', 'Preparação do cenário e luz', 'Direção e captação', 'Seleção, retoque e color grading'],
      solution: 'Cria imagens profissionais alinhadas à campanha, ao produto e à identidade visual da marca.'
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .modal-panel-process{width:min(1120px,100%);padding:30px}
    .modal-process-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:28px;align-items:stretch;margin-bottom:26px}
    .modal-process-media{position:relative;min-height:390px;border:1px solid var(--line);border-radius:26px;overflow:hidden;background:#080808}
    .modal-process-video{width:100%;height:100%;min-height:390px;object-fit:cover;background:#080808}
    .modal-video-fallback{position:absolute;inset:0;display:grid;place-items:center;padding:24px;background:linear-gradient(135deg,#ff0000,#f3dede);color:#111;font-size:clamp(2.6rem,7vw,6.2rem);font-weight:1000;letter-spacing:-.08em}
    .modal-process-badge{position:absolute;left:18px;top:18px;z-index:4;padding:9px 12px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(0,0,0,.64);backdrop-filter:blur(8px);color:#fff;font-size:.62rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
    .modal-video-note{position:absolute;left:18px;right:18px;bottom:16px;z-index:4;margin:0!important;padding:11px 13px;border:1px solid rgba(255,255,255,.18);border-radius:14px;background:rgba(0,0,0,.7);backdrop-filter:blur(9px);color:#ddd!important;font-size:.72rem;line-height:1.5!important}
    .modal-process-copy{display:flex;flex-direction:column;justify-content:center;padding:8px 4px}
    .modal-process-copy h3{font-size:clamp(2.6rem,5vw,4.8rem);line-height:.95;margin:.25rem 0 1rem}
    .modal-process-copy>p{margin:0 0 18px}
    .modal-workflow-box{padding:18px 20px;border:1px solid var(--line);border-radius:22px;background:#0c0c0c}
    .modal-workflow-box h4{margin:0 0 12px;color:#ff4545;font-size:.7rem;letter-spacing:.13em;text-transform:uppercase}
    .modal-workflow{counter-reset:workflow;display:grid;gap:10px;margin:0;padding:0;list-style:none}
    .modal-workflow li{counter-increment:workflow;display:grid;grid-template-columns:31px 1fr;gap:10px;align-items:center;color:#ddd;font-size:.86rem;line-height:1.5}
    .modal-workflow li::before{content:counter(workflow,decimal-leading-zero);display:grid;place-items:center;width:31px;height:31px;border:1px solid rgba(255,255,255,.16);border-radius:50%;color:#ff4b4b;font-size:.61rem;font-weight:900}
    .fallback-libras{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(145deg,#ff0000,#4c0000);color:#fff;text-align:center}
    .fallback-libras span{font-size:.68rem;font-weight:900;letter-spacing:.18em}.fallback-libras strong{margin-top:10px;font-size:clamp(2rem,4vw,4rem);line-height:.92;letter-spacing:-.06em}
    .project-media-video .fallback-libras{z-index:0}.project-media-video video{position:relative;z-index:1}
    @media(max-width:920px){.modal-process-grid{grid-template-columns:1fr}.modal-process-media,.modal-process-video{min-height:300px}}
    @media(max-width:620px){.modal-panel-process{padding:20px 15px}.modal-process-media,.modal-process-video{min-height:245px}.modal-process-copy h3{font-size:2.45rem}.modal-video-note{position:relative;left:auto;right:auto;bottom:auto;margin:0!important;border-radius:0;border-inline:0;border-bottom:0}.modal-process-badge{font-size:.55rem;max-width:calc(100% - 36px)}}
    body.reduce-motion .modal-process-video{display:none!important}
  `;
  document.head.appendChild(style);

  const capability = [...document.querySelectorAll('.cap')].find(card => card.querySelector('h3')?.textContent.includes('Acessibilidade'));
  if (capability) {
    capability.querySelector('h3').textContent = 'Acessibilidade em Libras';
    capability.querySelector('p').textContent = 'Tradução e adaptação de conteúdos para Libras, gravação com intérprete, janela de Libras, sincronização e revisão final.';
    capability.querySelector('.cap-tags').innerHTML = '<span class="chip">Libras</span><span class="chip">Intérprete</span><span class="chip">Janela de Libras</span>';
  }

  const filter = document.querySelector('.filter[data-filter="acessibilidade"]');
  if (filter) filter.textContent = 'Libras';

  const deliverable = [...document.querySelectorAll('.deliverable')].find(card => card.querySelector('b')?.textContent === 'Acessibilidade');
  if (deliverable) deliverable.innerHTML = '<b>Libras</b><span>Tradução, adaptação do roteiro, intérprete, gravação, janela de Libras, sincronização e revisão.</span>';

  const serviceOption = [...document.querySelectorAll('#service option')].find(option => option.textContent === 'Acessibilidade Digital');
  if (serviceOption) serviceOption.textContent = 'Tradução e Produção em Libras';

  const projects = [...document.querySelectorAll('.project')];
  projects.forEach(project => {
    const originalTitle = project.dataset.title;
    const data = projectData[originalTitle];
    if (!data) return;
    project.dataset.video = data.video;
    project.dataset.workflow = data.workflow.join('|');
    project.dataset.solution = data.solution;
    if (data.title) {
      project.dataset.title = data.title;
      project.dataset.desc = data.desc;
      project.dataset.deliverables = data.deliverables.join('|');
      const kicker = project.querySelector('.project-kicker');
      const status = project.querySelector('.project-status');
      const heading = project.querySelector('.project-bottom h3');
      const desc = project.querySelector('.project-bottom p');
      const chips = project.querySelector('.project-chips');
      if (kicker) kicker.textContent = 'Libras';
      if (status) status.textContent = 'Acessibilidade comunicacional';
      if (heading) heading.textContent = data.title;
      if (desc) desc.textContent = 'Do roteiro à gravação e à janela de Libras sincronizada no vídeo final.';
      if (chips) chips.innerHTML = '<span>Tradução</span><span>Intérprete</span><span>Janela de Libras</span>';
      const media = project.querySelector('.project-media');
      if (media) {
        media.className = 'project-media project-media-video';
        media.innerHTML = '<video class="project-video libras-card-video" autoplay muted loop playsinline preload="metadata"><source src="https://www.pexels.com/download/video/10373885/" type="video/mp4"></video><div class="media-fallback fallback-libras" aria-hidden="true"><span>LIBRAS</span><strong>COMUNICAÇÃO<br>QUE INCLUI</strong></div>';
      }
      project.querySelector('.project-gradient')?.classList.remove('project-gradient-light');
      project.querySelector('.project-content')?.classList.remove('project-content-dark');
      project.querySelector('.project-arrow')?.classList.remove('project-arrow-dark');
    }
  });

  const oldModal = document.getElementById('projectModal');
  if (!oldModal) return;
  const newModal = document.createElement('div');
  newModal.className = 'modal';
  newModal.id = 'projectModalLibras';
  newModal.setAttribute('role', 'dialog');
  newModal.setAttribute('aria-modal', 'true');
  newModal.setAttribute('aria-labelledby', 'modalTitleLibras');
  newModal.innerHTML = `<div class="modal-panel modal-panel-process"><button class="modal-close" id="modalCloseLibras" aria-label="Fechar detalhes">×</button><div class="modal-process-grid"><div class="modal-process-media"><video id="modalVideoLibras" class="modal-process-video" muted loop playsinline controls preload="metadata"><source id="modalVideoSourceLibras" src="" type="video/mp4"></video><div class="modal-video-fallback" id="modalVisualLibras">PROCESSO</div><span class="modal-process-badge">Demonstração de como o trabalho é realizado</span><p class="modal-video-note" id="modalVideoNoteLibras"></p></div><div class="modal-process-copy"><small class="index">Processo demonstrativo</small><h3 id="modalTitleLibras"></h3><p id="modalDescLibras"></p><div class="modal-workflow-box"><h4>Etapas apresentadas</h4><ol id="modalWorkflowLibras" class="modal-workflow"></ol></div></div></div><div class="modal-cols"><div><h4>O que este projeto resolve</h4><p id="modalSolutionLibras"></p></div><div><h4>Entregáveis possíveis</h4><ul id="modalListLibras"></ul></div></div><a href="#contato" class="btn btn-primary" id="modalCtaLibras">Solicitar projeto semelhante</a></div>`;
  oldModal.insertAdjacentElement('afterend', newModal);

  const title = newModal.querySelector('#modalTitleLibras');
  const desc = newModal.querySelector('#modalDescLibras');
  const list = newModal.querySelector('#modalListLibras');
  const solution = newModal.querySelector('#modalSolutionLibras');
  const workflow = newModal.querySelector('#modalWorkflowLibras');
  const video = newModal.querySelector('#modalVideoLibras');
  const source = newModal.querySelector('#modalVideoSourceLibras');
  const fallback = newModal.querySelector('#modalVisualLibras');
  const note = newModal.querySelector('#modalVideoNoteLibras');
  const close = newModal.querySelector('#modalCloseLibras');
  let lastFocus = null;

  function openModal(project) {
    const data = projectData[project.dataset.title] || Object.values(projectData).find(item => item.title === project.dataset.title) || {};
    lastFocus = document.activeElement;
    title.textContent = project.dataset.title;
    desc.textContent = project.dataset.desc;
    list.innerHTML = project.dataset.deliverables.split('|').map(item => `<li>${item}</li>`).join('');
    solution.textContent = project.dataset.solution || data.solution || 'Organiza estratégia, produção, revisão e entrega em um processo claro.';
    workflow.innerHTML = (project.dataset.workflow || '').split('|').filter(Boolean).map(item => `<li>${item}</li>`).join('');
    const videoUrl = project.dataset.video || '';
    source.src = videoUrl;
    video.load();
    video.hidden = !videoUrl;
    fallback.hidden = Boolean(videoUrl);
    if (videoUrl && !document.body.classList.contains('reduce-motion')) video.play().catch(() => {});
    const isLibras = project.dataset.category === 'acessibilidade';
    fallback.textContent = isLibras ? 'LIBRAS' : 'PROCESSO';
    note.textContent = isLibras
      ? 'Vídeo visual ilustrativo de gravação em língua de sinais. Os projetos contratados pela Middea são adaptados, traduzidos e produzidos especificamente em Libras.'
      : 'Vídeo demonstrativo do ambiente e das etapas de produção deste serviço.';
    newModal.classList.add('open');
    document.body.classList.add('modal-open');
    close.focus();
  }

  function closeModal() {
    newModal.classList.remove('open');
    document.body.classList.remove('modal-open');
    video.pause();
    lastFocus?.focus();
  }

  projects.forEach(project => {
    project.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openModal(project);
    }, true);
    project.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openModal(project);
    }, true);
  });
  close.addEventListener('click', closeModal);
  newModal.addEventListener('click', event => { if (event.target === newModal) closeModal(); });
  newModal.querySelector('#modalCtaLibras').addEventListener('click', closeModal);
  addEventListener('keydown', event => { if (event.key === 'Escape' && newModal.classList.contains('open')) closeModal(); });

  const cardVideo = document.querySelector('.libras-card-video');
  if (cardVideo) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting && !document.body.classList.contains('reduce-motion')) entry.target.play().catch(() => {});
      else entry.target.pause();
    }), { rootMargin: '160px', threshold: .05 });
    observer.observe(cardVideo);
  }
})();