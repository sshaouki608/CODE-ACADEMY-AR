'use strict';
/* ===== أدوات عامة وتخزين محلي ===== */
const $=s=>document.querySelector(s);
const S={g(k,d){try{const v=localStorage.getItem('ca_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},
s(k,v){try{localStorage.setItem('ca_'+k,JSON.stringify(v));return true}catch(e){toast('تعذّر الحفظ محليًا (التخزين معطّل أو ممتلئ)');return false}}};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2600)}
function h(t,a,...c){const e=document.createElement(t);for(const k in a||{}){if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k])}c.flat(9).forEach(x=>{if(x!=null&&x!==false)e.append(x)});return e}
const A=(href,t,c)=>h('a',{href,class:c||''},t);
async function copy(t){try{await navigator.clipboard.writeText(t);toast('تم النسخ')}catch(e){const x=h('textarea',{},t);document.body.append(x);x.select();try{document.execCommand('copy');toast('تم النسخ')}catch(e2){toast('تعذّر النسخ')}x.remove()}}
const strs=a=>Array.isArray(a)?a.filter(x=>typeof x==='string'):[];

/* ===== البيانات ===== */
const P=[
['html','HTML','مبتدئ','هيكل صفحات الويب: العناوين والفقرات والروابط.'],
['css','CSS','مبتدئ','تنسيق الصفحات: الألوان والخطوط والتخطيط.'],
['js','JavaScript','متوسط','برمجة التفاعل داخل المتصفح. المتطلب: HTML وCSS.'],
['python','Python','مبتدئ','لغة سهلة القراءة. تحتاج بيئة تشغيل Python ولا تعمل في المتصفح هنا.'],
['c','C وC++','متقدم','لغات النظم. تحتاج مترجمًا (compiler) على جهازك.'],
['php','PHP','متوسط','لغة خادم. تحتاج خادم PHP.'],
['sql','SQL','متوسط','الاستعلام عن قواعد البيانات.'],
['git','Git وGitHub','مبتدئ','إدارة الإصدارات والتعاون.'],
['react','React','متقدم','مكتبة واجهات. المتطلب: JavaScript.'],
['node','Node.js','متقدم','JavaScript على الخادم. المتطلب: JavaScript.'],
['uiux','UI/UX','مبتدئ','أساسيات تصميم الواجهات وتجربة المستخدم.'],
['sec','الأمن السيبراني والبرمجة الآمنة','متوسط','تحقق المدخلات وتجنّب الثغرات الشائعة.']
].map(a=>({id:a[0],n:a[1],lv:a[2],d:a[3]}));
const L=[
{id:'h1',p:'html',lv:'مبتدئ',t:'العناوين والفقرات',goal:'كتابة صفحة بعنوان وفقرة.',text:'تتكوّن صفحة HTML من عناصر. الوسم h1 للعنوان الرئيسي والوسم p للفقرة، ولكل وسم فتح وإغلاق.',code:'<h1>مرحبًا</h1>\n<p>هذه أول صفحة لي.</p>',expect:'يظهر عنوان كبير تحته فقرة.',err:'نسيان وسم الإغلاق مثل </p>.',ex:'أضف عنوانًا فرعيًا h2 وفقرة ثانية.',q:['أي وسم يمثل أكبر عنوان؟',['p','h1','div'],1]},
{id:'h2',p:'html',lv:'مبتدئ',t:'الروابط والقوائم',goal:'إنشاء رابط وقائمة.',text:'الوسم a ينشئ رابطًا وخاصية href تحدد الوجهة. القائمة غير المرتبة ul وعناصرها li.',code:'<a href="https://example.com">رابط</a>\n<ul>\n  <li>الأول</li>\n  <li>الثاني</li>\n</ul>',expect:'رابط قابل للنقر وقائمة نقطية.',err:'كتابة href بلا علامات اقتباس.',ex:'أنشئ قائمة بثلاث لغات تريد تعلمها.',q:['أي خاصية تحدد وجهة الرابط؟',['src','href','alt'],1]},
{id:'c1',p:'css',lv:'مبتدئ',t:'الألوان والخطوط',goal:'تغيير لون النص وحجمه.',text:'القاعدة تتكوّن من محدد وخصائص: المحدد يختار العنصر والخصائص تحدد شكله.',code:'.box{\n  color:#7c5cff;\n  font-size:24px;\n}',expect:'يظهر نص "مربع" بلون بنفسجي وحجم أكبر.',err:'نسيان الفاصلة المنقوطة بين الخصائص.',ex:'غيّر اللون إلى الأحمر وأضف font-weight:bold.',q:['أي خاصية تغيّر لون النص؟',['color','background','border'],0]},
{id:'c2',p:'css',lv:'مبتدئ',t:'الحشو والحدود',goal:'فهم padding وborder وmargin.',text:'لكل عنصر محتوى وحشو (padding) وحدّ (border) وهامش (margin) خارجي.',code:'.box{\n  padding:16px;\n  border:3px solid #3b82f6;\n  margin:20px;\n}',expect:'مربع بحدّ أزرق ومسافة داخلية وخارجية.',err:'الخلط بين padding (داخلي) وmargin (خارجي).',ex:'أضف border-radius:12px.',q:['أي خاصية تضيف مسافة داخل الحدّ؟',['margin','padding','gap'],1]},
{id:'j1',p:'js',lv:'متوسط',t:'المتغيرات',goal:'تخزين قيمة وعرضها.',text:'نعرّف المتغير بـ const إذا لم يتغير وبـ let إذا تغيّر.',code:"const name='سارة';\nlet age=20;\nage=age+1;\ndocument.getElementById('out').textContent=name+' عمرها '+age;",expect:'تظهر الجملة: سارة عمرها 21.',err:'تغيير قيمة const بعد تعريفها يسبب خطأ.',ex:'أضف متغير city واعرضه.',q:['أي كلمة تعرّف متغيرًا قابلًا للتغيير؟',['const','let','get'],1]},
{id:'j2',p:'js',lv:'متوسط',t:'الدوال والحلقات',goal:'كتابة دالة تستخدم حلقة.',text:'الدالة كتلة كود قابلة لإعادة الاستخدام، والحلقة for تكرر التنفيذ.',code:"function sum(n){\n  let t=0;\n  for(let i=1;i<=n;i++){t+=i}\n  return t;\n}\ndocument.getElementById('out').textContent=sum(5);",expect:'يظهر 15.',err:'نسيان return فتكون النتيجة undefined.',ex:'اكتب دالة تضرب الأرقام من 1 إلى n.',q:['كم ناتج sum(3)؟',['3','6','9'],1]}
];
const PR=[
{id:'calc',t:'آلة حاسبة بسيطة',d:'تجمع وتطرح وتضرب وتقسم رقمين.',lv:'مبتدئ',tech:'HTML + JS',html:'<input id=a type=number value=6> <select id=op><option>+<option>-<option>×<option>÷</select> <input id=b type=number value=3>\n<button id=go>احسب</button><p id=r></p>',css:'body{font-family:sans-serif;padding:12px}input,select{width:80px;padding:6px}',js:"go.onclick=()=>{const x=+a.value,y=+b.value,o=op.value;r.textContent='النتيجة: '+(o=='+'?x+y:o=='-'?x-y:o=='×'?x*y:y?x/y:'لا يمكن القسمة على صفر')}"},
{id:'todo',t:'قائمة مهام',d:'تضيف مهام وتحذفها بالنقر. لا تُحفظ المهام (نموذج تجريبي).',lv:'مبتدئ',tech:'HTML + CSS + JS',html:'<input id=i placeholder="مهمة جديدة"> <button id=add>إضافة</button>\n<p>انقر على المهمة لحذفها</p><ul id=l></ul>',css:'body{font-family:sans-serif;padding:12px}li{cursor:pointer;margin:6px 0}',js:"add.onclick=()=>{if(!i.value.trim())return;const li=document.createElement('li');li.textContent=i.value;li.onclick=()=>li.remove();l.append(li);i.value=''}"},
{id:'clock',t:'ساعة رقمية',d:'تعرض الوقت الحالي وتتحدث كل ثانية.',lv:'مبتدئ',tech:'HTML + CSS + JS',html:'<h1 id=t></h1>',css:'body{background:#111;color:#7cf;font-family:monospace;text-align:center;padding-top:40px}h1{font-size:3rem}',js:"const f=()=>t.textContent=new Date().toLocaleTimeString();f();setInterval(f,1000);"},
{id:'guess',t:'لعبة تخمين الأرقام',d:'خمّن رقمًا بين 1 و20.',lv:'مبتدئ',tech:'HTML + JS',html:'<p>خمّن رقمًا من 1 إلى 20</p><input id=g type=number min=1 max=20> <button id=ok>خمّن</button><p id=m></p>',css:'body{font-family:sans-serif;padding:12px}',js:"let n=Math.floor(Math.random()*20)+1,c=0;ok.onclick=()=>{const v=+g.value;if(!v)return;c++;m.textContent=v==n?'صحيح! بعد '+c+' محاولات':v<n?'أكبر':'أصغر'}"}
];
const C=[
{id:'q1',k:'اختيار من متعدد',q:'ما ناتج 2+\'2\' في JavaScript؟',o:['4','22','خطأ'],a:1,w:'عند جمع رقم مع نص يتحول الرقم إلى نص فتُدمج القيمتان.'},
{id:'q2',k:'اكتشاف خطأ',q:'أين الخطأ؟',c:'<p>مرحبًا<p>',o:['لا يوجد وسم إغلاق للفقرة الأولى','الوسم p غير موجود','النص عربي'],a:0,w:'يجب إغلاق كل فقرة بـ </p>.'},
{id:'q3',k:'إكمال الكود',q:'أكمل: ____ x = 5; (متغير ثابت)',o:['const','let','function'],a:0,w:'const يعرّف قيمة لا تتغير.'},
{id:'q4',k:'نتيجة التنفيذ',q:'ما الناتج؟',c:'let a=3;\na+=2;\nconsole.log(a*2)',o:['10','5','6'],a:0,w:'a تصبح 5 ثم 5*2=10.'},
{id:'q5',k:'تمرين مبتدئ',q:'أي خاصية CSS تغيّر لون الخلفية؟',o:['color','background','font'],a:1,w:'background تحدد خلفية العنصر.'},
{id:'q6',k:'اختيار من متعدد',q:'أي وسم ينشئ رابطًا؟',o:['<a>','<img>','<li>'],a:0,w:'الوسم a مع href.'}
];
const LIB=[
{id:'l1',l:'html',cat:'قوالب',lv:'مبتدئ',t:'هيكل صفحة كاملة',d:'الحد الأدنى لصفحة صالحة.',code:'<!doctype html>\n<html lang="ar" dir="rtl">\n<head><meta charset="utf-8"><title>صفحتي</title></head>\n<body><h1>مرحبًا</h1></body>\n</html>'},
{id:'l2',l:'css',cat:'مكونات',lv:'مبتدئ',t:'توسيط عنصر بـ flex',d:'توسيط أفقي وعمودي.',code:'.wrap{display:flex;justify-content:center;align-items:center;height:200px}'},
{id:'l3',l:'css',cat:'تأثيرات',lv:'مبتدئ',t:'تأثير تحويم',d:'تكبير عند مرور المؤشر.',code:'.box{transition:transform .2s}\n.box:hover{transform:scale(1.1)}'},
{id:'l4',l:'js',cat:'مصفوفات',lv:'مبتدئ',t:'map على مصفوفة',d:'تحويل كل عنصر.',code:"const r=[1,2,3].map(x=>x*2);\ndocument.getElementById('out').textContent=r.join(',');"},
{id:'l5',l:'js',cat:'كائنات',lv:'مبتدئ',t:'كائن وخصائصه',d:'قراءة خصائص كائن.',code:"const u={name:'علي',age:25};\ndocument.getElementById('out').textContent=u.name+' - '+u.age;"},
{id:'l6',l:'js',cat:'حلقات',lv:'مبتدئ',t:'حلقة for',d:'تكرار عشر مرات.',code:"let s='';\nfor(let i=1;i<=5;i++){s+=i+' '}\ndocument.getElementById('out').textContent=s;"},
{id:'l7',l:'js',cat:'خوارزميات',lv:'متوسط',t:'فحص التناظر',d:'هل الكلمة تُقرأ بالاتجاهين؟',code:"const isPal=w=>w===[...w].reverse().join('');\ndocument.getElementById('out').textContent=isPal('level');"},
{id:'l8',l:'js',cat:'دوال',lv:'متوسط',t:'أكبر عدد في مصفوفة',d:'باستخدام Math.max.',code:"const mx=a=>Math.max(...a);\ndocument.getElementById('out').textContent=mx([4,9,2]);"}
];
const NAV=[['home','الرئيسية','Home'],['paths','المسارات','Paths'],['lessons','الدروس','Lessons'],['editor','المحرر','Editor'],['projects','المشاريع','Projects'],['challenges','التحديات','Challenges'],['library','المكتبة','Library'],['tools','الأدوات','Tools'],['progress','التقدم','Progress'],['settings','الإعدادات','Settings']];

