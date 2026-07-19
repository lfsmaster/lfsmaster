(() => {
  'use strict';

  const videos = {
    hero: 'https://dnznrvs05pmza.cloudfront.net/4036e3aa-0ef2-4480-9d5c-393f11af338e.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmNhZjI2NWM5NGIxODBiYyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYyNjY1Mn0.UpLhiBOuYpHfU_LYIeEPkSJxIWrV9BShWJ4ghck6BHQ',
    branding: 'https://dnznrvs05pmza.cloudfront.net/592c58f4-4b9a-4b24-a337-3e1adb8aa74d.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGEyOWQzZjRlNjI0ZGYwYSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYwMzEyNH0.SCv8NrDfTrHRvANtsdgF9v0uOuqTLX7BK4jNQx8Waq4',
    social: 'https://dnznrvs05pmza.cloudfront.net/adaa9f3f-e238-4eef-99bd-218d75a9d66d.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2QxZTI3Y2Y3ODUwZGFlOSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDY3MTk1MX0.x8HR3hhafmYiqeZFoX7FO-zIiuVelE8mgE0uLHgME3I',
    web: 'https://dnznrvs05pmza.cloudfront.net/1dda2a05-6dcc-439f-8396-a230950d2a0b.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiOTVhYzBhZDgzOTk1NDQ0NyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYyODk1Mn0.8K2CVjIgaVbUAzcRFqNq80sEuEbOcDNXpFCxdkMnOW4',
    audiovisual: 'https://dnznrvs05pmza.cloudfront.net/a356dd48-aedd-4d96-a5b5-918f027849dc.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzIxZWI2YjgwMGQ5N2MyNSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDY2OTg4MH0.53NiDYJ8r7YmAHGBICyt38CC8IleXAZrEagudVFkRuY',
    libras: 'https://dnznrvs05pmza.cloudfront.net/a4e3f2a1-4ef0-4355-b026-92b1c27d2084.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2EzOTk0ZTJhYzk4ZjhmMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYwODA5OH0.IB7Ss8WaYzJYEd-I_i28Ru9xiZZowTjGyx6xjPw7k-Y',
    campaign: 'https://dnznrvs05pmza.cloudfront.net/4036e3aa-0ef2-4480-9d5c-393f11af338e.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmNhZjI2NWM5NGIxODBiYyIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4NDYyNjY1Mn0.UpLhiBOuYpHfU_LYIeEPkSJxIWrV9BShWJ4ghck6BHQ'
  };

  const projectVideos = {
    'Sistema de marca completo': videos.branding,
    'Conteúdo que organiza o feed': videos.social,
    'Landing page de conversão': videos.web,
    'Filme de marca e conteúdo vertical': videos.audiovisual,
    'Conteúdo com tradução em Libras': videos.libras,
    'Experiência digital acessível': videos.libras,
    'Campanha integrada 360°': videos.campaign,
    'Editorial, papelaria e materiais físicos': videos.branding,
    'Fotografia e direção de arte': videos.audiovisual
  };

  function setVideo(video, url) {
    if (!video || !url) return;
    let source = video.querySelector('source');
    if (!source) {
      source = document.createElement('source');
      source.type = 'video/mp4';
      video.appendChild(source);
    }
    if (source.src === url) return;
    source.src = url;
    video.load();
    if (!document.body.classList.contains('reduce-motion')) video.play().catch(() => {});
  }

  function applyOriginalVideos() {
    const heroVideo = document.querySelector('.hero-video');
    setVideo(heroVideo, videos.hero);

    document.querySelectorAll('.project').forEach(project => {
      const title = project.dataset.title || project.querySelector('h3')?.textContent?.trim();
      const url = projectVideos[title];
      if (!url) return;
      project.dataset.video = url;
      const video = project.querySelector('.project-video');
      setVideo(video, url);
    });

    const librasCard = document.querySelector('.libras-card-video');
    setVideo(librasCard, videos.libras);

    document.querySelectorAll('source[src*="pexels"], video[src*="pexels"]').forEach(node => {
      const video = node.closest('video') || node;
      const project = node.closest('.project');
      const title = project?.dataset.title || project?.querySelector('h3')?.textContent?.trim();
      setVideo(video, projectVideos[title] || videos.hero);
    });

    document.querySelectorAll('footer, .legal, .modal-video-note').forEach(element => {
      if (element.textContent.includes('Pexels')) {
        element.innerHTML = element.innerHTML.replace(/Pexels/gi, 'produção original Middea');
      }
    });
  }

  applyOriginalVideos();
  addEventListener('load', applyOriginalVideos, { once: true });
  const observer = new MutationObserver(applyOriginalVideos);
  observer.observe(document.body, { childList: true, subtree: true });
})();