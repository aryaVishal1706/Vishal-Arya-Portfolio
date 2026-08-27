/* ═══════════════════════════════════════════════════════════════
   VISHAL ARYA 3D PORTFOLIO — MASTER SCRIPT
   Three.js · Theme Toggle · Chatbot · Animations · Interactions
═══════════════════════════════════════════════════════════════ */

/* ── PRELOADER ────────────────────────────────────────────── */
function hidePreloader() {
  const pl = document.getElementById('preloader');
  if (pl && !pl.classList.contains('gone')) {
    pl.classList.add('gone');
    try { startHeroAnimation(); } catch(e) { console.warn('Three.js unavailable:', e); }
    animateKPIs();
  }
}
// Force-hide after 2s max — never blocks on CDN
const preloaderTimeout = setTimeout(hidePreloader, 2000);
window.addEventListener('load', () => {
  clearTimeout(preloaderTimeout);
  setTimeout(hidePreloader, 500);
});
// Also hide immediately if DOM is ready and Three.js already loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { if(typeof THREE !== 'undefined') hidePreloader(); }, 800);
});

/* ── SCROLL PROGRESS ──────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  document.getElementById('scrollBar').style.width = pct + '%';
  // Navbar
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
  // Active nav link
  highlightNav();
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}

/* ── CUSTOM CURSOR ────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  fx += (e.clientX - fx) * 0.13;
  fy += (e.clientY - fy) * 0.13;
  cursorFollower.style.left = fx + 'px';
  cursorFollower.style.top  = fy + 'px';
});
// Smooth follower
function followCursor() {
  requestAnimationFrame(followCursor);
  cursorFollower.style.left = fx + 'px';
  cursorFollower.style.top  = fy + 'px';
}
followCursor();
document.addEventListener('mousemove', e => {
  fx += (e.clientX - fx) * 0.13;
  fy += (e.clientY - fy) * 0.13;
});
document.querySelectorAll('a,button,.tilt-card,.pfc,.flip-wrap').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; cursorFollower.style.opacity = '0.2'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursorFollower.style.opacity = '0.5'; });
});

/* ── HAMBURGER ────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const open  = navLinks.classList.contains('open');
  spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity   = open ? '0' : '1';
  spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── SMOOTH SCROLL ────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  })
);

/* ─────────────────────────────────────────────────────────────
   THREE.JS HERO SCENE
────────────────────────────────────────────────────────────── */
let threeScene, threeRenderer, threeCamera, torusKnot, particleSystem, innerSphere;
let mouse3D = { x: 0, y: 0 };

