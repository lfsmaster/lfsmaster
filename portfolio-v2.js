(() => {
  'use strict';

  const VIDEO = {
    design: 'https://www.pexels.com/download/video/5081433/',
    audiovisual: 'https://www.pexels.com/download/video/19197555/'
  };

  const css = document.createElement('style');
  css.textContent = `
    #portfolio{background:#080808}
    #portfolio .section-head{margin-bottom:34px}
    #portfolio .section-lead{max-width:720px}
    #portfolio .filters{display:flex;gap:8px;flex-wrap:wrap;width:max-content;max-width:100%;padding:7px;margin-bottom:26px;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:#0e0e0e}
    #portfolio .filter{border:0;background:transparent;padding:10px 15px;color:#aaa;transition:background .25s,color .25s}
    #portfolio .filter.active,#portfolio .filter:hover{background:#ff0000;color:#fff}
    #portfolio .projects{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:112px;gap:18px}
    #portfolio .project{position:relative;isolation:isolate;overflow:hidden;min-height:0!important;border-radius:26px;border:1px solid rgba(255,255,255,.16);background:#111;box-shadow:0 20px 65px rgba(0,0,0,.18);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .35s,box-shadow .35s}
    #portfolio .project:hover{transform:translateY(-6px);border-color:rgba(255,0,0,.72);box-shadow:0 28px 90px rgba(0,0,0,.42)}
    #portfolio .project[hidden]{display:none}
    #portfolio .project.portfolio-featured{grid-column:span 7;grid-row:span 5}
    #portfolio .project.portfolio-tall{grid-column:span 5;grid-row:span 5}
    #portfolio .project.portfolio-wide{grid-column:span 6;grid-row:span 4}
    #portfolio .project-art{position:absolute;inset:0;width:100%;height:100%!important;z-index:0;overflow:hidden;transition:transform .75s cubic-bezier(.2,.8,.2,1),filter .4s}
    #portfolio .project:hover .project-art{transform:scale(1.025)}
    #portfolio .project::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.08) 34%,rgba(0,0,0,.9) 100%),linear-gradient(90deg,rgba(0,0,0,.38),transparent 66%)}
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
    body.reduce-motion .portfolio-video{display:none!important}
    @media(prefers-reduced-motion:reduce){.portfolio-video{display:none!important}}
  `;
  document.head.appendChild(css);

  const title = document.querySelector('#portfolio .section-title');
  const lead = document.querySelector('#portfolio .section-lead');
  if (title) title.textContent = 'Projetos que mostram o que podemos criar juntos.';
  if (lead) lead.textContent = 'Conceitos demonstrativos que traduzem as principais frentes da agência. Cada card reúne imagem ou vídeo, proposta, entregáveis e direção criativa na mesma área.';

  const projects = [...document.querySelectorAll('#portfolio .project')];
  const sizes = ['portfolio-featured','portfolio-tall','portfolio-wide','portfolio-wide','portfolio-tall','portfolio-featured','portfolio-wide','portfolio-wide'];
  const statuses = ['Estratégia + Design','Conteúdo','UX/UI','Vídeo + Motion','Inclusão','Projeto 360°','Impresso','Direção de Arte'];
  const light = new Set([4,6]);

  projects.forEach((project,index) => {
    project.classList.remove('large','medium','half');
    project.classList.add(sizes[index] || 'portfolio-wide');
    if (light.has(index)) project.classList.add('portfolio-light');
    const copy = project.querySelector('.project-copy');
    const small = copy?.querySelector('small');
    if (small) small.dataset.status = statuses[index] || 'Projeto';
    if (copy && !copy.querySelector('.portfolio-tags')) {
      const tags = document.createElement('div');
      tags.className = 'portfolio-tags';
      const items = (project.dataset.deliverables || '').split('|').slice(0,3);
      tags.innerHTML = items.map((item) => `<span>${item}</span>`).join('');
      copy.appendChild(tags);
    }
  });

  function addVideo(projectIndex,url,labelText,ariaLabel){
    const art = projects[projectIndex]?.querySelector('.project-art');
    if (!art || art.querySelector('.portfolio-video')) return;
    const video = document.createElement('video');
    video.className = 'portfolio-video';
    video.autoplay = true; video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'metadata';
    video.setAttribute('aria-label',ariaLabel);
    const source = document.createElement('source'); source.src = url; source.type = 'video/mp4'; video.appendChild(source);
    const overlay = document.createElement('div'); overlay.className = 'portfolio-video-overlay';
    const label = document.createElement('span'); label.className = 'portfolio-video-label'; label.textContent = labelText;
    video.addEventListener('canplay',() => art.classList.add('video-loaded'),{once:true});
    video.addEventListener('error',() => {video.hidden = true; art.classList.remove('video-loaded')});
    art.prepend(overlay); art.prepend(video); art.append(label);
  }

  addVideo(0,VIDEO.design,'Design em processo','Designer trabalhando em uma composição visual');
  addVideo(3,VIDEO.audiovisual,'Captação audiovisual','Videomaker operando uma câmera profissional');

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll('.portfolio-video')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const pause = reducedMotion.matches || document.body.classList.contains('reduce-motion') || !entry.isIntersecting || document.hidden;
      if (pause) video.pause(); else video.play().catch(() => {});
    });
  },{rootMargin:'180px',threshold:.05});
  videos.forEach((video) => observer.observe(video));
})();