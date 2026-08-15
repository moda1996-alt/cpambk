/* =========================================================
   extras.js — نسخة مُصلحة: صفحات خدمات غنية + تثبيت التطبيق
========================================================= */
(function(){
'use strict';

if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

/* ---------- إظهار العناصر المحقونة (إصلاح الصفحة الفارغة) ---------- */
function revealIn(scope){
  const els = (scope||document).querySelectorAll('.reveal,.reveal-l,.reveal-r');
  if(!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('in')); return; }
  const io = new IntersectionObserver(es=>{
    es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{threshold:.08, rootMargin:'0px 0px -20px 0px'});
  els.forEach(el=>io.observe(el));
}

/* ---------- ربط أكورديون الأسئلة للمحتوى المحقون ---------- */
function bindFaq(scope){
  (scope||document).querySelectorAll('.faq-item').forEach(item=>{
    const btn=item.querySelector('.faq-q'), ans=item.querySelector('.faq-a');
    if(!btn||!ans||btn.dataset.bound) return;
    btn.dataset.bound='1';
    btn.addEventListener('click',()=>{
      const open=item.classList.contains('open');
      (scope||document).querySelectorAll('.faq-item').forEach(el=>{
        el.classList.remove('open');
        const a=el.querySelector('.faq-a'); if(a)a.style.maxHeight='0';
      });
      if(!open){ item.classList.add('open'); ans.style.maxHeight=ans.scrollHeight+'px'; }
    });
  });
}

/* ---------- بانر تثبيت التطبيق (محسّن لكل الهواتف) ---------- */
let deferredPrompt=null;
const banner=document.createElement('div');
banner.className='install-banner';
banner.innerHTML=`<div class="container ib-inner">
  <div class="ib-icon"><i class="fa-solid fa-mobile-screen-button"></i></div>
  <div class="ib-text"><b>ثبّت تطبيق محمود الباز قابيل</b><span>تجربة أسرع تعمل بدون إنترنت مثل تطبيقات الهاتف</span></div>
  <div class="ib-actions">
    <button class="btn btn-navy ib-install" type="button"><i class="fa-solid fa-download"></i> تثبيت الآن</button>
    <button class="ib-later" type="button">لاحقاً</button>
  </div>
</div>`;
document.body.appendChild(banner);

function showBanner(){ if(!localStorage.getItem('ib_dismiss')) banner.classList.add('show'); }

window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferredPrompt=e; showBanner(); });

/* iPhone وأندرويد بدون حدث التثبيت: أظهر البانر مع شرح التثبيت */
setTimeout(()=>{ if(!deferredPrompt && /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)) showBanner(); }, 3500);

banner.querySelector('.ib-install').addEventListener('click', async ()=>{
  if(deferredPrompt){
    banner.classList.remove('show');
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt=null;
  }else{
    const ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);
    alert(ios
      ? 'للتثبيت على iPhone:\n1. اضغط زر المشاركة في Safari\n2. اختر "إضافة إلى الشاشة الرئيسية"\n3. اضغط إضافة'
      : 'للتثبيت على Android:\n1. افتح قائمة المتصفح (⋮)\n2. اختر "إضافة إلى الشاشة الرئيسية" أو "تثبيت التطبيق"\n3. أكّد التثبيت');
  }
});
banner.querySelector('.ib-later').addEventListener('click', ()=>{ banner.classList.remove('show'); localStorage.setItem('ib_dismiss','1'); });
window.addEventListener('appinstalled', ()=> banner.classList.remove('show'));