/* ===== الثيم واللغة ===== */
function applyPrefs(){const th=S.g('theme','dark'),lg=S.g('lang','ar');document.documentElement.dataset.theme=th;document.documentElement.lang=lg;document.documentElement.dir=lg==='ar'?'rtl':'ltr';
$('#nav').replaceChildren(...NAV.map(n=>h('a',{href:'#/'+n[0],'data-r':n[0]},lg==='ar'?n[1]:n[2])))}

/* ===== المحرر والمعاينة ===== */
let ed=S.g('ed',null);
if(!ed||typeof ed.html!=='string'||typeof ed.css!=='string'||typeof ed.js!=='string')ed={html:'<h1>مرحبًا بالعالم</h1>',css:'h1{color:#7c5cff}',js:''};
let tab='html';
const frameDoc=()=>'<!doctype html><html><head><meta charset="utf-8"><style>'+ed.css+'</style></head><body>'+ed.html+'<script>window.onerror=function(m){document.body.insertAdjacentText("beforeend","خطأ: "+m)}<\/script><script>'+ed.js+'<\/script></body></html>';
function loadEd(o){ed={html:o.html||'',css:o.css||'',js:o.js||''};S.s('ed',ed)}
function tryCode(lang,code){const o={html:'',css:'',js:''};if(lang==='css')o.html='<div class="box">مربع</div>';if(lang==='js')o.html='<p id="out"></p>';o[lang]=code;loadEd(o);tab=lang;location.hash='#/editor'}
function codeBlock(code,lang){return h('div',{},h('pre',{class:'code'},code),h('div',{class:'row'},h('button',{class:'btn alt',onclick:()=>copy(code)},'نسخ الكود'),h('button',{class:'btn',onclick:()=>tryCode(lang,code)},'جرّب في المحرر')))}

