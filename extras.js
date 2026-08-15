(function(){
'use strict';

if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

let deferredPrompt = null;
const banner = document.createElement('div');
banner.className = 'install-banner';
banner.innerHTML = `<div class="container ib-inner">
  <div class="ib-icon"><i class="fa-solid fa-mobile-screen-button"></i></div>
  <div class="ib-text"><b>ثبّت تطبيق محمود الباز قابيل</b><span>تجربة أسرع تعمل بدون إنترنت مثل تطبيقات الهاتف تماماً</span></div>
  <div class="ib-actions">
    <button class="btn btn-navy ib-install" type="button"><i class="fa-solid fa-download"></i> تثبيت الآن</button>
    <button class="ib-later" type="button">لاحقاً</button>
  </div>
</div>`;
document.body.appendChild(banner);

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  if(!localStorage.getItem('ib_dismiss')) setTimeout(() => banner.classList.add('show'), 1800);
});
banner.querySelector('.ib-install').addEventListener('click', async () => {
  if(!deferredPrompt){
    alert('على iPhone: اضغط زر المشاركة ثم اختر "إضافة إلى الشاشة الرئيسية"');
    return;
  }
  banner.classList.remove('show');
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
});
banner.querySelector('.ib-later').addEventListener('click', () => {
  banner.classList.remove('show');
  localStorage.setItem('ib_dismiss','1');
});
window.addEventListener('appinstalled', () => banner.classList.remove('show'));

