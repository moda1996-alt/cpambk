/* ============== قائمة الموبايل ============== */
const Nav_links = document.querySelector('.nav_links');
function Open_CloseMenu(){
  Nav_links.classList.toggle("active");
}

/* ============== إغلاق القائمة عند النقر على رابط ============== */
document.querySelectorAll('.nav_links a').forEach(link => {
  link.addEventListener('click', () => {
    if (Nav_links.classList.contains('active')) {
      Nav_links.classList.remove('active');
    }
  });
});

/* ============== زر العودة للأعلى ============== */
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    toTopBtn.classList.add('show');
  } else {
    toTopBtn.classList.remove('show');
  }
});
toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============== تمرير سلس ============== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============== أكورديون الأسئلة الشائعة ============== */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    // إغلاق الكل
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = '0';
    });

    // فتح العنصر إذا كان مغلقاً
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ============== مضاعفة شريط القطاعات للحركة اللانهائية ============== */
const marquee = document.querySelector('.marquee-track');
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}

/* ============== عدادات الإحصائيات ============== */
const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString('ar-EG');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
} else {
  counters.forEach(c => {
    c.textContent = parseInt(c.dataset.target, 10).toLocaleString('ar-EG');
  });
}

/* ============== تأثير ظهور عند التمرير ============== */
const revealElements = document.querySelectorAll('.svc-card, .step, .faq-item, .why-text, .stats-panel, .section-head, .hero .information, .hero .div_img');
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});

if ('IntersectionObserver' in window) {
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealIO.observe(el));
} else {
  revealElements.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}