function startHeroAnimation() {
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('heroCanvas');
  threeScene    = new THREE.Scene();
  threeCamera   = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  threeCamera.position.set(0, 0, 5.5);

  threeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  threeRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ── Lights ──
  const amb = new THREE.AmbientLight(0x3b82f6, 0.4);
  const pt1 = new THREE.PointLight(0x3b82f6, 3, 20);
  const pt2 = new THREE.PointLight(0x8b5cf6, 2.5, 20);
  const pt3 = new THREE.PointLight(0x06b6d4, 1.5, 15);
  pt1.position.set(4, 4, 4);
  pt2.position.set(-4, -3, 3);
  pt3.position.set(0, -4, 2);
  threeScene.add(amb, pt1, pt2, pt3);

  // ── Torus Knot ──
  const tkg = new THREE.TorusKnotGeometry(1.3, 0.38, 140, 20);
  const tkm = new THREE.MeshPhongMaterial({
    color: 0x3b82f6, emissive: 0x1a3d7c,
    specular: 0x60a5fa, shininess: 80,
    transparent: true, opacity: 0.92,
  });
  torusKnot = new THREE.Mesh(tkg, tkm);
  torusKnot.position.set(3.2, 0.2, 0);
  threeScene.add(torusKnot);

  // ── Wireframe sphere around it ──
  const sg  = new THREE.SphereGeometry(2.6, 14, 14);
  const sm  = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.06 });
  innerSphere = new THREE.Mesh(sg, sm);
  innerSphere.position.copy(torusKnot.position);
  threeScene.add(innerSphere);

  // ── Floating Icosahedra ──
  const icoPositions = [[-3.5, 2, -1], [-2, -2.5, -2], [5, -1.5, -1]];
  icoPositions.forEach(p => {
    const ig = new THREE.IcosahedronGeometry(0.4, 0);
    const im = new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x3b0764, wireframe: false, transparent: true, opacity: 0.7 });
    const ico = new THREE.Mesh(ig, im);
    ico.position.set(...p);
    ico.userData.speed = Math.random() * 0.01 + 0.005;
    ico.userData.offset = Math.random() * Math.PI * 2;
    threeScene.add(ico);
  });

  // ── Particles ──
  const count = 350;
  const pGeo  = new THREE.BufferGeometry();
  const pPos  = new Float32Array(count * 3);
  const pCol  = new Float32Array(count * 3);
  const colors = [[0.23,0.51,0.96], [0.55,0.36,0.98], [0.02,0.71,0.84]];
  for (let i = 0; i < count; i++) {
    pPos[i*3]   = (Math.random() - 0.5) * 22;
    pPos[i*3+1] = (Math.random() - 0.5) * 18;
    pPos[i*3+2] = (Math.random() - 0.5) * 16;
    const c = colors[Math.floor(Math.random() * 3)];
    pCol[i*3] = c[0]; pCol[i*3+1] = c[1]; pCol[i*3+2] = c[2];
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.75 });
  particleSystem = new THREE.Points(pGeo, pMat);
  threeScene.add(particleSystem);

  // ── Mouse ──
  document.addEventListener('mousemove', e => {
    mouse3D.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse3D.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ── Resize ──
  window.addEventListener('resize', () => {
    threeCamera.aspect = canvas.clientWidth / canvas.clientHeight;
    threeCamera.updateProjectionMatrix();
    threeRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });

  // ── Animate ──
  let t = 0;
  (function animate() {
    requestAnimationFrame(animate);
    t += 0.012;

    torusKnot.rotation.x += 0.006;
    torusKnot.rotation.y += 0.010;
    innerSphere.rotation.y += 0.003;
    particleSystem.rotation.y += 0.0004;
    particleSystem.rotation.x += 0.0002;

    // Floating icosahedra
    threeScene.children.forEach(c => {
      if (c.geometry && c.geometry.type === 'IcosahedronGeometry') {
        c.rotation.x += c.userData.speed;
        c.rotation.y += c.userData.speed * 0.7;
        c.position.y += Math.sin(t + c.userData.offset) * 0.006;
      }
    });

    // Mouse parallax
    threeCamera.position.x += (mouse3D.x * 0.6 - threeCamera.position.x) * 0.04;
    threeCamera.position.y += (-mouse3D.y * 0.4 - threeCamera.position.y) * 0.04;
    threeCamera.lookAt(threeScene.position);

    threeRenderer.render(threeScene, threeCamera);
  })();
}

/* ── THEME TOGGLE ─────────────────────────────────────────── */
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

themeBtn.addEventListener('click', () => {
  const html   = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  html.setAttribute('data-theme', isLight ? 'dark' : 'light');
  // Sun = currently light (click to go dark) | Moon = currently dark (click to go light)
  themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';

  // Update Three.js colours
  if (torusKnot) {
    torusKnot.material.color.set(isLight ? 0x3b82f6 : 0x2563eb);
    torusKnot.material.emissive.set(isLight ? 0x1a3d7c : 0x1e40af);
  }
  if (particleSystem) {
    particleSystem.material.opacity = isLight ? 0.75 : 0.55;
  }
});

/* ── TYPED TEXT ───────────────────────────────────────────── */
const roles = ['AI/ML Solutions','Cloud Architectures','Intelligent Systems','Data-Driven Apps','AWS Pipelines','Deep Learning Models'];
let ri = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');
function typeLoop() {
  if (!del) {
    typedEl.textContent = roles[ri].slice(0, ci + 1);
    ci++;
    if (ci === roles[ri].length) { del = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = roles[ri].slice(0, ci - 1);
    ci--;
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, del ? 50 : 85);
}
typeLoop();

/* ── KPI COUNTER ──────────────────────────────────────────── */
function animateKPIs() {
  document.querySelectorAll('.kpi-n').forEach(el => {
    const end = parseInt(el.dataset.val);
    const sfx = el.dataset.sfx || '';
    let cur = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      cur = Math.min(cur + step, end);
      el.textContent = cur + sfx;
      if (cur >= end) clearInterval(timer);
    }, 35);
  });
}

