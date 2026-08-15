(function(){
'use strict';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'Aa@123456';
const AUTH_KEY = 'corp_admin_auth';
const ART_KEY = 'corp_articles';

const DEFAULT_ARTICLES = [
  {id:1,title:'دليلك الشامل للإقرار الضريبي السنوي 2026',category:'ضرائب',status:'published',date:'2026-01-15',image:'',excerpt:'كل ما تحتاج معرفته عن مواعيد تقديم الإقرار الضريبي والمستندات المطلوبة وكيفية تجنب الأخطاء الشائعة.',content:'يُعد الإقرار الضريبي السنوي من أهم الالتزامات القانونية لكل ممول في مصر.\n\nأولاً: مواعيد التقديم\nتبدأ مهلة تقديم الإقرارات الضريبية للأشخاص الطبيعيين من أول يناير وحتى نهاية مارس من كل عام، بينما تمتد للأشخاص الاعتباريين حتى نهاية أبريل.\n\nثانياً: المستندات المطلوبة\n- صور من الفواتير والمستندات المؤيدة للإيرادات والمصروفات\n- كشف حساب بنكي\n- بيانات الأصول والإهلاكات\n\nثالثاً: نصائح لتجنب الأخطاء\nراجع جميع الأرقام قبل التقديم، وتأكد من خصم كل المصروفات المسموح بها قانوناً لتجنب الغرامات.'},
  {id:2,title:'خطوات التسجيل في منظومة الفاتورة الإلكترونية',category:'الفاتورة الإلكترونية',status:'published',date:'2026-01-08',image:'',excerpt:'دليل عملي شامل للتسجيل في منظومة الفاتورة والإيصال الإلكتروني وتفعيل الحساب وإصدار أول فاتورة.',content:'أصبحت منظومة الفاتورة الإلكترونية إلزامية لشرائح واسعة من الممولين.\n\nالخطوة الأولى: التسجيل على بوابة مصلحة الضرائب المصرية وتقديم طلب الانضمام للمنظومة.\n\nالخطوة الثانية: استلام بيانات التكامل وتثبيت التوقيع الإلكتروني.\n\nالخطوة الثالثة: تكويد السلع والخدمات وفق نظام GS1 أو الكود الداخلي.\n\nالخطوة الرابعة: إصدار أول فاتورة تجريبية ثم البدء في الإصدار الفعلي.'},
  {id:3,title:'أفضل شكل قانوني لشركتك الناشئة في 2026',category:'تأسيس شركات',status:'published',date:'2026-01-02',image:'',excerpt:'مقارنة شاملة بين أنواع الشركات ومزايا وعيوب كل نوع وفقاً لحجم نشاطك ورأس مالك.',content:'اختيار الشكل القانوني المناسب هو أول قرار استراتيجي لأي مشروع ناشئ.\n\nشركة الشخص الواحد: مثالية لرائد الأعمال المنفرد، ومسؤوليته محدودة برأس المال.\n\nالشركة ذات المسؤولية المحدودة: الأنسب للشركات الصغيرة والمتوسطة بحد أقصى 50 شريكاً.\n\nشركة المساهمة: مناسبة للمشاريع الكبيرة التي تحتاج لتمويل واسع.'},
  {id:4,title:'كيف تعد دراسة جدوى مشروع ناجحة؟',category:'دراسات جدوى',status:'published',date:'2025-12-28',image:'',excerpt:'الخطوات الأساسية لإعداد دراسة جدوى اقتصادية ومالية متكاملة تساعدك في الحصول على التمويل.',content:'دراسة الجدوى هي البوصلة التي تحدد مصير مشروعك قبل أن تبدأ.\n\n1. الدراسة السوقية: تحليل الطلب والمنافسين والسعر المتوقع.\n\n2. الدراسة الفنية: تحديد الموقع والمعدات والعمالة المطلوبة.\n\n3. الدراسة المالية: حساب التكاليف الاستثمارية والتشغيلية والإيرادات المتوقعة ومعدل العائد.\n\n4. التوصية النهائية: قرار المضي في المشروع أو تعديله أو التراجع عنه.'},
  {id:5,title:'خصومات ضريبية قد لا تعرفها لشركتك',category:'ضرائب',status:'published',date:'2025-12-20',image:'',excerpt:'قائمة بأهم المصروفات والخصومات الضريبية المسموح بها والتي تقلل وعاءك الضريبي بشكل قانوني.',content:'كثير من أصحاب الأعمال يفقدون مبالغ كبيرة لعدم معرفتهم بالخصومات المسموح بها.\n\nمن أهم الخصومات:\n- مرتبات وأجور الموظفين والتأمينات الاجتماعية\n- الإيجارات الخاصة بمقر النشاط\n- مصاريف الصيانة والتشغيل\n- الإهلاكات على الأصول\n- التبرعات للجهات المعتمدة في حدود النسب القانونية'},
  {id:6,title:'دليل المبتدئين في الاستيراد والتصدير 2026',category:'استيراد وتصدير',status:'published',date:'2025-12-15',image:'',excerpt:'كل ما تحتاج معرفته لبدء نشاط الاستيراد والتصدير: الإجراءات الجمركية والمستندات والضرائب.',content:'الدخول إلى عالم الاستيراد والتصدير يتطلب فهم الإجراءات والمتطلبات.\n\nأولاً: القيد في سجل المستوردين أو المصدرين.\n\nثانياً: استخراج البطاقة الاستيرادية وتحديد الفئة.\n\nثالثاً: التعرف على الرسوم الجمركية والضريبة على القيمة المضافة للسلع المستوردة.\n\nرابعاً: إعداد المستندات: الفاتورة التجارية، بوليصة الشحن، شهادة المنشأ.'}
];

const CAT_ICONS = {'ضرائب':'fa-file-invoice-dollar','الفاتورة الإلكترونية':'fa-receipt','تأسيس شركات':'fa-building-columns','دراسات جدوى':'fa-chart-line','استيراد وتصدير':'fa-ship','محاسبة':'fa-calculator','عام':'fa-newspaper'};

function getArticles(){
  let stored = [];
  try{ stored = JSON.parse(localStorage.getItem(ART_KEY) || '[]'); }catch(e){ stored = []; }
  const list = stored.length ? stored : DEFAULT_ARTICLES;
  return list.filter(a => a.status === 'published').sort((a,b) => new Date(b.date) - new Date(a.date));
}

function fmtDate(iso){
  try{ return new Date(iso).toLocaleDateString('ar-EG',{year:'numeric',month:'long',day:'numeric'}); }
  catch(e){ return iso; }
}

function articleCard(a){
  const icon = CAT_ICONS[a.category] || 'fa-newspaper';
  const thumb = a.image ? `<img src="${a.image}" alt="${a.title}" loading="lazy">` : `<div class="ph"><i class="fa-solid ${icon}"></i></div>`;
  return `<article class="article-card reveal">
    <div class="article-thumb">${thumb}</div>
    <div class="article-body">
      <div class="article-meta"><span class="tag">${a.category}</span><span><i class="fa-regular fa-calendar"></i> ${fmtDate(a.date)}</span></div>
      <h3><a href="articles.html#${a.id}">${a.title}</a></h3>
      <p class="article-ex">${a.excerpt}</p>
      <button class="article-more" data-open="${a.id}">اقرأ المزيد <i class="fa-solid fa-arrow-left"></i></button>
    </div>
  </article>`;
}

const homeGrid = document.getElementById('homeArticles');
if(homeGrid){
  homeGrid.innerHTML = getArticles().slice(0,3).map(articleCard).join('');
  observeReveals(homeGrid);
}

const fullGrid = document.getElementById('articlesGrid');
if(fullGrid){
  let allList = getArticles();
  let activeCat = 'الكل';
  let searchTerm = '';

  function renderList(){
    let list = allList;
    if(activeCat !== 'الكل') list = list.filter(a => a.category === activeCat);
    if(searchTerm) list = list.filter(a => (a.title + a.excerpt).includes(searchTerm));
    if(!list.length){
      fullGrid.innerHTML = `<div class="no-results" style="grid-column:1/-1"><i class="fa-regular fa-folder-open"></i><b>لا توجد مقالات مطابقة</b><span>جرّب كلمة بحث أخرى أو تصنيفاً مختلفاً</span></div>`;
    } else {
      fullGrid.innerHTML = list.map(articleCard).join('');
    }
    observeReveals(fullGrid);
    bindOpenButtons(fullGrid);
  }

  const catsWrap = document.getElementById('catFilters');
  if(catsWrap){
    const cats = ['الكل', ...new Set(allList.map(a => a.category))];
    catsWrap.innerHTML = cats.map(c => `<button class="cat-btn ${c==='الكل'?'active':''}" data-cat="${c}">${c}</button>`).join('');
    catsWrap.addEventListener('click', e => {
      const btn = e.target.closest('.cat-btn');
      if(!btn) return;
      activeCat = btn.dataset.cat;
      catsWrap.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b===btn));
      renderList();
    });
  }

  const searchInput = document.getElementById('articleSearch');
  if(searchInput){
    searchInput.addEventListener('input', () => { searchTerm = searchInput.value.trim(); renderList(); });
  }

  renderList();

  const hashId = parseInt(location.hash.replace('#',''), 10);
  if(hashId) setTimeout(() => openArticle(hashId, allList), 400);
}