/* ===== العروض ===== */
const V={};
V.home=()=>h('div',{},
h('section',{class:'hero'},h('h1',{},'تعلّم البرمجة مجانًا، بالعربية، من أول سطر'),h('p',{},'دروس قصيرة وتمارين محققة ومحرر أكواد يعمل في المتصفح. بلا حساب وبلا اشتراك، وتقدّمك يبقى على جهازك.'),
h('div',{class:'row'},A('#/lessons','ابدأ التعلّم','btn'),A('#/editor','افتح المحرر','btn alt'),A('#/paths','استكشف المسارات','btn alt')),
h('pre',{class:'code'},'<button onclick="alert(\'مرحبًا!\')">\n  اضغط هنا\n</button>'),
h('p',{class:'mu'},'المحتوى الحالي: '+P.length+' مسارًا، '+L.length+' دروس، '+PR.length+' مشاريع، '+C.length+' تمارين، '+LIB.length+' أمثلة في المكتبة.')),
h('h2',{},'كيف تبدأ؟'),h('ol',{},h('li',{},'اقرأ درسًا في مسار HTML.'),h('li',{},'جرّب مثاله في المحرر وعدّله.'),h('li',{},'حلّ تحديًا لتتأكد من فهمك.'),h('li',{},'تابع نسبة تقدمك في صفحة التقدم.')),
h('div',{class:'grid'},h('div',{class:'card'},h('h3',{},'المشاريع'),h('p',{},'نماذج صغيرة تفتحها وتعدّلها.'),A('#/projects','عرض المشاريع','btn')),h('div',{class:'card'},h('h3',{},'التحديات'),h('p',{},'تمارين بإجابات محددة وتفسير.'),A('#/challenges','ابدأ التحدي','btn')),h('div',{class:'card'},h('h3',{},'الأدوات'),h('p',{},'مدقق JSON ومحول ألوان وغيرها.'),A('#/tools','فتح الأدوات','btn'))),
h('h2',{},'الأسئلة الشائعة'),
h('details',{},h('summary',{},'هل المنصة مجانية؟'),h('p',{},'نعم، لا تحتاج حسابًا ولا دفعًا.')),
h('details',{},h('summary',{},'أين تُحفظ بياناتي؟'),h('p',{},'في التخزين المحلي لمتصفحك فقط. يمكنك تصديرها واستيرادها من صفحة التقدم.')),
h('details',{},h('summary',{},'هل أشغّل Python وC++ هنا؟'),h('p',{},'لا. المتصفح لا يشغّلها؛ تحتاج بيئة تنفيذ على جهازك. المحرر هنا لـ HTML وCSS وJavaScript.')));