/* ── INTERSECTION OBSERVER (reveal + skill bars) ──────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 90);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.ri').forEach(el => revealObs.observe(el));

const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sbar-fill').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));

/* ── 3D TILT EFFECT (skill cards, cert cards, edu cards) ──── */
function initTilt(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y*12}deg) rotateY(${x*12}deg) translateZ(10px)`;
      // Shine on cert cards
      const shine = card.querySelector('.cert-shine');
      if (shine) {
        shine.style.left = `${e.clientX - r.left}px`;
        shine.style.top  = `${e.clientY - r.top}px`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
initTilt('.skill-card');
initTilt('.cert-card');
initTilt('.edu-card');

// Also tilt contact cards
document.querySelectorAll('.contact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateZ(8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── COPY TO CLIPBOARD ────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      showToast('Copied to clipboard!');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      btn.style.color = '#22c55e';
      setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
    });
  });
});

/* ═══════════════════════════════════════════════════════════
   CHATBOT (VishalBot AI)
═══════════════════════════════════════════════════════════ */
const KNOWLEDGE = [
  {
    keys: ['hello','hi','hey','greetings','sup',"what's up",'howdy','good morning','good evening','good afternoon','yo'],
    ans: `Hey there! 👋 I'm <strong>VishalBot</strong>, Vishal's personal AI assistant.<br><br>I can tell you about his:<br>• 💻 Tech skills & expertise<br>• 💼 Work experience<br>• 🚀 Projects<br>• 🏆 Certifications<br>• 📬 Contact info<br><br>What would you like to know?`
  },
  {
    keys: ['who is vishal','about vishal','who are you','introduce','tell me about','background','summary'],
    ans: `🧑‍💻 <strong>Vishal Yogeshbhai Arya</strong> is an AI/ML Engineer & Cloud Architect based in Ahmedabad, India.<br><br>• 🏢 <strong>Current:</strong> Research Associate @ CloudThat Technologies<br>• 🎓 <strong>Edu:</strong> BTech CSE – Nirma University<br>• ☁️ <strong>Specialty:</strong> AWS Cloud, IaC, AI/ML, GenAI<br>• 🏆 <strong>Certs:</strong> 2 active AWS certifications<br>• 🚀 <strong>ISRO:</strong> Contributed to ISRO-funded research<br>• 📈 <strong>LinkedIn:</strong> 800+ followers<br><br>He's passionate about building cloud-first, AI-driven solutions that make real impact! 🌟`
  },
  {
    keys: ['skill','technology','tech stack','programming','language','framework','tool','know','expertise','python','javascript','java','aws','ml','ai','deep learning','cloud','devops'],
    ans: `💻 <strong>Vishal's Tech Arsenal:</strong><br><br>🐍 <strong>Languages:</strong> Python (90%), C/C++ (85%), JavaScript (80%), Java (70%), SQL<br><br>☁️ <strong>Cloud & DevOps:</strong><br>&nbsp;&nbsp;AWS: Lambda · EC2 · S3 · SageMaker · Bedrock · CloudFormation<br>&nbsp;&nbsp;IaC: Terraform · Docker · CodeBuild · Linux<br><br>🤖 <strong>AI / ML:</strong><br>&nbsp;&nbsp;Machine Learning (85%) · Deep Learning (70%) · Computer Vision (75%)<br>&nbsp;&nbsp;Frameworks: TensorFlow · Scikit-learn · U-Net · Random Forest<br><br>🌐 <strong>Web:</strong> HTML5/CSS3 · Bootstrap · Streamlit · PHP · MySQL`
  },
  {
    keys: ['experience','work','job','company','cloudthat','intern','internship','career','history','worked','lauruss','nirma'],
    ans: `💼 <strong>Vishal's Work Experience:</strong><br><br>1️⃣ <strong>Research Associate @ CloudThat</strong> (Jul 2025–Present)<br>&nbsp;&nbsp;→ NL-to-AWS system: <strong>80% faster</strong> deployment<br>&nbsp;&nbsp;→ Lambda, EC2, S3 automation pipelines<br><br>2️⃣ <strong>Research Intern @ CloudThat</strong> (Jan–Jul 2025)<br>&nbsp;&nbsp;→ Claude Sonnet 3.7 + AWS Bedrock integration<br>&nbsp;&nbsp;→ Terraform, CloudFormation, CodeBuild<br><br>3️⃣ <strong>Summer Intern @ Nirma (ISRO)</strong> (May–Jul 2024)<br>&nbsp;&nbsp;→ Marine debris detection, <strong>94% accuracy</strong>!<br><br>4️⃣ <strong>Software Engineer @ Lauruss</strong> (May–Aug 2022)<br>&nbsp;&nbsp;→ PHP web apps, 40% faster response times`
  },
  {
    keys: ['project','built','portfolio','showcase','iac','churn','marine','digit','chatbot','cv builder'],
    ans: `🚀 <strong>Vishal's Key Projects:</strong><br><br>1️⃣ <strong>Infrastructure as Code (IaC)</strong> ⭐<br>&nbsp;&nbsp;→ AWS + Claude Sonnet 3.7, 80% faster deployment<br><br>2️⃣ <strong>Marine Debris Detection</strong> 🛸 (ISRO-Funded)<br>&nbsp;&nbsp;→ 94% accuracy on Sentinel-2 satellite imagery<br><br>3️⃣ <strong>Customer Churn Prediction</strong><br>&nbsp;&nbsp;→ ANN + Logistic Regression + Streamlit dashboard<br><br>4️⃣ <strong>Handwritten Digit Classification</strong><br>&nbsp;&nbsp;→ TensorFlow + CNN deep learning<br><br>5️⃣ <strong>College Chatbot</strong> — NLP-powered<br>6️⃣ <strong>Dynamic CV Builder</strong> — Bootstrap + JS`
  },
  {
    keys: ['education','university','degree','study','college','school','cgpa','gpa','qualification','academic','diploma','ssc'],
    ans: `🎓 <strong>Vishal's Education:</strong><br><br>🏛️ <strong>BTech – Computer Science & Engineering</strong><br>&nbsp;&nbsp;Nirma University, Ahmedabad (2022–2025)<br>&nbsp;&nbsp;CGPA: 6.72 / 10<br><br>📜 <strong>Diploma – Information Technology</strong><br>&nbsp;&nbsp;Aditya Silver Oak (GTU) (2019–2022)<br>&nbsp;&nbsp;CGPA: <strong>9.54 / 10</strong> 🏆 (2nd Position in IT Branch!)<br><br>🏫 <strong>SSC – GSEB</strong><br>&nbsp;&nbsp;Shah V.H.H. High School (2019) – 72.66%`
  },
  {
    keys: ['certification','certificate','certified','coursera','achievement','award','hackathon','mined','mind hackathon','solutions architect','ai practitioner'],
    ans: `🏆 <strong>Vishal's Certifications:</strong><br><br>☁️ <strong>AWS Certified Solutions Architect – Associate</strong><br>&nbsp;&nbsp;Score: <strong>809 / 1000</strong> | Valid until Mar 2029<br><br>🤖 <strong>AWS Certified AI Practitioner</strong><br>&nbsp;&nbsp;Score: <strong>881 / 1000</strong> | Valid until Sep 2028<br><br>📊 <strong>Supervised ML (Coursera):</strong> 100 / 100 🌟<br>📊 <strong>Unsupervised ML & RL (Coursera):</strong> 98.2 / 100<br><br>🥈 <strong>2nd Place – Mind Hackathon 2023</strong> (Intech Track)<br>🤖 <strong>e-Series Core Track</strong> (Universal Robots)<br>🎟️ <strong>MINeD 2024</strong> – Nirma University`
  },
  {
    keys: ['contact','reach','email','phone','mobile','hire','connect','talk','get in touch','message'],
    ans: `📬 <strong>How to reach Vishal:</strong><br><br>📧 <strong>Email:</strong> vishalarya1706@gmail.com<br>📱 <strong>Phone:</strong> +91-7984832995<br><br>He's open to:<br>• 💼 Full-time AI/ML & Cloud roles<br>• 🤝 Research collaborations<br>• 💡 Freelance cloud/ML consulting<br><br>⏰ He typically responds within <strong>24 hours</strong>!`
  },
  {
    keys: ['location','where','based','city','ahmedabad','india','live','from','address'],
    ans: `📍 <strong>Vishal is based in:</strong><br>Ahmedabad, Gujarat, India 🇮🇳<br><br>Full Address:<br>B-103, Shree Sakat Valley, Near Aavkar Height,<br>Chandkheda, Ahmedabad – 382424`
  },
  {
    keys: ['isro','marine','satellite','debris','sentinel','marida'],
    ans: `🛸 <strong>ISRO-Funded Marine Debris Detection!</strong><br><br>An ISRO-funded project at Nirma University where Vishal:<br>• 🛰️ Analyzed Sentinel-2 satellite imagery<br>• 📊 Processed 1,381+ image patches<br>• 🔬 Used 800,000+ annotated pixels (MARIDA dataset)<br>• 🎯 Achieved <strong>94% accuracy</strong> with Random Forest<br>• 🌊 Implemented U-Net deep learning model<br>• 🌍 Contributed to global marine pollution monitoring 🌏`
  },
  {
    keys: ['linkedin','github','social','profile','portfolio','website','online'],
    ans: `🔗 <strong>Vishal's Online Presence:</strong><br><br>💼 <strong>LinkedIn:</strong> linkedin.com/in/vishalarya1706<br>&nbsp;&nbsp;800+ followers | 500+ connections<br><br>💻 <strong>GitHub:</strong> github.com/aryaVishal1706<br><br>🌐 <strong>Portfolio:</strong> aryavishal1706.github.io<br><br>📧 <strong>Email:</strong> vishalarya1706@gmail.com`
  },
  {
    keys: ['fun fact','interesting','hobby','passion','interest','personal','outside work'],
    ans: `🌟 <strong>Fun Facts about Vishal:</strong><br><br>• 🏆 Scored <strong>100/100</strong> in Coursera ML course!<br>• 🚀 ISRO-funded research contributor<br>• ☁️ 2 AWS certs (scored 881 & 809!)<br>• 🥈 Mind Hackathon 2023 winner<br>• 📈 800+ LinkedIn followers<br>• ⚡ Built AWS deployment system that's 80% faster!<br>• 🌊 Contributed to marine conservation through AI<br>• 💡 Believes in cloud-first, AI-driven innovation`
  },
  {
    keys: ['thanks','thank you','thank','great','awesome','nice','good job','amazing','impressive'],
    ans: `You're most welcome! 😊 Glad I could help!<br><br>If you'd like to get in touch with Vishal directly:<br>📧 <strong>vishalarya1706@gmail.com</strong><br>📱 <strong>+91-7984832995</strong><br><br>Have a great day! 🚀✨`
  },
  {
    keys:['salary','ctc','package', 'can you tell me his salary', 'can you tell me his current ctc','can you tell me his current ctc?','can you tell me his salary?'],
    "ans": "Please reach out to Vishal at <a href=\"mailto:vishalarya1706@gmail.com\">vishalarya1706@gmail.com</a> or <a href=\"tel:+917984832995\">+91 7984832995</a> for any salary-related queries or information."
  },
  {
    keys: ['bye','goodbye','see you','good night','cya','take care'],
    ans: `Goodbye! 👋 It was great chatting with you!<br><br>Don't hesitate to reach out to Vishal:<br>📧 vishalarya1706@gmail.com<br>📱 +91-7984832995<br><br>Have a wonderful day! 🌟`
  }
];

