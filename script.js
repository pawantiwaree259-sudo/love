/* =========================================================
   EDIT HERE: date, text and file paths are all in CONFIG
   ========================================================= */
const CONFIG = {
  confessionDate: "2026-05-07T00:00:00", // <-- CHANGE to your confession date (YYYY-MM-DDTHH:MM:SS)
};

const REASONS = [
  ["Thank you for understanding me 🫶🏻", "You understand the things I say,<br>the things I don't say,<br>and sometimes even the feelings I can't explain.<br><br>Having someone who genuinely tries to understand me means more than I can put into words."],
  ["Thank you for making my ordinary days special ✨", "Even a simple conversation with you can make my whole day better.<br><br>Your messages, your voice, your little jokes, and your presence have become some of my favorite parts of my day."],
  ["Thank you for giving me a reason to smile 🥰", "No matter how my day is going, somehow you can make things feel lighter.<br><br>Your smile has a special place in my heart, and knowing that you're there makes me happier than you realize."],
  ["Thank you for choosing us ❤️♾️", "Long distance isn't always easy.<br><br>There are days when we miss each other and wish we could simply be together.<br><br>But thank you for staying, trying, understanding, and choosing this relationship with me.<br><br>That means everything to me."],
  ["Thank you for being you ❤️", "I don't love you because you're perfect.<br><br>I love you because you're YOU.<br><br>Your little habits, your cute moments, your way of caring, your personality — all the little things that make you who you are.<br><br>I'm genuinely grateful that out of all the people in this world, I got to meet you."],
];
const TIMELINE = ["The confession ❤️","Our first memories","Getting closer","Learning each other","Growing together","5 Months Together ❤️"];
const POLAROIDS = [
  ["images/couple1.png","You & Me ❤️","my favorite person",-4],
  ["images/couple2.png","More Memories Together ❤️","better together",3],
  ["images/couple3.png","Different places.<br>Same heart.","my safe place",-2],
  ["images/couple4.png","Every memory with you is my favorite.","forever us",4],
];
const STAR_MSGS = ["Month 1: I took a chance on my heart, and it chose you.","Month 2: Every conversation started to feel like home.","Month 3: I realised I was falling harder every day.","Month 4: Distance got heavy, but you made it lighter.","Month 5: Still you. Still always you. ❤️"];
const PROMISES = ["I promise to listen to you.","I promise to keep making you smile.","I promise to communicate, even when distance feels difficult.","I promise to keep making memories with you.","I promise to keep choosing us."];
const GIFTS = [
  "A compliment for you:<br>you make everything around you softer just by being in it.",
  "A memory:<br>the first time you laughed at my silly joke, and I forgot what I was going to say next.",
  "A reason I love you:<br>you care in the smallest, sweetest ways, and you never even notice.",
  "A promise:<br>I'll show up for you, every single day, miles or no miles.",
  "A message from my heart:<br>You are my favorite person, baby ji. On my best days and my worst days, you're the one I want to tell. I'm so proud of us, and I'd choose this long road with you again and again. ❤️",
];
const TODO = ["Watch a movie together in the same room","Go on our first proper date","Take our first photograph together in person","Hold your hand while walking","Watch the sunset together","Travel somewhere together","Celebrate an anniversary together","Make memories we can touch, not just memories on a screen"];
const SECRETS = ["I miss your smile. ❤️","I love talking to you, even when we have nothing to talk about.","You make ordinary days feel special.","Distance can't change what you mean to me.","If I had to choose again, I'd still choose you. ❤️"];
const SURPRISE = ["If I could be anywhere in the world right now...","*I would be beside you.","I know I can't hold your hand today.<br>I know I can't look into your eyes while saying all of this.<br>I know the distance makes some moments harder.","But even from miles away... you are still one of the closest people to my heart.","Until the day we finally meet, I'll keep loving you, choosing you, and making memories with you.","*Happy 5 Months, Baby Ji. ❤️","I love you.<br>Always. ♾️"];
const LETTER_END = ["And one last thank you, baby ji...","Thank you for becoming my favorite person, my comfort, my happiness, and my perfect little paradise. 🌙❤️","These 5 months are just one small chapter of our story. I hope we get to write many, many more together.","Happy 5 months, my jaan annu. ❤️🥰","Thank you for being mine.<br>And thank you for letting me be yours. ❤️♾️","— Yours, always. ❤️"];

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
const sleep = ms => new Promise(r => setTimeout(r, ms));