V.paths=()=>h('div',{},h('h1',{},'مسارات التعلّم'),h('div',{class:'grid'},P.map(p=>{const ls=L.filter(l=>l.p===p.id);
return h('div',{class:'card'},h('h3',{},p.n),h('span',{class:'tag'},p.lv),h('p',{},p.d),ls.length?h('ul',{},ls.map(l=>h('li',{},A('#/lesson/'+l.id,l.t)))):h('p',{class:'mu'},'لا توجد دروس لهذا المسار بعد.'))})));

V.lessons=()=>{const list=h('div',{class:'grid'}),q=h('input',{type:'search','aria-label':'بحث في الدروس',placeholder:'ابحث في الدروس'}),lv=h('select',{'aria-label':'المستوى'},['','مبتدئ','متوسط','متقدم'].map(x=>h('option',{value:x},x||'كل المستويات')));
const draw=()=>{const d=S.g('done',[]),r=L.filter(l=>(!q.value||(l.t+l.text).includes(q.value))&&(!lv.value||l.lv===lv.value));
list.replaceChildren(...(r.length?r.map(l=>h('div',{class:'card'},h('h3',{},l.t),h('span',{class:'tag'},l.p.toUpperCase()),h('span',{class:'tag'},l.lv),d.includes(l.id)?h('span',{class:'tag'},'✔ مكتمل'):null,h('p',{},l.goal),A('#/lesson/'+l.id,'افتح الدرس','btn'))):[h('p',{},'لا توجد نتائج.')]))};
q.addEventListener('input',draw);lv.addEventListener('change',draw);draw();return h('div',{},h('h1',{},'الدروس'),h('div',{class:'row'},q,lv),list)};

