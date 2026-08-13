(function(){
  'use strict';

  // ============== شريط تقدم القراءة ==============
  const progress = document.getElementById('scrollProgress');

  // ============== الهيدر (ينكمش عند التمرير) ==============
  const header = document.getElementById('siteHeader');
  const toTop = document.getElementById('toTop');

  function onScroll(){
    const y = window.scrollY || window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    if (progress && docH > 0) progress.style.width = (y / docH * 100) + '%';
    if (header) header.classList.toggle('scrolled', y > 70);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  if (toTop){
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ============== قائمة الجوال ==============
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menuOverlay');

  function closeMenu(){
    if (navToggle) navToggle.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  if (navToggle && mobileMenu){
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      if (overlay) overlay.classList.toggle('show', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
    if (overlay) overlay.addEventListener('click', closeMenu);
  }

  // ============== الكلمة المتغيرة (Hero) ==============
  const rotator = document.getElementById('wordRotator');
  if (rotator){
    const words = ['تأسيس شركتك', 'إقراراتك الضريبية', 'مراجعة حساباتك', 'دراسة جدوى مشروعك', 'الفاتورة الإلكترونية'];
    let wi = 0;
    setInterval(() => {
      wi = (wi + 1) % words.length;
      rotator.classList.remove('swap');
      void rotator.offsetWidth;
      rotator.textContent = words[wi];
      rotator.classList.add('swap');
    }, 2800);
  }

  // ============== الشبكة العصبية التفاعلية ==============
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('neuralCanvas');
  if (canvas && !reduceMotion){
    const ctx = canvas.getContext('2d');
    const heroEl = canvas.parentElement;
    let nodes = [];
    let mouse = { x: -99999, y: -99999 };
    const LINK = 160, CUT = 130;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function buildNodes(){
      const area = canvas.clientWidth * canvas.clientHeight;
      const count = Math.max(30, Math.min(90, Math.round(area / 16000)));
      nodes = [];
      for (let i = 0; i < count; i++){
        nodes.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: (Math.random() - .5) * .45,
          vy: (Math.random() - .5) * .45,
          r: 1.4 + Math.random() * 1.8
        });
      }
    }
    function resize(){
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }
    resize();
    window.addEventListener('resize', resize);

    heroEl.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroEl.addEventListener('mouseleave', () => { mouse.x = -99999; mouse.y = -99999; });

    function frame(){
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      let i, j, a, b, dx, dy, dist;

      for (i = 0; i < nodes.length; i++){
        a = nodes[i];
        dx = a.x - mouse.x; dy = a.y - mouse.y;
        dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < CUT && dist > 0.001){
          const push = (CUT - dist) / CUT * .6;
          a.vx += dx / dist * push * .12;
          a.vy += dy / dist * push * .12;
        }
        a.vx *= .985; a.vy *= .985;
        if (Math.abs(a.vx) < .08) a.vx += (Math.random() - .5) * .05;
        if (Math.abs(a.vy) < .08) a.vy += (Math.random() - .5) * .05;
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = w + 20; else if (a.x > w + 20) a.x = -20;
        if (a.y < -20) a.y = h + 20; else if (a.y > h + 20) a.y = -20;
      }

      for (i = 0; i < nodes.length; i++){
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++){
          b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y;
          dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > LINK) continue;
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const mDist = Math.sqrt((mx - mouse.x)**2 + (my - mouse.y)**2);
          if (mDist < CUT) continue;
          const alpha = (1 - dist / LINK) * .5;
          if (mDist < CUT + 60){
            ctx.strokeStyle = 'rgba(243,217,142,' + Math.min(alpha + .35, .9) + ')';
            ctx.lineWidth = 1.2;
          } else {
            ctx.strokeStyle = 'rgba(212,166,46,' + alpha + ')';
            ctx.lineWidth = .8;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (i = 0; i < nodes.length; i++){
        a = nodes[i];
        dx = a.x - mouse.x; dy = a.y - mouse.y;
        dist = Math.sqrt(dx*dx + dy*dy);
        const near = dist < CUT + 40;
        ctx.beginPath();
        ctx.arc(a.x, a.y, near ? a.r * 1.6 : a.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? 'rgba(243,217,142,.95)' : 'rgba(212,166,46,.6)';
        ctx.fill();
        if (near){
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r * 3.2, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(243,217,142,.25)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ============== مؤشر الماوس المطاطي ==============
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches){
    document.documentElement.classList.add('has-cursor');
    document.body.classList.add('has-cursor');
    const ball = document.createElement('div');
    ball.className = 'cursor-ball';
    document.body.appendChild(ball);

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let bx = tx, by = ty, bvx = 0, bvy = 0;
    const STIFF = .16, DAMP = .74;

    document.addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY;
      ball.classList.add('visible');
    });
    document.addEventListener('mouseleave', () => ball.classList.remove('visible'));
    document.addEventListener('mouseover', e => {
      if (e.target.closest && e.target.closest('a, button, .faq-q')) ball.classList.add('grow');
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest && e.target.closest('a, button, .faq-q')) ball.classList.remove('grow');
    });

    (function spring(){
      bvx += (tx - bx) * STIFF;  bvx *= DAMP;  bx += bvx;
      bvy += (ty - by) * STIFF;  bvy *= DAMP;  by += bvy;
      const speed = Math.min(Math.sqrt(bvx*bvx + bvy*bvy) / 30, .45);
      const ang = Math.atan2(bvy, bvx);
      ball.style.transform =
        'translate(' + bx + 'px,' + by + 'px) translate(-50%,-50%) ' +
        'rotate(' + ang + 'rad) scale(' + (1 + speed) + ',' + (1 - speed) + ')';
      requestAnimationFrame(spring);
    })();
  }

  // ============== مضاعفة شريط القطاعات ==============
  const marquee = document.querySelector('.marquee-track');
  if (marquee) marquee.innerHTML += marquee.innerHTML;

  // ============== حركات الظهور ==============
  const reveals = document.querySelectorAll('.reveal, .reveal-r, .reveal-l');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(r => io.observe(r));
  } else {
    reveals.forEach(r => r.classList.add('in'));
  }

  // ============== عدادات الإحصائيات ==============
  const counters = document.querySelectorAll('.counter');
  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const dur = 1600;
    let start = null;
    function step(ts){
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('ar-EG');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length){
    const cio = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cio.observe(c));
  } else {
    counters.forEach(c => {
      c.textContent = (parseInt(c.getAttribute('data-target'), 10) || 0).toLocaleString('ar-EG');
    });
  }

  // ============== أكورديون الأسئلة الشائعة ==============
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        const a = el.querySelector('.faq-a');
        if (a) a.style.maxHeight = '0';
      });
      if (!isOpen){
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // ============== تمييز الصفحة الحالية في القائمة ==============
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

})();