function toast(msg, ms = 3800) {
  const t = $('#toast'); t.innerHTML = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, ms);
}
function burst(x, y, n = 10, chars = ['❤️', '✨', '💗']) {
  for (let i = 0; i < n; i++) {
    const p = el('span', 'particle', chars[i % chars.length]);
    p.style.left = x + (Math.random() * 60 - 30) + 'px'; p.style.top = y + 'px';
    p.style.setProperty('--x', (Math.random() * 120 - 60) + 'px');
    p.style.setProperty('--d', (1.8 + Math.random() * 1.4) + 's');
    p.style.fontSize = (14 + Math.random() * 16) + 'px';
    document.body.appendChild(p); setTimeout(() => p.remove(), 3500);
  }
}
const burstAt = e => { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2); };
const onView = (nodes, cb, th = .35) => {
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { cb(en.target); io.unobserve(en.target); } }), { threshold: th });
  nodes.forEach(n => io.observe(n));
};

/* ---------- text sequences (lines separated by "|", "*" = big script line) ---------- */
function buildLines(container, lines) {
  container.innerHTML = '';
  lines.forEach(l => { const p = el('p', l.startsWith('*') ? 'em' : '', l.replace(/^\*/, '')); container.appendChild(p); });
  return $$('p', container);
}
async function playLines(ps, gap = 1700) { for (const p of ps) { p.classList.add('show'); await sleep(gap); } }
function initSequences() {
  $$('[data-lines], .seq[data-lines]').forEach(box => {
    const ps = buildLines(box, box.dataset.lines.split('|'));
    onView([box], () => playLines(ps, box.classList.contains('slow') ? 2600 : 1700), .3);
  });
}

/* ---------- gate: stars + open ---------- */
function initSky() {
  const c = $('#sky'), x = c.getContext('2d'); let w, h, stars = [];
  const fit = () => { w = c.width = innerWidth; h = c.height = innerHeight; stars = Array.from({ length: 90 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + .3, p: Math.random() * 6, g: Math.random() < .3 })); };
  fit(); addEventListener('resize', fit);
  (function draw(t = 0) {
    if ($('#gate').classList.contains('gone')) return;
    x.clearRect(0, 0, w, h);
    const m = x.createRadialGradient(w * .75, h * .15, 0, w * .75, h * .15, 120); m.addColorStop(0, 'rgba(255,240,200,.9)'); m.addColorStop(.25, 'rgba(201,164,92,.25)'); m.addColorStop(1, 'transparent');
    x.fillStyle = m; x.fillRect(0, 0, w, h);
    stars.forEach(s => { x.globalAlpha = .4 + .6 * Math.abs(Math.sin(t / 1200 + s.p)); x.fillStyle = s.g ? '#C9A45C' : '#FFF8F3'; x.beginPath(); x.arc(s.x, (s.y - t / 90 * (s.g ? 1 : 0) % h + h) % h, s.r, 0, 7); x.fill(); });
    requestAnimationFrame(draw);
  })();
  setInterval(() => { if (!$('#gate').classList.contains('gone')) burst(Math.random() * innerWidth, innerHeight, 1, ['♡']); }, 1400);
}
function initGate() {
  $('#openHeart').addEventListener('click', async e => {
    burstAt(e); $('#gate').classList.add('opening'); burst(innerWidth / 2, innerHeight / 2, 24);
    await sleep(1400); $('#main').hidden = false; document.body.classList.remove('locked');
    $('#gate').classList.add('gone'); scrollTo(0, 0); await sleep(1600); $('#gate').remove();
  });
}