V.lesson=id=>{const i=L.findIndex(l=>l.id===id);if(i<0)return h('p',{},'الدرس غير موجود. ',A('#/lessons','عودة للدروس'));const l=L[i];S.s('last',id);
const d=()=>S.g('done',[]).includes(id),cb=h('button',{class:'btn ok'},''),
setCb=()=>{cb.textContent=d()?'✔ مكتمل (انقر للإلغاء)':'حدّد الدرس كمكتمل'};
cb.addEventListener('click',()=>{let a=S.g('done',[]);a=d()?a.filter(x=>x!==id):a.concat(id);S.s('done',a);setCb()});setCb();
const res=h('p',{role:'status'});
return h('div',{},h('h1',{},l.t),h('p',{},h('b',{},'الهدف: '),l.goal),h('p',{},l.text),codeBlock(l.code,l.p),
h('div',{class:'box'},h('b',{},'النتيجة المتوقعة: '),l.expect),h('div',{class:'box'},h('b',{},'خطأ شائع: '),l.err),h('div',{class:'box'},h('b',{},'تمرين: '),l.ex),
h('h3',{},'اختبر فهمك'),h('p',{},l.q[0]),h('div',{class:'opts'},l.q[1].map((o,k)=>h('button',{class:'btn alt',onclick:()=>{res.textContent=k===l.q[2]?'✔ إجابة صحيحة':'✘ حاول مرة أخرى'}},o))),res,
h('div',{class:'row'},cb,i>0?A('#/lesson/'+L[i-1].id,'الدرس السابق','btn alt'):null,i<L.length-1?A('#/lesson/'+L[i+1].id,'الدرس التالي','btn alt'):null))};