/* ---------- بيانات الخدمات الغنية (تفاصيل + صور) ---------- */
const SERVICES=[
{id:'setup',icon:'fa-building-columns',title:'تأسيس الشركات',
 img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=60'],
 intro:'نؤسس شركتك من الفكرة حتى الاستلام الكامل لجميع التراخيص، لتبدأ نشاطك على أساس قانوني وضريبي سليم.',
 desc:['نتولى عنك كامل إجراءات تأسيس جميع أنواع الشركات في مصر: شركة الشخص الواحد، التضامن، التوصية بالأسهم، ذات المسؤولية المحدودة، والمساهمة. نبدأ باختيار الشكل القانوني الأنسب لطبيعة نشاطك ورأس مالك، ثم نعدّ العقود والنظم الأساسية ونسجلها بالشهر العقاري وهيئة الاستثمار.','نُنهي السجل التجاري والبطاقة الضريبية والتسجيل في منظومة الفاتورة الإلكترونية والتأمينات، ونسلّمك ملفاً كاملاً جاهزاً لمباشرة النشاط دون أي معوقات.'],
 features:['اختيار الشكل القانوني المناسب','إعداد العقود والنظام الأساسي','استخراج السجل التجاري','إصدار البطاقة الضريبية','التسجيل بالفاتورة الإلكترونية','التسجيل في التأمينات الاجتماعية'],
 docs:['صور بطاقات الشركاء','عقد إيجار أو ملكية موثق','تحديد اسم الشركة ونشاطها','إثبات رأس المال المدفوع','توكيل رسمي لإنهاء الإجراءات'],
 audience:['رواد الأعمال والشركات الناشئة','المستثمرون ورجال الأعمال','الشركات الأجنبية الداخلة للسوق المصري'],
 faq:[['كم يستغرق تأسيس الشركة؟','عادة من 7 إلى 15 يوم عمل حسب نوع الشركة والجهات المختصة.'],['ما أفضل نوع شركة لمشروع صغير؟','شركة الشخص الواحد أو ذات المسؤولية المحدودة الأنسب غالباً لمحدودية المسؤولية وسهولة الإجراءات.']],
 steps:[['دراسة النشاط','تحديد الشكل القانوني ورأس المال المناسب'],['إعداد المستندات','صياغة العقود والأنظمة الأساسية'],['التنفيذ','إنهاء الإجراءات لدى الجهات الرسمية'],['التسليم','تسليم ملف كامل جاهز لمباشرة النشاط']]},
{id:'tax',icon:'fa-file-invoice-dollar',title:'ضرائب الدخل والقيمة المضافة',
 img:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=700&q=60'],
 intro:'إدارة كاملة لالتزاماتك الضريبية بدقة وفي المواعيد، مع أفضل وضع ضريبي يحققه التخطيط السليم.',
 desc:['نُعدّ ونقدّم جميع الإقرارات الضريبية: إقرار ضريبة الدخل السنوي للأشخاص الطبيعيين والاعتباريين، وإقرارات ضريبة القيمة المضافة الشهرية، وإقرارات الخصم والتحصيل تحت حساب الضريبة، ومرتبات كسب العمل.','نمثّلك أمام مأموريات الضرائب في الفحص والمنازعات ولجان الطعن، ونضع لك خطة تخطيط ضريبي قانونية تقلل الأعباء وتتجنب الغرامات.'],
 features:['إقرارات ضريبة الدخل','إقرارات القيمة المضافة الشهرية','إقرارات الخصم والتحصيل','ضريبة المرتبات كسب العمل','التمثيل أمام الفحص الضريبي','حل المنازعات ولجان الطعن'],
 docs:['السجل التجاري والبطاقة الضريبية','الفواتير وعقود البيع والشراء','كشوف حسابات بنكية','سجلات الرواتب والمصروفات'],
 audience:['الشركات التجارية والصناعية','أصحاب المهن الحرة والأطباء','الملاك والمستثمرون'],
 faq:[['ما مواعيد تقديم الإقرار الضريبي؟','الأشخاص الطبيعيون حتى نهاية مارس، والشركات حتى نهاية أبريل من كل عام.'],['هل تتولون المنازعات الضريبية؟','نعم، نمثلك أمام لجان الطعن والمحاكم حتى إغلاق الملف نهائياً.']],
 steps:[['مراجعة المستندات','فحص الدفاتر والفواتير والعقود'],['الإعداد','حساب الوعاء الضريبي بدقة'],['التقديم','إرسال الإقرارات إلكترونياً في المواعيد'],['المتابعة','مرافقتك في الفحص حتى الإغلاق النهائي']]},
{id:'import',icon:'fa-ship',title:'الاستيراد والتصدير',
 img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=60'],
 intro:'استشارات جمركية وضريبية متكاملة تجعل عملياتك الدولية أسهل وأسرع وأقل تكلفة.',
 desc:['نساعد الشركات المستوردة والمصدرة في كل جوانب التعاملات الدولية: القيد في سجل المستوردين والمصدرين، استخراج البطاقة الاستيرادية، تحديد البنود الجمركية والرسوم المستحقة، ومتطلبات البنوك ومستندات التحصيل والمستندي.','نقدم دراسات عن التكلفة الاستيرادية الكاملة قبل التعاقد، ونعالج المشكلات الجمركية والضريبية التي تواجه الشحنات.'],
 features:['القيد في سجل المستوردين','استخراج البطاقة الاستيرادية','تحديد البنود والرسوم الجمركية','حساب التكلفة الاستيرادية الكاملة','مستندات التحصيل والمستندي','معالجة المشكلات الجمركية'],
 docs:['بطاقة القيد في سجل المستوردين','البطاقة الاستيرادية','الفاتورة التجارية وبوليصة الشحن','شهادة المنشأ'],
 audience:['شركات الاستيراد والتصدير','المصانع المستوردة للخامات','المصدّرون للأسواق الخارجية'],
 faq:[['هل تحسبون التكلفة الاستيرادية الكاملة؟','نعم، نعد دراسة تكلفة شاملة تشمل الجمارك والضرائب والنولون قبل التعاقد.'],['هل تتولون المشكلات الجمركية؟','نعم، نعالج المنازعات وطلبات الإعفاءات.']],
 steps:[['دراسة العملية','تحليل الصفقة والسلعة والبنود'],['التجهيز','إعداد المستندات والمتطلبات'],['المتابعة','مرافقة الشحنة إجرائياً'],['الإغلاق','تسوية الموقف الجمركي والضريبي']]},
{id:'feasibility',icon:'fa-chart-line',title:'دراسات الجدوى الشاملة',
 img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=60'],
 intro:'دراسات جدوى علمية متكاملة تمنحك قراراً استثمارياً واثقاً وتفتح لك أبواب التمويل البنكي.',
 desc:['نُعدّ دراسات جدوى شاملة (سوقية، فنية، مالية، قانونية، بيئية) وفق منهجيات معتمدة لدى البنوك وجهات التمويل. تشمل تحليل السوق والمنافسين، وتحديد الطاقة الإنتاجية والمعدات والعمالة، وحساب التكاليف الاستثمارية والتشغيلية والإيرادات المتوقعة.','نخرج بمؤشرات مالية حاسمة: صافي القيمة الحالية NPV، معدل العائد الداخلي IRR، فترة الاسترداد، ونقطة التعادل، مع تقرير نهائي مصاغ باحترافية للعرض على الممولين.'],
 features:['دراسة السوق والمنافسين','الدراسة الفنية والهندسية','الدراسة المالية والتدفقات','مؤشرات NPV و IRR','تحليل الحساسية والمخاطر','صياغة نهائية للبنوك والممولين'],
 docs:['فكرة المشروع وبياناته الأولية','بيانات السوق والمنافسين','التكاليف المتوقعة ومصادر التمويل','الموقع والمتطلبات الفنية'],
 audience:['مستثمرون يبحثون عن تمويل بنكي','رواد أعمال يطلقون مشروعاً جديداً','شركات تخطط للتوسع'],
 faq:[['كم تستغرق دراسة الجدوى؟','من 10 إلى 20 يوماً حسب حجم المشروع وتعقيده.'],['هل الدراسة مقبولة لدى البنوك؟','نعم، تُعد وفق منهجيات معتمدة لدى البنوك وجهات التمويل.']],
 steps:[['جمع البيانات','دراسة السوق والافتراضات'],['النمذجة المالية','بناء التدفقات والمؤشرات'],['التقييم','تحليل الحساسية والمخاطر'],['التقرير','تسليم دراسة جاهزة للتمويل']]},
{id:'audit',icon:'fa-magnifying-glass-chart',title:'مراجعة الحسابات',
 img:'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=60'],
 intro:'مراجعة قانونية مستقلة تمنح قوائمك المالية مصداقية أمام البنوك والجهات الرسمية والشركاء.',
 desc:['نقوم بالمراجعة القانونية للقوائم المالية وفق معايير المراجعة المصرية والدولية: التخطيط وفهم المنشأة وتقييم المخاطر، اختبارات الرقابة الداخلية، الإجراءات الجوهرية والتحليلية، والحصول على أدلة كافية ومناسبة.','نصدر تقرير المراجع القانوني المستقل مرفقاً به القوائم المالية المعتمدة، مع خطاب توصيات إدارية يعالج نقاط الضعف في الرقابة الداخلية.'],
 features:['التخطيط وتقييم المخاطر','اختبار الرقابة الداخلية','الإجراءات الجوهرية والتحليلية','تأكيدات خارجية للأرصدة','تقرير مراجع قانوني معتمد','خطاب توصيات إدارية'],
 docs:['ميزان المراجعة والدفاتر','تأكيدات البنوك والعملاء','العقود والمستندات المؤيدة','تقارير الفترات السابقة'],
 audience:['شركات يلزمها مراجعة قانونية','جهات تطلب تمويلًا بنكياً','شركاء ومستثمرون'],
 faq:[['هل تصدر تقرير مراجع معتمد؟','نعم، تقرير رسمي موقع من محاسب قانوني معتمد.'],['كم تستغرق المراجعة؟','من أسبوعين إلى 4 أسابيع حسب حجم العمليات.']],
 steps:[['التخطيط','فهم المنشأة وتحديد الأهمية النسبية'],['الاختبارات','فحص الرقابة والإجراءات الجوهرية'],['الإثبات','جمع أدلة المراجعة الكافية'],['التقرير','إصدار الرأي المعتمد']]},
{id:'reports',icon:'fa-file-signature',title:'اعتماد التقارير المالية',
 img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=60'],
 intro:'قوائم وتقارير مالية معتمدة ومقبولة لدى البنوك والجهات الحكومية والمستثمرين.',
 desc:['نُعدّ ونعتمد القوائم المالية (قائمة المركز المالي، الدخل، التدفقات النقدية، التغيرات في حقوق الملكية) وفق معايير المحاسبة المصرية، مع الإفصاحات المطلوبة كاملة.','تقاريرنا معتمدة ومقبولة لدى البنوك للحصول على التسهيلات، والجهات الحكومية والمناقصات وهيئات الاستثمار والجهات المانحة.'],
 features:['قوائم مالية وفق المعايير المصرية','إفصاحات كاملة وملاحظات واضحة','اعتماد مقبول للبنوك','تقارير للمناقصات والجهات الرسمية','تقارير دورية ربع سنوية','عرض احترافي للإدارة'],
 docs:['ميزان المراجعة','كشوف البنوك والعملاء والموردين','بيانات المخزون والأصول'],
 audience:['شركات تتعامل مع البنوك','متقدمون للمناقصات','جهات تطلب تراخيص'],
 faq:[['هل التقارير مقبولة بنكياً؟','نعم، معتمدة ومقبولة لدى البنوك والجهات الرسمية.'],['هل تقدمون تقارير دورية؟','نعم، تقارير ربع سنوية ونصف سنوية حسب احتياجك.']],
 steps:[['التجميع','جمع الأرصدة والميزانيات'],['الإعداد','تكوين القوائم والإفصاحات'],['المراجعة','فحص داخلي للجودة'],['الاعتماد','تسليم نسخة معتمدة رسمية']]},
{id:'books',icon:'fa-book',title:'إمساك الدفاتر',
 img:'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=60'],
 intro:'دفاتر محاسبية منظمة ودقيقة طوال العام تحميك من الغرامات وتكشف لك أرقام نشاطك أولاً بأول.',
 desc:['نمسك دفاترك المحاسبية (اليومية، الأستاذ، المساعدة) وفق متطلبات قانون الضرائب ومعايير المحاسبة، بتسجيل دوري للعمليات وترحيل وتسوية البنود ومطابقة البنوك والمخازن.','نقدم لك تقارير شهرية مبسطة توضح موقفك المالي لحظة بلحظة، لتتفرغ أنت لإدارة نشاطك.'],
 features:['تسجيل يومي للعمليات','ترحيل وتسوية دورية','مطابقة البنوك والعملاء','تقارير شهرية للإدارة','تجهيز ميزان المراجعة','ملف جاهز للفحص الضريبي'],
 docs:['الفواتير والإيصالات','كشوف البنوك','سجلات الرواتب','عقود البيع والشراء'],
 audience:['الشركات الصغيرة والمتوسطة','المحلات والمطاعم','العيادات والمكاتب المهنية'],
 faq:[['هل تقدمون تقارير شهرية؟','نعم، تقرير دوري مبسط يوضح موقفك المالي أولاً بأول.'],['هل الدفاتر متوافقة مع متطلبات الضرائب؟','نعم، وفق أحكام قانون الإجراءات الضريبية.']],
 steps:[['الاستلام','جمع المستندات دورياً'],['التسجيل','قيد العمليات بالدفاتر'],['التسوية','مطابقات وإقفال شهري'],['التقارير','تسليم تقرير شهري واضح']]},
{id:'consult',icon:'fa-comments-dollar',title:'الاستشارات الضريبية والمحاسبية',
 img:'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=60',
 gallery:['https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=60','https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=60'],
 intro:'خبرة بين يديك: استشارات عملية تحسم قراراتك المالية وتحصّنك ضد المخاطر.',
 desc:['نقدم استشارات متخصصة في: المعالجات الضريبية للعقود والعمليات، التوافق مع الفاتورة والإيصال الإلكتروني، هيكلة العمليات لتقليل المخاطر، تقييم الموقف الضريبي قبل الفحص، ومعالجة الإخطارات والغرامات.','استشاراتنا عملية وواضحة وموثقة كتابياً، لتتخذ قراراتك وأنت مطمئن.'],
 features:['مراجعات ما قبل الفحص','معالجة الإخطارات والغرامات','التوافق مع الفاتورة الإلكترونية','مذكرات ضريبية موثقة','هيكلة العقود والعمليات','رأي مهني مكتوب ومعتمد'],
 docs:['العقود والمستندات الحالية','الإخطارات الضريبية الواردة','القوائم المالية الأخيرة'],
 audience:['شركات قبل فحص ضريبي','شركات تعيد الهيكلة','أفراد لديهم مراكز ضريبية معقدة'],
 faq:[['هل الاستشارة موثقة؟','نعم، مذكرة مكتوبة وموقعة برأينا المهني.'],['هل ترافقون التنفيذ؟','نعم، عند الحاجة حتى إغلاق الموضوع.']],
 steps:[['الاستماع','فهم الموقف والمستندات'],['الدراسة','تحليل قانوني وضريبي'],['الرأي','مذكرة مكتوبة واضحة'],['المتابعة','مرافقة التنفيذ عند الحاجة']]}
];