/* ---------- counter, timeline ---------- */
function initStory() {
  const start = new Date(CONFIG.confessionDate);
  $('#confDate').textContent = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const t = $('#timeline'); t.innerHTML = '<li>' + [start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })].concat(TIMELINE).join('</li><li>') + '</li>';
  $$('li', t).forEach((li, i) => li.style.transitionDelay = i * .35 + 's');
  onView([t], n => n.classList.add('show'), .2);
  const box = $('#counter'); box.innerHTML = ['Days', 'Hours', 'Minutes', 'Seconds'].map(l => `<div><b data-u="${l}">0</b><span>${l.toUpperCase()}</span></div>`).join('');
  const tick = () => {
    let s = Math.max(0, Math.floor((Date.now() - start) / 1000));
    const v = { Days: Math.floor(s / 86400), Hours: Math.floor(s % 86400 / 3600), Minutes: Math.floor(s % 3600 / 60), Seconds: s % 60 };
    for (const k in v) $(`[data-u="${k}"]`).textContent = v[k];
  };
  tick(); setInterval(tick, 1000);
}

/* ---------- gallery ---------- */
function initGallery() {
  const box = $('#polaroids');
  POLAROIDS.forEach(([src, cap, note, r]) => {
    const p = el('div', 'polaroid', `<div class="ph"><img src="${src}" alt="" onerror="this.remove()"></div><p>${cap}</p><small>${note}</small>`);
    p.style.setProperty('--r', r + 'deg'); p.addEventListener('click', burstAt); box.appendChild(p);
  });
}

/* ---------- reason cards ---------- */
function initReasons() {
  const box = $('#cards'); let opened = new Set();
  REASONS.forEach(([title, body], i) => {
    const c = el('div', 'card', `<div class="face front">Tap to open reason ${i + 1} 💌</div><div class="face back"><strong>${title}</strong><br><br>${body}</div>`);
    c.addEventListener('click', e => { c.classList.add('open'); burstAt(e); opened.add(i); if (opened.size === 5) $('#reasonsEnd').classList.add('show'); });
    box.appendChild(c);
  });
}

/* ---------- heart, stars, hug, miss ---------- */
function initInteractions() {
  $('#bigHeart').addEventListener('click', async e => {
    burstAt(e); $('#beatMsg').innerHTML = 'Still beating for you. ❤️'; await sleep(1800); $('#beatMsg').innerHTML = 'Even from miles away.';
  });
  const sb = $('#stars'); const pos = [[10, 55], [30, 15], [50, 60], [70, 20], [88, 58]];
  pos.forEach(([x, y], i) => { const s = el('button', 'star', '★'); s.style.left = `calc(${x}% - 22px)`; s.style.top = y + '%'; s.style.animationDelay = i * .4 + 's'; s.setAttribute('aria-label', 'Star ' + (i + 1)); s.onclick = e => { $('#starMsg').textContent = STAR_MSGS[i]; burstAt(e); }; sb.appendChild(s); });
  $('#hugBtn').addEventListener('click', async e => {
    const st = $('.hug-stage'), m = $('#hugMsg'); st.classList.add('merge'); m.textContent = '';
    await sleep(1900); const r = st.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 40, 16);
    m.innerHTML = 'Your hug has reached me. ❤️'; await sleep(2200); m.innerHTML = 'Sending one back... 🤗❤️';
  });
  $('#missBtn').addEventListener('click', async e => {
    const m = $('#missMsg'); e.currentTarget.disabled = true;
    for (const l of ['Close your eyes for a second...', 'Imagine I\'m sitting right beside you.', 'Imagine me holding your hand...', 'One day, we won\'t have to imagine it anymore. ❤️', 'Until then, keep this little virtual hug from me. 🤗❤️']) { m.style.opacity = 0; await sleep(500); m.innerHTML = l; m.style.opacity = 1; await sleep(2600); }
    e.currentTarget.disabled = false;
  });
  $('#futureBtn').addEventListener('click', e => { $('#futurePaper').hidden = false; e.currentTarget.hidden = true; });
}

/* ---------- lists ---------- */
function initLists() {
  $('#promiseList').innerHTML = PROMISES.map(p => `<li>${p}</li>`).join('');
  $('#todoList').innerHTML = TODO.map(t => `<li>${t}</li>`).join('');
  $$('#todoList li').forEach(li => li.onclick = e => { li.classList.toggle('done'); if (li.classList.contains('done')) { const r = li.getBoundingClientRect(); burst(r.left + 20, r.top, 5); } });
  const row = $('#giftRow'), msg = $('#giftMsg');
  GIFTS.forEach((g, i) => { const b = el('button', 'gift', `🎁<small>Open #${i + 1} ❤️</small>`); b.onclick = e => { b.classList.add('opened'); msg.style.opacity = 0; setTimeout(() => { msg.innerHTML = g; msg.style.opacity = 1; }, 300); burstAt(e); if (i === 4) { const r = b.getBoundingClientRect(); burst(r.left, r.top, 24); } }; row.appendChild(b); });
}