function botReply(input) {
  const q = input.toLowerCase().trim();
  for (const entry of KNOWLEDGE) {
    if (entry.keys.some(k => q.includes(k))) return entry.ans;
  }
  // Fallback
  return `🤔 Hmm, I'm not sure about that specific query!<br><br>You can ask me about Vishal's:<br>• 💻 <strong>Skills</strong> — "What are his skills?"<br>• 💼 <strong>Experience</strong> — "Tell me about his work"<br>• 🚀 <strong>Projects</strong> — "What has he built?"<br>• 🏆 <strong>Certifications</strong> — "What certs does he have?"<br>• 📬 <strong>Contact</strong> — "How do I reach Vishal?"<br><br>Or reach him directly: <strong>vishalarya1706@gmail.com</strong>`;
}

function appendMsg(html, isUser) {
  const msgs = document.getElementById('cbMsgs');
  const wrap = document.createElement('div');
  wrap.className = 'cb-msg ' + (isUser ? 'user-msg' : 'bot-msg');
  const bub = document.createElement('div');
  bub.className = 'msg-bub';
  bub.innerHTML = html;
  wrap.appendChild(bub);
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('cbMsgs');
  const ti = document.createElement('div');
  ti.className = 'cb-msg bot-msg';
  ti.id = 'typingIndicator';
  const inner = document.createElement('div');
  inner.className = 'msg-bub typing-indicator';
  inner.innerHTML = '<span></span><span></span><span></span>';
  ti.appendChild(inner);
  msgs.appendChild(ti);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  const ti = document.getElementById('typingIndicator');
  if (ti) ti.remove();
}