const SERVICES = [
  {id:'setup',icon:'fa-building-columns',title:'تأسيس الشركات',img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=60',intro:'نؤسس شركتك من الفكرة حتى الاستلام الكامل لجميع التراخيص، لتبدأ نشاطك على أساس قانوني وضريبي سليم.',desc:['نتولى عنك كامل إجراءات تأسيس جميع أنواع الشركات في مصر: شركة الشخص الواحد، التضامن، التوصية بالأسهم، ذات المسؤولية المحدودة، والمساهمة. نبدأ باختيار الشكل القانوني الأنسب لطبيعة نشاطك ورأس مالك، ثم نعدّ العقود والنظم الأساسية ونسجلها بالشهر العقاري وهيئة الاستثمار.','نُنهي السجل التجاري والبطاقة الضريبية والتسجيل في منظومة الفاتورة الإلكترونية والتأمينات، ونسلّمك ملفاً كاملاً جاهزاً لمباشرة النشاط دون أي معوقات.'],features:['اختيار الشكل القانوني المناسب','إعداد العقود والنظام الأساسي','استخراج السجل التجاري','إصدار البطاقة الضريبية','التسجيل بالفاتورة الإلكترونية','التسجيل في التأمينات الاجتماعية'],steps:[['دراسة النشاط','تحديد الشكل القانوني ورأس المال المناسب'],['إعداد المستندات','صياغة العقود والأنظمة الأساسية'],['التنفيذ','إنهاء الإجراءات لدى الجهات الرسمية'],['التسليم','تسليم ملف كامل جاهز لمباشرة النشاط']]},
  {id:'tax',icon:'fa-file-invoice-dollar',title:'ضرائب الدخل والقيمة المضافة',img:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=60',intro:'إدارة كاملة لالتزاماتك الضريبية بدقة وفي المواعيد، مع أفضل وضع ضريبي يحققه التخطيط السليم.',desc:['نُعدّ ونقدّم جميع الإقرارات الضريبية: إقرار ضريبة الدخل السنوي للأشخاص الطبيعيين والاعتباريين، وإقرارات ضريبة القيمة المضافة الشهرية، وإقرارات الخصم والتحصيل تحت حساب الضريبة، ومرتبات كسب العمل.','نمثّلك أمام مأموريات الضرائب في الفحص والمنازعات ولجان الطعن، ونضع لك خطة تخطيط ضريبي قانونية تقلل الأعباء وتتجنب الغرامات.'],features:['إقرارات ضريبة الدخل','إقرارات القيمة المضافة الشهرية','إقرارات الخصم والتحصيل','ضريبة المرتبات كسب العمل','التمثيل أمام الفحص الضريبي','حل المنازعات ولجان الطعن'],steps:[['مراجعة المستندات','فحص الدفاتر والفواتير والعقود'],['الإعداد','حساب الوعاء الضريبي بدقة'],['التقديم','إرسال الإقرارات إلكترونياً في المواعيد'],['المتابعة','مرافقتك في الفحص حتى الإغلاق النهائي']]},
  {id:'import',icon:'fa-ship',title:'الاستيراد والتصدير',img:'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=60',intro:'استشارات جمركية وضريبية متكاملة تجعل عملياتك الدولية أسهل وأسرع وأقل تكلفة.',desc:['نساعد الشركات المستوردة والمصدرة في كل جوانب التعاملات الدولية: القيد في سجل المستوردين والمصدرين، استخراج البطاقة الاستيرادية، تحديد البنود الجمركية والرسوم المستحقة، ومتطلبات البنوك ومستندات التحصيل والمستندي.','نقدم دراسات عن التكلفة الاستيرادية الكاملة قبل التعاقد، ونعالج المشكلات الجمركية والضريبية التي تواجه الشحنات.'],features:['القيد في سجل المستوردين','استخراج البطاقة الاستيرادية','تحديد البنود والرسوم الجمركية','حساب التكلفة الاستيرادية الكاملة','مستندات التحصيل والمستندي','معالجة المشكلات الجمركية'],steps:[['دراسة العملية','تحليل الصفقة والسلعة والبنود'],['التجهيز','إعداد المستندات والمتطلبات'],['المتابعة','مرافقة الشحنة إجرائياً'],['الإغلاق','تسوية الموقف الجمركي والضريبي']]},
  {id:'feasibility',icon:'fa-chart-line',title:'دراسات الجدوى الشاملة',img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=60',intro:'دراسات جدوى علمية متكاملة تمنحك قراراً استثمارياً واثقاً وتفتح لك أبواب التمويل البنكي.',desc:['نُعدّ دراسات جدوى شاملة (سوقية، فنية، مالية، قانونية، بيئية) وفق منهجيات معتمدة لدى البنوك وجهات التمويل. تشمل تحليل السوق والمنافسين، وتحديد الطاقة الإنتاجية والمعدات والعمالة، وحساب التكاليف الاستثمارية والتشغيلية والإيرادات المتوقعة.','نخرج بمؤشرات مالية حاسمة: صافي القيمة الحالية NPV، معدل العائد الداخلي IRR، فترة الاسترداد، ونقطة التعادل، مع تقرير نهائي مصاغ باحترافية للعرض على الممولين.'],features:['دراسة السوق والمنافسين','الدراسة الفنية والهندسية','الدراسة المالية والتدفقات','مؤشرات NPV و IRR','تحليل الحساسية والمخاطر','صياغة نهائية للبنوك والممولين'],steps:[['جمع البيانات','دراسة السوق والافتراضات'],['النمذجة المالية','بناء التدفقات والمؤشرات'],['التقييم','تحليل الحساسية والمخاطر'],['التقرير','تسليم دراسة جاهزة للتمويل']]},
  {id:'audit',icon:'fa-magnifying-glass-chart',title:'مراجعة الحسابات',img:'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1000&q=60',intro:'مراجعة قانونية مستقلة تمنح قوائمك المالية مصداقية أمام البنوك والجهات الرسمية والشركاء.',desc:['نقوم بالمراجعة القانونية للقوائم المالية وفق معايير المراجعة المصرية والدولية: التخطيط وفهم المنشأة وتقييم المخاطر، اختبارات الرقابة الداخلية، الإجراءات الجوهرية والتحليلية، والحصول على أدلة كافية ومناسبة.','نصدر تقرير المراجع القانوني المستقل مرفقاً به القوائم المالية المعتمدة، مع خطاب توصيات إدارية يعالج نقاط الضعف في الرقابة الداخلية.'],features:['التخطيط وتقييم المخاطر','اختبار الرقابة الداخلية','الإجراءات الجوهرية والتحليلية','تأكيدات خارجية للأرصدة','تقرير مراجع قانوني معتمد','خطاب توصيات إدارية'],steps:[['التخطيط','فهم المنشأة وتحديد الأهمية النسبية'],['الاختبارات','فحص الرقابة والإجراءات الجوهرية'],['الإثبات','جمع أدلة المراجعة الكافية'],['التقرير','إصدار الرأي المعتمد']]},
  {id:'reports',icon:'fa-file-signature',title:'اعتماد التقارير المالية',img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=60',intro:'قوائم وتقارير مالية معتمدة ومقبولة لدى البنوك والجهات الحكومية والمستثمرين.',desc:['نُعدّ ونعتمد القوائم المالية (قائمة المركز المالي، الدخل، التدفقات النقدية، التغيرات في حقوق الملكية) وفق معايير المحاسبة المصرية، مع الإفصاحات المطلوبة كاملة.','تقاريرنا معتمدة ومقبولة لدى البنوك للحصول على التسهيلات، والجهات الحكومية والمناقصات وهيئات الاستثمار والجهات المانحة.'],features:['قوائم مالية وفق المعايير المصرية','إفصاحات كاملة وملاحظات واضحة','اعتماد مقبول للبنوك','تقارير للمناقصات والجهات الرسمية','تقارير دورية ربع سنوية','عرض احترافي للإدارة'],steps:[['التجميع','جمع الأرصدة والميزانيات'],['الإعداد','تكوين القوائم والإفصاحات'],['المراجعة','فحص داخلي للجودة'],['الاعتماد','تسليم نسخة معتمدة رسمية']]},
  {id:'books',icon:'fa-book',title:'إمساك الدفاتر',img:'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=60',intro:'دفاتر محاسبية منظمة ودقيقة طوال العام تحميك من الغرامات وتكشف لك أرقام نشاطك أولاً بأول.',desc:['نمسك دفاترك المحاسبية (اليومية، الأستاذ، المساعدة) وفق متطلبات قانون الضرائب ومعايير المحاسبة، بتسجيل دوري للعمليات وترحيل وتسوية البنود ومطابقة البنوك والمخازن.','نقدم لك تقارير شهرية مبسطة توضح موقفك المالي لحظة بلحظة، لتتفرغ أنت لإدارة نشاطك.'],features:['تسجيل يومي للعمليات','ترحيل وتسوية دورية','مطابقة البنوك والعملاء','تقارير شهرية للإدارة','تجهيز ميزان المراجعة','ملف جاهز للفحص الضريبي'],steps:[['الاستلام','جمع المستندات دورياً'],['التسجيل','قيد العمليات بالدفاتر'],['التسوية','مطابقات وإقفال شهري'],['التقارير','تسليم تقرير شهري واضح']]},
  {id:'consult',icon:'fa-comments-dollar',title:'الاستشارات الضريبية والمحاسبية',img:'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=60',intro:'خبرة بين يديك: استشارات عملية تحسم قراراتك المالية وتحصّنك ضد المخاطر.',desc:['نقدم استشارات متخصصة في: المعالجات الضريبية للعقود والعمليات، التوافق مع الفاتورة والإيصال الإلكتروني، هيكلة العمليات لتقليل المخاطر، تقييم الموقف الضريبي قبل الفحص، ومعالجة الإخطارات والغرامات.','استشاراتنا عملية وواضحة وموثقة كتابياً، لتتخذ قراراتك وأنت مطمئن.'],features:['مراجعات ما قبل الفحص','معالجة الإخطارات والغرامات','التوافق مع الفاتورة الإلكترونية','مذكرات ضريبية موثقة','هيكلة العقود والعمليات','رأي مهني مكتوب ومعتمد'],steps:[['الاستماع','فهم الموقف والمستندات'],['الدراسة','تحليل قانوني وضريبي'],['الرأي','مذكرة مكتوبة واضحة'],['المتابعة','مرافقة التنفيذ عند الحاجة']]}
];

const mount = document.getElementById('serviceMount');
if(mount){
  const id = new URLSearchParams(location.search).get('s');
  const s = SERVICES.find(x => x.id === id);

  if(!s){
    mount.innerHTML = `<section class="section"><div class="container">
      <div class="section-head"><div class="sec-tag">خدماتنا</div><h2>اختر الخدمة <em>التي تحتاجها</em></h2></div>
      <div class="grid-4">${SERVICES.map((x,i) => `
        <a href="service.html?s=${x.id}" class="svc-card reveal d${i%4}">
          <div class="svc-ico"><i class="fa-solid ${x.icon}"></i></div>
          <h3>${x.title}</h3><p>${x.intro}</p>
          <span class="svc-link">التفاصيل <i class="fa-solid fa-arrow-left"></i></span>
        </a>`).join('')}
      </div>
    </div></section>`;
  } else {
    document.title = s.title + ' | محمود الباز قابيل';
    const heroT = document.getElementById('svcTitle');
    const heroP = document.getElementById('svcIntro');
    if(heroT) heroT.innerHTML = `خدمة <em>${s.title}</em>`;
    if(heroP) heroP.textContent = s.intro;

    mount.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="svc-detail-grid">
          <div class="reveal-r">
            <div class="sec-tag" style="margin-bottom:12px;">تفاصيل الخدمة</div>
            <h2 style="color:var(--navy-800);font-size:clamp(26px,3.4vw,38px);font-weight:900;line-height:1.45;margin-bottom:16px;">${s.title} <em style="color:var(--navy-500);font-style:normal;">باحترافية كاملة</em></h2>
            ${s.desc.map(p => `<p style="color:var(--gray-600);margin-bottom:16px;font-size:16.5px;">${p}</p>`).join('')}
            <div class="feat-grid">
              ${s.features.map(f => `<div class="feat-item"><i class="fa-solid fa-circle-check"></i> ${f}</div>`).join('')}
            </div>
          </div>
          <div class="reveal-l">
            <div class="svc-detail-img"><img src="${s.img}" alt="${s.title}" loading="lazy"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <div class="section-head reveal">
          <div class="sec-tag">منهجية التنفيذ</div>
          <h2>كيف نقدم لك خدمة <em>${s.title}</em>؟</h2>
        </div>
        <div class="steps-grid" style="padding-top:44px;">
          ${s.steps.map((st,i) => `
            <div class="step-card reveal d${i}">
              <div class="step-num">${['١','٢','٣','٤'][i]}</div>
              <h3>${st[0]}</h3><p>${st[1]}</p>
            </div>`).join('')}
        </div>
        <div class="center-wrap reveal">
          <a href="contact.html" class="btn btn-navy"><i class="fa-solid fa-calendar-check"></i> اطلب الخدمة الآن</a>
          <a href="https://wa.me/201067777481" class="btn btn-wa" target="_blank"><i class="fa-brands fa-whatsapp"></i> استفسر واتساب</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <div class="sec-tag">خدمات ذات صلة</div>
          <h2>قد تحتاج أيضاً إلى</h2>
        </div>
        <div class="grid-3">
          ${SERVICES.filter(x => x.id !== s.id).slice(0,3).map((x,i) => `
            <a href="service.html?s=${x.id}" class="svc-card reveal d${i}">
              <div class="svc-ico"><i class="fa-solid ${x.icon}"></i></div>
              <h3>${x.title}</h3><p>${x.intro}</p>
              <span class="svc-link">التفاصيل <i class="fa-solid fa-arrow-left"></i></span>
            </a>`).join('')}
        </div>
      </div>
    </section>`;
  }
  observeReveals();
}

document.querySelectorAll('[data-service-link]').forEach(a => {
  a.setAttribute('href', 'service.html?s=' + a.dataset.serviceLink);
});

})();