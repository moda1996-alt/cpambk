/* =========================================================
   admin.js — منطق لوحة التحكم الكاملة
========================================================= */
(function(){
'use strict';

const AUTH_KEY = 'corp_admin_auth';
const ART_KEY  = 'corp_articles';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'Aa@123456';

const DEFAULT_ARTICLES = [
  {id:1, title:'دليلك الشامل للإقرار الضريبي السنوي 2026', category:'ضرائب', status:'published', date:'2026-01-15', image:'',
   excerpt:'كل ما تحتاج معرفته عن مواعيد تقديم الإقرار الضريبي والمستندات المطلوبة وكيفية تجنب الأخطاء الشائعة.',
   content:'يُعد الإقرار الضريبي السنوي من أهم الالتزامات القانونية لكل ممول في مصر.\n\nأولاً: مواعيد التقديم\nتبدأ مهلة تقديم الإقرارات الضريبية للأشخاص الطبيعيين من أول يناير وحتى نهاية مارس من كل عام، بينما تمتد للأشخاص الاعتباريين حتى نهاية أبريل.\n\nثانياً: المستندات المطلوبة\n- صور من الفواتير والمستندات المؤيدة للإيرادات والمصروفات\n- كشف حساب بنكي\n- بيانات الأصول والإهلاكات\n\nثالثاً: نصائح لتجنب الأخطاء\nراجع جميع الأرقام قبل التقديم، وتأكد من خصم كل المصروفات المسموح بها قانوناً لتجنب الغرامات.'},
  {id:2, title:'خطوات التسجيل في منظومة الفاتورة الإلكترونية', category:'الفاتورة الإلكترونية', status:'published', date:'2026-01-08', image:'',
   excerpt:'دليل عملي شامل للتسجيل في منظومة الفاتورة والإيصال الإلكتروني وتفعيل الحساب وإصدار أول فاتورة.',
   content:'أصبحت منظومة الفاتورة الإلكترونية إلزامية لشرائح واسعة من الممولين.\n\nالخطوة الأولى: التسجيل على بوابة مصلحة الضرائب المصرية وتقديم طلب الانضمام للمنظومة.\n\nالخطوة الثانية: استلام بيانات التكامل وتثبيت التوقيع الإلكتروني.\n\nالخطوة الثالثة: تكويد السلع والخدمات وفق نظام GS1 أو الكود الداخلي.\n\nالخطوة الرابعة: إصدار أول فاتورة تجريبية ثم البدء في الإصدار الفعلي.\n\nنساعدك في كل هذه الخطوات من الألف إلى الياء.'},
  {id:3, title:'أفضل شكل قانوني لشركتك الناشئة في 2026', category:'تأسيس شركات', status:'published', date:'2026-01-02', image:'',
   excerpt:'مقارنة شاملة بين أنواع الشركات ومزايا وعيوب كل نوع وفقاً لحجم نشاطك ورأس مالك.',
   content:'اختيار الشكل القانوني المناسب هو أول قرار استراتيجي لأي مشروع ناشئ.\n\nشركة الشخص الواحد: مثالية لرائد الأعمال المنفرد، ومسؤوليته محدودة برأس المال.\n\nالشركة ذات المسؤولية المحدودة: الأنسب للشركات الصغيرة والمتوسطة بحد أقصى 50 شريكاً.\n\nشركة المساهمة: مناسبة للمشاريع الكبيرة التي تحتاج لتمويل واسع.\n\nنساعدك في اختيار الشكل الأنسب لنشاطك وإنهاء كل إجراءات التأسيس.'},
  {id:4, title:'كيف تعد دراسة جدوى مشروع ناجحة؟', category:'دراسات جدوى', status:'published', date:'2025-12-28', image:'',
   excerpt:'الخطوات الأساسية لإعداد دراسة جدوى اقتصادية ومالية متكاملة تساعدك في الحصول على التمويل.',
   content:'دراسة الجدوى هي البوصلة التي تحدد مصير مشروعك قبل أن تبدأ.\n\n1. الدراسة السوقية: تحليل الطلب والمنافسين والسعر المتوقع.\n\n2. الدراسة الفنية: تحديد الموقع والمعدات والعمالة المطلوبة.\n\n3. الدراسة المالية: حساب التكاليف الاستثمارية والتشغيلية والإيرادات المتوقعة ومعدل العائد.\n\n4. التوصية النهائية: قرار المضي في المشروع أو تعديله أو التراجع عنه.\n\nأعددنا مئات دراسات الجدوى التي حصلت على تمويل بنكي ناجح.'},
  {id:5, title:'خصومات ضريبية قد لا تعرفها لشركتك', category:'ضرائب', status:'published', date:'2025-12-20', image:'',
   excerpt:'قائمة بأهم المصروفات والخصومات الضريبية المسموح بها والتي تقلل وعاءك الضريبي بشكل قانوني.',
   content:'كثير من أصحاب الأعمال يفقدون مبالغ كبيرة لعدم معرفتهم بالخصومات المسموح بها.\n\nمن أهم الخصومات:\n- مرتبات وأجور الموظفين والتأمينات الاجتماعية\n- الإيجارات الخاصة بمقر النشاط\n- مصاريف الصيانة والتشغيل\n- الإهلاكات على الأصول\n- التبرعات للجهات المعتمدة في حدود النسب القانونية\n\nالتخطيط الضريبي السليم يوفر لك مبالغ كبيرة بشكل قانوني تماماً.'},
  {id:6, title:'دليل المبتدئين في الاستيراد والتصدير 2026', category:'استيراد وتصدير', status:'published', date:'2025-12-15', image:'',
   excerpt:'كل ما تحتاج معرفته لبدء نشاط الاستيراد والتصدير: الإجراءات الجمركية والمستندات والضرائب.',
   content:'الدخول إلى عالم الاستيراد والتصدير يتطلب فهم الإجراءات والمتطلبات.\n\nأولاً: القيد في سجل المستوردين أو المصدرين.\n\nثانياً: استخراج البطاقة الاستيرادية وتحديد الفئة.\n\nثالثاً: التعرف على الرسوم الجمركية والضريبة على القيمة المضافة للسلع المستوردة.\n\nرابعاً: إعداد المستندات: الفاتورة التجارية، بوليصة الشحن، شهادة المنشأ.\n\nنقدم استشارات جمركية وضريبية متكاملة لكل عملياتك الدولية.'}
];

/* ---------- المصادقة ---------- */
const loginScreen = document.getElementById('adminLogin');
const appScreen = document.getElementById('adminApp');

function isAuthed(){ return localStorage.getItem(AUTH_KEY) === '1'; }
function showApp(){
  loginScreen.style.display = 'none';
  appScreen.classList.add('show');
  refreshAll();
}
function showLogin(){
  appScreen.classList.remove('show');
  loginScreen.style.display = 'flex';
}

if(isAuthed()) showApp(); else showLogin();

document.getElementById('adminLoginForm').addEventListener('submit', e => {
  e.preventDefault();
  const u = document.getElementById('alUser').value.trim();
  const p = document.getElementById('alPass').value;
  const err = document.getElementById('alError');
  if(u === ADMIN_USER && p === ADMIN_PASS){
    localStorage.setItem(AUTH_KEY, '1');
    err.textContent = '';
    showApp();
    toast('مرحباً بك في لوحة التحكم 👋');
  } else {
    err.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem(AUTH_KEY);
  showLogin();
});

/* ---------- إدارة المقالات ---------- */
function loadArticles(){
  let list = [];
  try{ list = JSON.parse(localStorage.getItem(ART_KEY) || '[]'); }catch(e){ list = []; }
  if(!list.length){ list = DEFAULT_ARTICLES.slice(); saveArticles(list); }
  return list;
}
function saveArticles(list){ localStorage.setItem(ART_KEY, JSON.stringify(list)); }
function fmtDate(iso){
  try{ return new Date(iso).toLocaleDateString('ar-EG',{year:'numeric',month:'long',day:'numeric'}); }catch(e){ return iso; }
}
function esc(s){ const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/* ---------- التنقل بين العروض ---------- */
const titles = {dashboard:'الرئيسية', list:'إدارة المقالات', editor:'محرر المقالات'};
function switchView(name){
  document.querySelectorAll('.admin-view').forEach(v => v.style.display = 'none');
  document.getElementById('view-' + name).style.display = 'block';
  document.getElementById('viewTitle').textContent = titles[name] || '';
  document.querySelectorAll('.sb-item[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === name));
  closeSidebar();
  if(name === 'dashboard') renderDashboard();
  if(name === 'list') renderTable();
  if(name === 'editor' && !document.getElementById('editId').value) resetForm();
}
document.querySelectorAll('[data-view]').forEach(b => {
  b.addEventListener('click', () => switchView(b.dataset.view));
});

/* ---------- الرئيسية ---------- */
function renderDashboard(){
  const list = loadArticles();
  const pub = list.filter(a => a.status === 'published');
  const drafts = list.filter(a => a.status === 'draft');
  const cats = new Set(list.map(a => a.category));
  document.getElementById('statTotal').textContent = list.length.toLocaleString('ar-EG');
  document.getElementById('statPub').textContent = pub.length.toLocaleString('ar-EG');
  document.getElementById('statDraft').textContent = drafts.length.toLocaleString('ar-EG');
  document.getElementById('statCats').textContent = cats.size.toLocaleString('ar-EG');

  const recent = list.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,5);
  document.getElementById('recentBody').innerHTML = recent.map(a => `
    <tr>
      <td class="td-title"><b>${esc(a.title)}</b></td>
      <td><span class="badge cat">${esc(a.category)}</span></td>
      <td><span class="badge ${a.status==='published'?'pub':'draft'}">${a.status==='published'?'منشور':'مسودة'}</span></td>
      <td>${fmtDate(a.date)}</td>
    </tr>`).join('');
}

/* ---------- جدول المقالات ---------- */
function renderTable(){
  const list = loadArticles().sort((a,b) => new Date(b.date) - new Date(a.date));
  document.getElementById('listCount').textContent = list.length.toLocaleString('ar-EG');
  const body = document.getElementById('articlesBody');
  if(!list.length){
    body.innerHTML = `<tr><td colspan="5"><div class="empty-state"><i class="fa-regular fa-folder-open"></i>لا توجد مقالات بعد</div></td></tr>`;
    return;
  }
  body.innerHTML = list.map(a => `
    <tr>
      <td class="td-title"><b>${esc(a.title)}</b><span>${esc(a.excerpt)}</span></td>
      <td><span class="badge cat">${esc(a.category)}</span></td>
      <td><span class="badge ${a.status==='published'?'pub':'draft'}">${a.status==='published'?'منشور':'مسودة'}</span></td>
      <td>${fmtDate(a.date)}</td>
      <td>
        <div class="td-actions">
          <button class="act-btn edit" data-edit="${a.id}" title="تعديل"><i class="fa-solid fa-pen"></i></button>
          <button class="act-btn view" data-preview="${a.id}" title="معاينة"><i class="fa-solid fa-eye"></i></button>
          <button class="act-btn del" data-del="${a.id}" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');

  body.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openEditor(+b.dataset.edit)));
  body.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => delArticle(+b.dataset.del)));
  body.querySelectorAll('[data-preview]').forEach(b => b.addEventListener('click', () => window.open('articles.html#' + b.dataset.preview, '_blank')));
}

/* ---------- المحرر ---------- */
function resetForm(){
  document.getElementById('articleForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('fDate').value = new Date().toISOString().slice(0,10);
  document.getElementById('submitLabel').textContent = 'نشر المقال';
  updateImgPreview();
}
function openEditor(id){
  const a = loadArticles().find(x => x.id === id);
  if(!a) return;
  document.getElementById('editId').value = a.id;
  document.getElementById('fTitle').value = a.title;
  document.getElementById('fExcerpt').value = a.excerpt;
  document.getElementById('fContent').value = a.content;
  document.getElementById('fCategory').value = a.category;
  document.getElementById('fStatus').value = a.status;
  document.getElementById('fDate').value = a.date;
  document.getElementById('fImage').value = a.image || '';
  document.getElementById('submitLabel').textContent = 'حفظ التعديلات';
  updateImgPreview();
  switchView('editor');
}

document.getElementById('articleForm').addEventListener('submit', e => {
  e.preventDefault();
  const list = loadArticles();
  const idVal = document.getElementById('editId').value;
  const data = {
    title: document.getElementById('fTitle').value.trim(),
    excerpt: document.getElementById('fExcerpt').value.trim(),
    content: document.getElementById('fContent').value.trim(),
    category: document.getElementById('fCategory').value,
    status: document.getElementById('fStatus').value,
    date: document.getElementById('fDate').value || new Date().toISOString().slice(0,10),
    image: document.getElementById('fImage').value.trim()
  };
  if(idVal){
    const idx = list.findIndex(x => x.id == idVal);
    if(idx > -1) list[idx] = {...list[idx], ...data};
    toast('تم حفظ التعديلات بنجاح ✔');
  } else {
    data.id = Date.now();
    list.push(data);
    toast(data.status === 'published' ? 'تم نشر المقال بنجاح 🎉' : 'تم حفظ المقال كمسودة');
  }
  saveArticles(list);
  resetForm();
  switchView('list');
});

function delArticle(id){
  if(!confirm('هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذه العملية.')) return;
  const list = loadArticles().filter(a => a.id !== id);
  saveArticles(list);
  renderTable();
  renderDashboard();
  toast('تم حذف المقال');
}

/* معاينة الصورة */
const fImage = document.getElementById('fImage');
function updateImgPreview(){
  const box = document.getElementById('imgPreview');
  const url = fImage.value.trim();
  if(url){
    box.innerHTML = `<img src="${url}" alt="معاينة" onerror="this.parentNode.innerHTML='<i class=\\'fa-solid fa-triangle-exclamation\\'></i> الرابط غير صالح'">`;
  } else {
    box.innerHTML = '<i class="fa-regular fa-image"></i> معاينة الصورة';
  }
}
fImage.addEventListener('input', updateImgPreview);

/* ---------- التنبيهات ---------- */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ---------- القائمة الجانبية للموبايل ---------- */
const sidebar = document.getElementById('sidebar');
const sbOverlay = document.getElementById('sbOverlay');
function closeSidebar(){ sidebar.classList.remove('open'); sbOverlay.classList.remove('show'); }
document.getElementById('sbToggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sbOverlay.classList.toggle('show');
});
sbOverlay.addEventListener('click', closeSidebar);

function refreshAll(){ renderDashboard(); renderTable(); }

})();