function sendMsg(text) {
  if (!text.trim()) return;
  appendMsg(text, true);
  document.getElementById('cbInput').value = '';
  showTyping();
  const delay = 700 + Math.random() * 800;
  setTimeout(() => {
    removeTyping();
    appendMsg(botReply(text), false);
  }, delay);
}

// Toggle chatbot
const cbToggle  = document.getElementById('cbToggle');
const cbWin     = document.getElementById('chatbotWin');
const cbOpenIcon  = document.getElementById('cbOpenIcon');
const cbCloseIcon = document.getElementById('cbCloseIcon');

cbToggle.addEventListener('click', () => {
  const isOpen = cbWin.classList.toggle('open');
  cbOpenIcon.style.display  = isOpen ? 'none'  : 'block';
  cbCloseIcon.style.display = isOpen ? 'block' : 'none';
});
document.getElementById('cbClose').addEventListener('click', () => {
  cbWin.classList.remove('open');
  cbOpenIcon.style.display  = 'block';
  cbCloseIcon.style.display = 'none';
});

// Input
document.getElementById('cbSend').addEventListener('click', () => sendMsg(document.getElementById('cbInput').value));
document.getElementById('cbInput').addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(e.target.value); });

// Quick reply buttons
document.querySelectorAll('.qb').forEach(btn => {
  btn.addEventListener('click', () => { sendMsg(btn.dataset.q); btn.closest('.cb-quick-btns').remove(); });
});