/* ---------- audio (user-triggered only) ---------- */
function initAudio() {
  const song = $('#song'), voice = $('#voice'), fab = $('#musicFab'), sBtn = $('#songBtn'), vBtn = $('#voiceBtn');
  const setUI = () => {
    const on = !song.paused; $('#vinyl1').classList.toggle('spin', on); $('#wave1').classList.toggle('on', on);
    sBtn.textContent = on ? 'Pause Our Song ⏸' : 'Play Our Song ❤️'; fab.classList.toggle('playing', on); fab.textContent = on ? '⏸' : '♪';
    const v = !voice.paused; $('#wave2').classList.toggle('on', v); vBtn.textContent = v ? 'Pause My Voice ⏸' : 'Play My Voice 🎙️';
  };
  const toggle = (a, other) => { if (a.paused) { other.pause(); a.play().catch(() => toast('Add your audio file to the audio/ folder 🎵')); } else a.pause(); };
  sBtn.onclick = e => { toggle(song, voice); fab.hidden = false; burstAt(e); };
  fab.onclick = () => toggle(song, voice);
  vBtn.onclick = () => toggle(voice, song);
  [song, voice].forEach(a => ['play', 'pause', 'ended'].forEach(ev => a.addEventListener(ev, setUI)));
}

/* ---------- letter, modal, secrets ---------- */
function initLetter() {
  const paper = $('#paper');
  paper.innerHTML = `<h3>My perfect dream (baby ji), ❤️</h3><p>Today, as we complete 5 beautiful months together, I just want to pause and say thank you.</p><p>There are so many things I'm grateful for about you, but if I had to choose just five...</p>` +
    REASONS.map(([t, b]) => `<h3>${t}</h3><p>${b}</p>`).join('') + LETTER_END.map(l => `<p>${l}</p>`).join('');
  $('#letterBtn').onclick = e => {
    $('#envelope').classList.add('open'); $('.letter-sec').classList.add('warm'); e.currentTarget.hidden = true;
    const r = $('#envelope').getBoundingClientRect(); burst(r.left + r.width / 2, r.top + 100, 18);
  };
}
function initModal() {
  const m = $('#modal'), seq = $('#modalSeq');
  $('#surpriseBtn').onclick = async e => {
    burstAt(e); m.hidden = false; const ps = buildLines(seq, SURPRISE); seq.dataset.run = Date.now(); const id = seq.dataset.run;
    for (const p of ps) { if (seq.dataset.run !== id) return; p.classList.add('show'); await sleep(3000); }
    await sleep(1500); if (seq.dataset.run === id) { m.hidden = true; const rv = $('#reveal'); rv.hidden = false; rv.scrollIntoView({ behavior: 'smooth' }); }
  };
  $('#modalClose').onclick = () => { seq.dataset.run = ''; m.hidden = true; const rv = $('#reveal'); rv.hidden = false; };
  $('#finalSecret').onclick = e => { toast('You found my secret. ❤️<br>Just like you found your way into my heart.', 6000); burstAt(e); };
}
function initSecrets() {
  const hosts = ['.hero', '.story', '.gallery', '.reasons', '.song'].map(s => $(s));
  SECRETS.forEach((msg, i) => {
    const h = el('button', 'secret', i % 2 ? '♡' : '❤'); h.setAttribute('aria-label', 'heart');
    h.style.left = (8 + Math.random() * 78) + '%'; h.style.top = (12 + Math.random() * 72) + '%';
    h.onclick = e => { toast(msg); burstAt(e); h.remove(); };
    hosts[i].appendChild(h);
  });
}

/* ---------- start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initSky(); initGate(); initSequences(); initStory(); initGallery(); initReasons();
  initInteractions(); initLists(); initAudio(); initLetter(); initModal(); initSecrets();
});