V.editor=()=>{const ta=h('textarea',{id:'src','aria-label':'محرر الكود',spellcheck:'false'}),fr=h('iframe',{id:'prev',title:'معاينة النتيجة',sandbox:'allow-scripts'});
const tabs=['html','css','js'].map(k=>h('button',{class:'tab','data-k':k,onclick:()=>sw(k)},k.toUpperCase()));
function sw(k){tab=k;ta.value=ed[k];tabs.forEach(b=>b.classList.toggle('on',b.dataset.k===k))}
const run=()=>{fr.srcdoc=frameDoc()};
ta.addEventListener('input',()=>{ed[tab]=ta.value});
ta.addEventListener('keydown',e=>{if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();run()}});
const sel=h('select',{'aria-label':'أمثلة جاهزة'},h('option',{value:''},'أمثلة جاهزة…'),PR.map(p=>h('option',{value:p.id},p.t)));
sel.addEventListener('change',()=>{const p=PR.find(x=>x.id===sel.value);if(p){loadEd(p);sw(tab);run()}});
const b=(t,f,c)=>h('button',{class:'btn '+(c||'alt'),onclick:f},t);
sw(tab);run();
return h('div',{},h('h1',{},'محرر الأكواد'),h('div',{class:'row'},tabs),ta,
h('div',{class:'row'},b('تشغيل (Ctrl+Enter)',run,''),b('تحديث المعاينة',run),
b('إعادة للمثال',()=>{loadEd({html:'<h1>مرحبًا بالعالم</h1>',css:'h1{color:#7c5cff}',js:''});sw(tab);run()}),
b('نسخ الكود',()=>copy(ta.value)),
b('مسح',()=>{if(confirm('مسح كود هذا التبويب؟')){ed[tab]='';ta.value='';S.s('ed',ed)}}),
b('حفظ محليًا',()=>{if(S.s('ed',ed))toast('تم الحفظ')}),
b('تنزيل',()=>{const u=URL.createObjectURL(new Blob([frameDoc()],{type:'text/html'})),a=h('a',{href:u,download:'project.html'});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)})),
sel,h('h3',{},'المعاينة'),fr,
h('p',{class:'mu'},'المعاينة داخل iframe بصلاحية تشغيل السكربتات فقط ومن دون الوصول إلى بيانات الموقع، لكنها ليست حماية مطلقة: لا تشغّل أكوادًا لا تثق بها. لا يوجد تلوين للصياغة. التنزيل ملف HTML واحد يجمع الثلاثة.'))};

V.projects=()=>h('div',{},h('h1',{},'المشاريع'),h('p',{class:'mu'},'نماذج تعليمية صغيرة وليست تطبيقات مكتملة.'),h('div',{class:'grid'},PR.map(p=>h('div',{class:'card'},h('h3',{},p.t),h('span',{class:'tag'},p.lv),h('span',{class:'tag'},p.tech),h('p',{},p.d),h('div',{class:'row'},h('button',{class:'btn',onclick:()=>{loadEd(p);tab='html';location.hash='#/editor'}},'معاينة وتعديل في المحرر'))))))
;

function chal(c){const res=h('p',{role:'status'});return h('div',{class:'card'},h('small',{},c.k),h('h3',{},c.q),c.c?h('pre',{class:'code'},c.c):null,
h('div',{class:'opts'},c.o.map((o,i)=>h('button',{class:'btn alt',onclick:()=>{if(i===c.a){const aw=S.g('awarded',[]);if(!aw.includes(c.id)){aw.push(c.id);S.s('awarded',aw);S.s('pts',S.g('pts',0)+10);res.textContent='✔ صحيح (+10 نقاط). '+c.w}else res.textContent='✔ صحيح. '+c.w+' (النقاط مُنحت سابقًا)'}else res.textContent='✘ غير صحيح، أعد المحاولة. '+c.w}},o))),res)}
V.challenges=()=>{const day=Math.floor(Date.now()/864e5-new Date().getTimezoneOffset()/1440);return h('div',{},h('h1',{},'التحديات'),h('h2',{},'تحدي اليوم'),chal(C[((day%C.length)+C.length)%C.length]),h('h2',{},'كل التمارين'),h('div',{class:'grid'},C.map(chal)))};