/* ---------- رسم صفحة الخدمة ---------- */
const mount=document.getElementById('serviceMount');
if(mount){
  const id=new URLSearchParams(location.search).get('s');
  const s=SERVICES.find(x=>x.id===id);

  if(!s){
    mount.innerHTML=`<section class="section"><div class="container">
      <div class="section-head"><div class="sec-tag">خدماتنا</div><h2>اختر الخدمة <em>التي تحتاجها</em></h2></div>
      <div class="grid-4">${SERVICES.map((x,i)=>`
        <a href="service.html?s=${x.id}" class="svc-card reveal d${i%4}">
          <div class="svc-ico"><i class="fa-solid ${x.icon}"></i></div>
          <h3>${x.title}</h3><p>${x.intro}</p>
          <span class="svc-link">التفاصيل <i class="fa-solid fa-arrow-left"></i></span>
        </a>`).join('')}
      </div></div></section>`;
    revealIn(mount);
  }else{
    document.title=s.title+' | محمود الباز قابيل';
    const t=document.getElementById('svcTitle'); if(t)t.innerHTML=`خدمة <em>${s.title}</em>`;
    const p=document.getElementById('svcIntro'); if(p)p.textContent=s.intro;

    mount.innerHTML=`
    <section class="section">
      <div class="container">
        <div class="svc-detail-grid">
          <div class="reveal-r">
            <div class="sec-tag" style="margin-bottom:12px;">تفاصيل الخدمة</div>
            <h2 style="color:var(--navy-800);font-size:clamp(26px,3.4vw,38px);font-weight:900;line-height:1.45;margin-bottom:16px;">${s.title} <em style="color:var(--navy-500);font-style:normal;">باحترافية كاملة</em></h2>
            ${s.desc.map(d=>`<p style="color:var(--gray-600);margin-bottom:16px;font-size:16.5px;">${d}</p>`).join('')}
            <div class="feat-grid">${s.features.map(f=>`<div class="feat-item"><i class="fa-solid fa-circle-check"></i> ${f}</div>`).join('')}</div>
          </div>
          <div class="reveal-l"><div class="svc-detail-img"><img src="${s.img}" alt="${s.title}" loading="lazy"></div></div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <div class="section-head reveal"><div class="sec-tag">من واقع العمل</div><h2>صور توضيحية لخدمة <em>${s.title}</em></h2></div>
        <div class="svc-gallery reveal">${s.gallery.map(g=>`<img src="${g}" alt="${s.title}" loading="lazy">`).join('')}</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="why-grid">
          <div class="reveal-r">
            <div class="sec-tag" style="margin-bottom:12px;">المستندات المطلوبة</div>
            <h3 class="svc-sub">ما الذي ستحتاج لتجهيزه</h3>
            <ul class="docs-list">${s.docs.map(d=>`<li><i class="fa-solid fa-file-lines"></i> ${d}</li>`).join('')}</ul>
          </div>
          <div class="reveal-l">
            <div class="sec-tag" style="margin-bottom:12px;">لمن هذه الخدمة؟</div>
            <h3 class="svc-sub">الفئات المستفيدة</h3>
            <div class="aud-chips">${s.audience.map(a=>`<span><i class="fa-solid fa-user-check"></i> ${a}</span>`).join('')}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <div class="section-head reveal"><div class="sec-tag">منهجية التنفيذ</div><h2>كيف نقدم لك <em>${s.title}</em>؟</h2></div>
        <div class="steps-grid" style="padding-top:44px;">
          ${s.steps.map((st,i)=>`
            <div class="step-card reveal d${i}">
              <div class="step-num">${['١','٢','٣','٤'][i]}</div>
              <h3>${st[0]}</h3><p>${st[1]}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal"><div class="sec-tag">أسئلة شائعة</div><h2>كل ما تريد معرفته عن <em>${s.title}</em></h2></div>
        <div class="faq-wrap">
          ${s.faq.map((f,i)=>`
            <div class="faq-item reveal d${i}">
              <button class="faq-q"><span>${f[0]}</span><span class="fi"><i class="fa-solid fa-plus"></i></span></button>
              <div class="faq-a"><div>${f[1]}</div></div>
            </div>`).join('')}
        </div>
        <div class="center-wrap reveal">
          <a href="contact.html" class="btn btn-navy"><i class="fa-solid fa-calendar-check"></i> اطلب الخدمة الآن</a>
          <a href="https://wa.me/201067777481" class="btn btn-wa" target="_blank"><i class="fa-brands fa-whatsapp"></i> استفسر واتساب</a>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <div class="section-head reveal"><div class="sec-tag">خدمات ذات صلة</div><h2>قد تحتاج أيضاً إلى</h2></div>
        <div class="grid-3">
          ${SERVICES.filter(x=>x.id!==s.id).slice(0,3).map((x,i)=>`
            <a href="service.html?s=${x.id}" class="svc-card reveal d${i}">
              <div class="svc-ico"><i class="fa-solid ${x.icon}"></i></div>
              <h3>${x.title}</h3><p>${x.intro}</p>
              <span class="svc-link">التفاصيل <i class="fa-solid fa-arrow-left"></i></span>
            </a>`).join('')}
        </div>
      </div>
    </section>`;

    revealIn(mount);
    bindFaq(mount);
  }
}

document.querySelectorAll('[data-service-link]').forEach(a=>{
  a.setAttribute('href','service.html?s='+a.dataset.serviceLink);
});

})();