/* ------------------------------------------------------------------
 * Portfolio bootstrap — fetches data.json and injects the entire DOM.
 * No content is hard-coded in index.html.
 * ------------------------------------------------------------------ */

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
};

async function loadData() {
  const res = await fetch('data.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('Failed to load data.json');
  return res.json();
}

/* ----- Renderers ----- */

function renderNav(data) {
  const container = document.getElementById('navLinks');
  data.navigation.forEach(item => {
    container.appendChild(el('a', { href: `#${item.id}`, 'data-nav': item.id }, item.label));
  });
  const brand = document.querySelector('[data-brand]');
  brand.textContent = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
}

function renderHero(data) {
  const p = data.personalInfo;
  document.querySelector('[data-eyebrow]').textContent = `// Based in ${p.location}`;
  document.querySelector('[data-name]').textContent = `${p.firstName} ${p.lastName}.`;
  document.querySelector('[data-title]').textContent = p.title;
  document.querySelector('[data-summary]').textContent = p.summary;
  const cv = document.querySelector('[data-cv]');
  cv.setAttribute('href', p.cvPdf);
  document.querySelector('[data-footer]').textContent =
    `© ${new Date().getFullYear()} ${p.firstName} ${p.lastName}. Built with vanilla HTML, CSS & JS.`;
}

function renderExperience(data) {
  const list = document.getElementById('experienceList');
  data.experience.forEach((job, i) => {
    const card = el('article', { class: `glass expCard reveal d${Math.min(i + 1, 5)}` }, [
      el('div', { class: 'expHead' }, [
        el('div', {}, [
          el('h4', { class: 'expRole' }, job.role),
          el('p', { class: 'expCompany' }, job.company + (job.location ? ` · ${job.location}` : '')),
        ]),
        el('span', { class: 'expPeriod' }, job.period),
      ]),
      el('ul', { class: 'expTasks' }, job.tasks.map(t => el('li', {}, t))),
    ]);
    list.appendChild(card);
  });
}

function renderProjects(data) {
  const grid = document.getElementById('projectsList');
  data.projects.forEach((proj, i) => {
    const classes = ['glass', 'projectCard', `reveal`, `d${(i % 5) + 1}`];
    if (proj.featured) classes.push('featured');
    const card = el('article', { class: classes.join(' ') }, [
      el('h4', { class: 'projectTitle' }, proj.title),
      el('p', { class: 'projectDesc' }, proj.description),
      el('div', { class: 'projectTech' },
        proj.tech.map(t => el('span', { class: 'techBadge' }, t))),
      el('div', { class: 'projectLinks' }, [
        el('a', { href: proj.link, target: '_blank', rel: 'noreferrer' }, 'Source'),
        proj.liveDemo ? el('a', { href: proj.liveDemo, target: '_blank', rel: 'noreferrer' }, 'Live demo') : null,
      ]),
    ]);
    // Pointer-follow glow
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    grid.appendChild(card);
  });
}

function renderSkills(data) {
  const list = document.getElementById('skillsList');
  Object.entries(data.skills).forEach(([group, items], i) => {
    list.appendChild(el('div', { class: `glass skillCard reveal d${(i % 5) + 1}` }, [
      el('h4', {}, group),
      el('div', { class: 'skillList' },
        items.map(s => el('span', { class: 'techBadge' }, s))),
    ]));
  });
}

function renderEducation(data) {
  const list = document.getElementById('educationList');
  data.education.forEach((edu, i) => {
    list.appendChild(el('div', { class: `glass eduCard reveal d${(i % 5) + 1}` }, [
      el('h4', {}, edu.degree),
      el('p', { class: 'eduInst' }, edu.institution),
      el('p', { class: 'eduPeriod' }, edu.period),
    ]));
  });
}

function renderContact(data) {
  const p = data.personalInfo;
  const wrap = document.getElementById('contactCard');
  wrap.className = 'glass contactCard reveal';
  const items = [
    { label: 'Email', value: p.email, href: `mailto:${p.email}` },
    { label: 'Phone', value: p.phone, href: `tel:${p.phone.replace(/\s+/g, '')}` },
    { label: 'GitHub', value: p.github, href: `https://${p.github}` },
    { label: 'Location', value: p.location },
  ];
  items.forEach(it => {
    wrap.appendChild(el('div', { class: 'contactItem' }, [
      el('h5', {}, it.label),
      it.href
        ? el('a', { href: it.href, target: '_blank', rel: 'noreferrer' }, it.value)
        : el('p', {}, it.value),
    ]));
  });
}

/* ----- Behaviors ----- */

function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(n => io.observe(n));
}

function initNavHighlight() {
  const links = Array.from(document.querySelectorAll('[data-nav]'));
  const sections = links
    .map(a => document.getElementById(a.getAttribute('data-nav')))
    .filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('data-nav') === id));
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(s => io.observe(s));
}

function initNavScrollState() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ----- Canvas particle background ----- */
function initParticleCanvas() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let w, h, dpr, particles = [];
  const COUNT = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 22000));

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  };
  const spawn = () => {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * dpr,
      vy: (Math.random() - 0.5) * 0.25 * dpr,
      r: (Math.random() * 1.8 + 0.4) * dpr,
      a: Math.random() * 0.5 + 0.2,
    }));
  };

  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    // lines between close particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        const maxD = 140 * dpr;
        if (d2 < maxD * maxD) {
          const alpha = (1 - Math.sqrt(d2) / maxD) * 0.15;
          ctx.strokeStyle = `rgba(124, 92, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(200, 210, 255, ${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  };

  resize(); spawn(); tick();
  window.addEventListener('resize', () => { resize(); spawn(); });
}

/* ----- Boot ----- */
(async function init() {
  try {
    const data = await loadData();
    renderNav(data);
    renderHero(data);
    renderExperience(data);
    renderProjects(data);
    renderSkills(data);
    renderEducation(data);
    renderContact(data);
    initScrollReveal();
    initNavHighlight();
    initNavScrollState();
    initParticleCanvas();
  } catch (err) {
    console.error(err);
    document.body.insertAdjacentHTML('afterbegin',
      '<p style="padding:2rem;color:#f88">Failed to load portfolio data.</p>');
  }
})();