V.library=()=>{const q=h('input',{type:'search','aria-label':'بحث',placeholder:'ابحث في المكتبة'}),lg=h('select',{'aria-label':'اللغة'},['','html','css','js'].map(x=>h('option',{value:x},x||'كل اللغات'))),list=h('div',{class:'grid'});
const draw=()=>{const fav=S.g('fav',[]),r=LIB.filter(x=>(!q.value||(x.t+x.d+x.cat).includes(q.value))&&(!lg.value||x.l===lg.value));
list.replaceChildren(...(r.length?r.map(x=>h('div',{class:'card'},h('h3',{},x.t),h('span',{class:'tag'},x.l.toUpperCase()),h('span',{class:'tag'},x.cat),h('span',{class:'tag'},x.lv),h('p',{},x.d),h('pre',{class:'code'},x.code),
h('div',{class:'row'},h('button',{class:'btn alt',onclick:()=>copy(x.code)},'نسخ'),h('button',{class:'btn',onclick:()=>tryCode(x.l,x.code)},'جرّب'),h('button',{class:'btn alt',onclick:()=>{let f=S.g('fav',[]);f=f.includes(x.id)?f.filter(i=>i!==x.id):f.concat(x.id);S.s('fav',f);draw()}},fav.includes(x.id)?'★ مفضّل':'☆ أضف للمفضلة')))):[h('p',{},'لا توجد نتائج.')]))};
q.addEventListener('input',draw);lg.addEventListener('change',draw);draw();return h('div',{},h('h1',{},'مكتبة الأكواد'),h('div',{class:'row'},q,lg),list)};

function tool(title,note,...c){return h('div',{class:'card'},h('h3',{},title),h('p',{class:'mu'},note),c)}
V.tools=()=>{
const j=h('textarea',{'aria-label':'JSON',rows:4,dir:'ltr'}),jo=h('p',{class:'out',role:'status'});
const jb=h('button',{class:'btn',onclick:()=>{try{JSON.parse(j.value);jo.className='out';jo.textContent='✔ JSON صالح'}catch(e){jo.className='out bad';jo.textContent='✘ '+e.message}}},'تحقق');
const col=h('input',{'aria-label':'لون',placeholder:'#7c5cff أو 124,92,255',dir:'ltr'}),co=h('p',{class:'out',role:'status'});
const cb=h('button',{class:'btn',onclick:()=>{const v=col.value.trim();let m=v.match(/^#?([0-9a-f]{6})$/i);if(m){const n=parseInt(m[1],16);co.className='out';co.textContent='rgb('+(n>>16)+', '+(n>>8&255)+', '+(n&255)+')';return}
m=v.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/);if(m&&m.slice(1).every(x=>+x<=255)){co.className='out';co.textContent='#'+m.slice(1).map(x=>(+x).toString(16).padStart(2,'0')).join('')}else{co.className='out bad';co.textContent='صيغة غير صالحة'}}},'حوّل');
const w=h('textarea',{'aria-label':'نص',rows:4}),wo=h('p',{class:'out',role:'status'});
const wc=()=>{const t=w.value;wo.textContent='كلمات: '+(t.trim()?t.trim().split(/\s+/).length:0)+' | أسطر: '+(t?t.split('\n').length:0)+' | أحرف: '+t.length};w.addEventListener('input',wc);wc();
const cs=h('textarea',{'aria-label':'نص إنجليزي',rows:3,dir:'ltr'});
return h('div',{},h('h1',{},'أدوات المبرمج'),h('p',{class:'mu'},'أدوات بسيطة تعمل محليًا. لم تُنفَّذ بقية الأدوات (منسقات، مقارنة نصوص، مولّد بيانات) في هذا الإصدار.'),
h('div',{class:'grid'},tool('مدقق JSON','يستخدم JSON.parse في المتصفح.',j,jb,jo),tool('محول الألوان HEX ⇄ RGB','أدخل HEX أو ثلاث قيم RGB مفصولة بفاصلة.',col,cb,co),tool('عداد الكلمات والأسطر','عدّ بسيط بالمسافات.',w,wo),
tool('تحويل حالة الأحرف','للنص الإنجليزي.',cs,h('div',{class:'row'},h('button',{class:'btn alt',onclick:()=>{cs.value=cs.value.toUpperCase()}},'UPPER'),h('button',{class:'btn alt',onclick:()=>{cs.value=cs.value.toLowerCase()}},'lower')))))};