function openArticle(id, list){
  const a = (list || getArticles()).find(x => x.id == id);
  if(!a) return;
  let modal = document.getElementById('articleModal');
  if(!modal){
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'articleModal';
    modal.innerHTML = `<div class="modal-box article-modal-box">
        <button class="modal-close" id="amClose"><i class="fa-solid fa-xmark"></i></button>
        <div id="amBody"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if(e.target === modal || e.target.closest('#amClose')) modal.classList.remove('show'); });
  }
  modal.querySelector('#amBody').innerHTML = `
    <span class="am-tag">${a.category}</span>
    <div class="am-date"><i class="fa-regular fa-calendar"></i> ${fmtDate(a.date)}</div>
    <h2>${a.title}</h2>
    ${a.image ? `<img src="${a.image}" alt="${a.title}" style="border-radius:14px;margin-bottom:18px;">` : ''}
    <div class="am-content">${a.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}</div>`;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function bindOpenButtons(scope){
  (scope || document).querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => openArticle(btn.dataset.open));
  });
}
bindOpenButtons();

const loginModal = document.getElementById('loginModal');
const openLoginBtns = document.querySelectorAll('[data-open-login]');
openLoginBtns.forEach(b => b.addEventListener('click', () => { loginModal.classList.add('show'); document.body.style.overflow='hidden'; }));
const closeLogin = document.getElementById('closeLoginBtn');
if(closeLogin) closeLogin.addEventListener('click', () => { loginModal.classList.remove('show'); document.body.style.overflow=''; });
if(loginModal) loginModal.addEventListener('click', e => { if(e.target === loginModal){ loginModal.classList.remove('show'); document.body.style.overflow=''; } });

const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('loginUser').value.trim();
    const p = document.getElementById('loginPass').value;
    const err = document.getElementById('loginError');
    if(u === ADMIN_USER && p === ADMIN_PASS){
      localStorage.setItem(AUTH_KEY, '1');
      err.textContent = '';
      window.location.href = 'admin.html';
    } else {
      err.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
    }
  });
}

const header = document.getElementById('siteHeader');
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  if(progress && docH > 0) progress.style.width = (y/docH*100) + '%';
  if(header) header.classList.toggle('scrolled', y > 40);
  if(toTop) toTop.classList.toggle('show', y > 550);
}, {passive:true});
if(toTop) toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open'); navLinks.classList.remove('open');
  }));
}

const cur = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links > a').forEach(a => {
  if(a.getAttribute('href') === cur) a.classList.add('active');
});

function observeReveals(scope){
  const els = (scope || document).querySelectorAll('.reveal,.reveal-l,.reveal-r');
  if(!('IntersectionObserver' in window)){ els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -30px 0px'});
  els.forEach(el => io.observe(el));
}
observeReveals();

const counters = document.querySelectorAll('.counter');
if(counters.length){
  const run = el => {
    const target = +el.dataset.target, dur = 1600; let start = null;
    const step = ts => {
      if(!start) start = ts;
      const p = Math.min((ts-start)/dur, 1);
      el.textContent = Math.round(target * (1-Math.pow(1-p,3))).toLocaleString('ar-EG');
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ run(en.target); io.unobserve(en.target); } }), {threshold:.5});
    counters.forEach(c => io.observe(c));
  } else counters.forEach(c => c.textContent = (+c.dataset.target).toLocaleString('ar-EG'));
}

const tTrack = document.getElementById('testiTrack');
const tDots = document.getElementById('testiDots');
if(tTrack && tDots){
  const dots = tDots.querySelectorAll('.testi-dot');
  let idx = 0, timer = null;
  const go = i => {
    idx = (i + dots.length) % dots.length;
    tTrack.style.transform = `translateX(${idx * 100}%)`;
    dots.forEach((d,di) => d.classList.toggle('active', di === idx));
  };
  const auto = () => { if(timer) clearInterval(timer); timer = setInterval(() => go(idx+1), 5500); };
  dots.forEach((d,i) => d.addEventListener('click', () => { go(i); auto(); }));
  auto();
}

const strip = document.querySelector('.strip-track');
if(strip) strip.innerHTML += strip.innerHTML;

document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  if(!btn || !ans) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('open');
      const a = el.querySelector('.faq-a'); if(a) a.style.maxHeight = '0';
    });
    if(!isOpen){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
  });
});

const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.querySelector('[name=name]').value;
    const phone = contactForm.querySelector('[name=phone]').value;
    const service = contactForm.querySelector('[name=service]').value;
    const msg = contactForm.querySelector('[name=msg]').value;
    const text = encodeURIComponent(`مرحباً، أنا ${name}\nرقم الهاتف: ${phone}\nالخدمة المطلوبة: ${service}\n\n${msg}`);
    window.open(`https://wa.me/201067777481?text=${text}`, '_blank');
    contactForm.reset();
    alert('شكراً لتواصلك! سيتم فتح واتساب لإرسال رسالتك مباشرة.');
  });
}

})();