/* ── SKILL BAR HELPER ─────────────────────────────────────── */
// Re-select after DOM ready
document.querySelectorAll('.sbar-row').forEach(row => {
  const fill  = row.querySelector('.sbar-fill');
  const spans = row.querySelectorAll('span');
  if (fill && spans.length >= 2) {
    // Move spans inside a wrapper for the display
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;justify-content:space-between;font-size:0.83rem;color:var(--muted);margin-bottom:0.4rem';
    spans.forEach(s => wrapper.appendChild(s.cloneNode(true)));
    // Remove original spans and re-insert
  }
});

/* ── CONTACT CARD FLOATING PARTICLES ─────────────────────── */
document.querySelectorAll('.cc-particles').forEach(container => {
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const colors = ['rgba(59,130,246,0.4)','rgba(139,92,246,0.4)','rgba(6,182,212,0.4)'];
    Object.assign(dot.style, {
      position: 'absolute',
      width: size + 'px', height: size + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      background: colors[Math.floor(Math.random() * 3)],
      borderRadius: '50%',
      animation: `floatDot ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite alternate`,
    });
    container.appendChild(dot);
  }
});
const ps = document.createElement('style');
ps.textContent = `@keyframes floatDot {0%{transform:translate(0,0);opacity:0.4;}100%{transform:translate(${Math.random()*20-10}px,${-20-Math.random()*15}px);opacity:0;}}`;
document.head.appendChild(ps);

/* ── NAV LINKS: Smooth highlight on hover ─────────────────── */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mouseenter', () => { if (!link.classList.contains('active')) link.style.color = 'var(--text)'; });
  link.addEventListener('mouseleave', () => { if (!link.classList.contains('active')) link.style.color = ''; });
});

/* ═══════════════════════════════════════════════════════════
   SKILL BUBBLE TAB FILTER
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.sk-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    document.querySelectorAll('.sk-bubble').forEach((bubble, i) => {
      const match = cat === 'all' || bubble.dataset.cat === cat;
      if (match) {
        bubble.classList.remove('hidden');
        bubble.style.animationDelay = (i * 40) + 'ms';
        // Re-trigger reveal
        bubble.classList.remove('in');
        setTimeout(() => bubble.classList.add('in'), i * 40);
      } else {
        bubble.classList.add('hidden');
      }
    });
  });
});

/* Skill bar animation on scroll */
const skBubbleObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-bar').forEach(bar => {
        const w = bar.style.width; // already set inline
        bar.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { bar.style.width = w; });
        });
      });
      skBubbleObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

const skGrid = document.getElementById('skGrid');
if (skGrid) skBubbleObs.observe(skGrid);

/* Tilt on skill bubbles */
document.querySelectorAll('.sk-bubble').forEach(b => {
  b.addEventListener('mousemove', e => {
    const r = b.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    b.style.transform = `perspective(600px) rotateX(${-y*14}deg) rotateY(${x*14}deg) translateY(-6px) scale(1.04)`;
  });
  b.addEventListener('mouseleave', () => { b.style.transform = ''; });
});