V.progress=()=>{const d=S.g('done',[]).filter(x=>L.some(l=>l.id===x)),pct=Math.round(d.length/L.length*100),pts=S.g('pts',0),bd=[];
if(d.length)bd.push('🌱 أول درس');if(d.length===L.length)bd.push('🏁 أكملت كل الدروس');if(pts>=30)bd.push('⚡ 30 نقطة');if(pts>=60)bd.push('🏆 كل التحديات');
const fi=h('input',{type:'file',accept:'application/json','aria-label':'استيراد التقدم'});
fi.addEventListener('change',()=>{const f=fi.files[0];if(!f)return;if(f.size>1e6){toast('الملف كبير جدًا');return}const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!o||o.v!==1||typeof o.pts!=='number'||!isFinite(o.pts)||o.pts<0||o.pts>1e5)throw 0;
S.s('done',strs(o.done).filter(x=>L.some(l=>l.id===x)));S.s('awarded',strs(o.awarded).filter(x=>C.some(c=>c.id===x)));S.s('fav',strs(o.fav).filter(x=>LIB.some(l=>l.id===x)));S.s('pts',o.pts);toast('تم الاستيراد');route()}catch(e){toast('ملف غير صالح')}};r.readAsText(f)});
return h('div',{},h('h1',{},'التقدم الشخصي'),h('div',{class:'card'},h('p',{},'الدروس المكتملة: '+d.length+' من '+L.length+' ('+pct+'%)'),h('div',{class:'bar',role:'progressbar','aria-valuenow':pct,'aria-valuemin':0,'aria-valuemax':100},h('i',{style:'width:'+pct+'%'})),h('p',{},'النقاط: '+pts),h('p',{},'الشارات: '+(bd.join('، ')||'لا توجد بعد')),S.g('last',null)?A('#/lesson/'+S.g('last',''),'تابع من آخر درس','btn'):null),
h('div',{class:'card'},h('h3',{},'تصدير واستيراد'),h('div',{class:'row'},h('button',{class:'btn',onclick:()=>{const o={v:1,done:S.g('done',[]),awarded:S.g('awarded',[]),fav:S.g('fav',[]),pts};const u=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:'application/json'})),a=h('a',{href:u,download:'progress.json'});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}},'تصدير JSON')),fi))};

V.settings=()=>h('div',{},h('h1',{},'الإعدادات'),h('div',{class:'row'},h('button',{class:'btn',onclick:()=>{S.s('theme',S.g('theme','dark')==='dark'?'light':'dark');applyPrefs()}},'تبديل الوضع الداكن/الفاتح'),h('button',{class:'btn',onclick:()=>{S.s('lang',S.g('lang','ar')==='ar'?'en':'ar');applyPrefs();route()}},'العربية / English')),h('p',{class:'mu'},'تبديل اللغة يغيّر اتجاه الواجهة وقائمة التنقل؛ محتوى الدروس عربي فقط في هذا الإصدار.'));

/* ===== التوجيه ===== */
function route(){const p=(location.hash||'#/home').slice(2).split('/'),f=V[p[0]]||V.home,m=$('#app');
try{m.replaceChildren(f(p[1]))}catch(e){m.replaceChildren(h('p',{class:'out bad'},'حدث خطأ: '+e.message))}
document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===(p[0]==='lesson'?'lessons':p[0])));
$('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');window.scrollTo(0,0)}
$('#menu').addEventListener('click',()=>{const o=$('#nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',o)});
window.addEventListener('hashchange',route);
applyPrefs();route();
