"""Build public/audit/index.html from a slideshow deck exported by Caitlyn.

Adds the lead form as a final slide (wired to /api/audit-lead, with the
"You're in" next-steps screen), stops arrow keys changing slides while
typing in the form, slims the phone nav bar, and auto-fits slide content
to short phone screens. Run it on each new version of the deck:

  python3 -I scripts/build-audit-deck.py path/to/deck.html public/audit/index.html
"""
import sys

src, out = sys.argv[1], sys.argv[2]
s = open(src).read()

# 1. Add the lead form as a new final slide, after "How it works".
last = s.rindex('<section class="s">')
end = s.index("</section>", last) + len("</section>")
assert 'id="get-audited"' not in s, "deck already has the lead form"
form_slide = """<section class="s dark lf" id="get-audited"><div class="lf-in" id="lf1">
<h2 class="lf-h">Where&rsquo;s your $8,200 hiding?</h2>
<p class="lf-sub">Every house leaks somewhere. Let&rsquo;s find yours.</p>
<form id="lff" novalidate>
<label>Name<input name="name" type="text" autocomplete="name" required></label>
<label>Email<input name="email" type="email" autocomplete="email" inputmode="email" required></label>
<label>How many houses?<select name="houses" required><option value="">Choose one</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option value="6-10">6&ndash;10</option><option value="11+">11+</option></select></label>
<input name="hp_7c2f" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" class="lf-hp">
<button type="submit">Find my leaks &rarr;</button>
<p class="lf-fine">$500 per property &middot; Money back if I don&rsquo;t find at least $500 in savings</p>
<div class="lf-m" role="status" aria-live="polite"></div>
</form></div>
<div class="lf-in lf2" id="lf2" hidden tabindex="-1"></div></section>"""
s = s[:end] + "\n" + form_slide + s[end:]

# 2. Styles for the form slide, matching the deck (deep teal, gold, white).
css = """/* lead form (last slide) */
.s.lf{overflow-y:auto;justify-content:center}
.lf-in{width:100%;max-width:560px;margin:auto 0}
.lf-h{color:#fff;font-size:clamp(30px,min(7.4vw,6.2vh),58px)}
.lf-sub{color:#cfe2df;font-size:clamp(16px,2.4vh,21px);line-height:1.4;margin-top:1.4vh}
#lff{display:flex;flex-direction:column;gap:1.7vh;margin-top:3.4vh}
#lff label{display:flex;flex-direction:column;gap:6px;font-size:14px;font-weight:bold;color:#cfe2df}
#lff input,#lff select{font:inherit;font-size:16px;font-weight:normal;padding:12px 14px;border:1px solid #2f5553;border-radius:10px;background:#fff;color:var(--ink);width:100%}
#lff select{appearance:none;-webkit-appearance:none;background-image:linear-gradient(45deg,transparent 50%,var(--teal) 50%),linear-gradient(135deg,var(--teal) 50%,transparent 50%);background-position:calc(100% - 20px) 50%,calc(100% - 14px) 50%;background-size:6px 6px;background-repeat:no-repeat;padding-right:38px}
#lff input:focus,#lff select:focus{outline:3px solid var(--gold);outline-offset:1px}
#lff .bad{border-color:#f08a7e;outline:2px solid #f08a7e}
#lff .lf-hp{display:none!important}
#lff button{margin-top:.8vh;font:inherit;font-size:18px;font-weight:bold;padding:15px;border:0;border-radius:10px;background:var(--gold);color:var(--deep);cursor:pointer}
#lff button:hover{background:#ecb965}#lff button:disabled{opacity:.6;cursor:default}
.lf-fine{font-size:13px;line-height:1.4;color:#9fbcb8;text-align:center;margin-top:-.6vh}
.lf-m{font-size:14px;color:#f6b3aa;min-height:1em;text-align:center}
.lf2[hidden]{display:none}.lf2:focus{outline:none}
.lf-p{color:var(--gold);font-weight:bold;font-size:clamp(20px,3.2vh,28px);line-height:1.25;margin-top:1.2vh}
.lf-n{color:#9fbcb8;font-size:15px;margin-top:.6vh}
.lf2 ol{padding-left:22px;margin:2.4vh 0;color:#cfe2df;font-size:clamp(15px,2.1vh,18px);line-height:1.5}.lf2 li{margin-bottom:1vh}.lf2 li b{color:#fff}
.lf-q{color:#cfe2df;font-size:15px;margin-top:2vh}.lf-q a{color:var(--gold)}
/* phones: slimmer nav bar so every slide gets more height */
@media (max-width:899px){
 .deck{bottom:52px!important}.bar{bottom:52px}
 .nav{height:52px;padding-top:0;padding-bottom:0}.nav button{width:38px;height:38px;font-size:18px}
 .nav .c{font-size:13px}.nav .h{font-size:11px}
}
/* short screens: tighten the form slide (inputs stay 16px so iPhones don't zoom) */
@media (max-height:640px){
 .s.lf{padding-top:2.4vh;padding-bottom:2vh}
 .lf-h{font-size:clamp(24px,min(7vw,5.6vh),40px)}
 .lf-sub{font-size:15px;margin-top:6px}
 #lff{gap:9px;margin-top:14px}
 #lff label{gap:4px;font-size:13px}
 #lff input,#lff select{padding:9px 12px}
 #lff button{padding:12px;font-size:17px;margin-top:2px}
 .lf-fine{font-size:12px;margin-top:0}
 .lf-p{font-size:19px;margin-top:6px}.lf-n{font-size:13px}
 .lf2 ol{font-size:14px;margin:10px 0;line-height:1.4}.lf2 li{margin-bottom:4px}
 .lf2 .guar{font-size:14px;padding:8px 12px}.lf-q{font-size:14px;margin-top:10px}
}
"""
anchor = "</style>"
assert s.count(anchor) == 1
s = s.replace(anchor, css + anchor, 1)

# 3. Don't change slides when the arrow keys are used inside the form.
old_keys = "document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);"
assert s.count(old_keys) == 1
s = s.replace(old_keys, "document.addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='ArrowRight')go(1);", 1)

# 4. Form script: send the lead, then show the price and next steps.
#    Plus an auto-fit script that scales a slide's content down (to no
#    less than 80%) when it is taller than the screen, so short phones
#    don't have to scroll. The form slide is skipped: its inputs must stay
#    16px or iPhones zoom in on them.
js = r"""<script>
// Auto-fit: shrink slide content that doesn't fit the screen height.
(function(){
var MIN=0.8,slides=[].slice.call(document.querySelectorAll('.deck .s'));
function fitOne(s){
  if(s.id==='get-audited')return;
  var kids=[].slice.call(s.children),z=1;
  kids.forEach(function(k){k.style.zoom='';});
  while(s.scrollHeight>s.clientHeight+1&&z>MIN){
    z=Math.max(MIN,z-0.025);
    kids.forEach(function(k){k.style.zoom=z;});
  }
}
function fitAll(){slides.forEach(fitOne);}
var t;function later(){clearTimeout(t);t=setTimeout(fitAll,120);}
if(document.readyState==='complete')fitAll();else addEventListener('load',fitAll);
addEventListener('resize',later);addEventListener('orientationchange',later);
})();
</script>
<script>
// Lead form on the last slide: sends the lead to /api/audit-lead, then
// shows the price and next steps without a page reload.
(function(){
var ZELLE='velloraconsulting@gmail.com'; // Caitlyn's Zelle
var f=document.getElementById('lff');if(!f)return;
var m=f.querySelector('.lf-m'),b=f.querySelector('button'),s1=document.getElementById('lf1'),s2=document.getElementById('lf2'),slide=document.getElementById('get-audited');
var EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function el(t,c,kids){var e=document.createElement(t);if(c)e.className=c;(kids||[]).forEach(function(k){e.appendChild(typeof k==='string'?document.createTextNode(k):k);});return e;}
function money(n){return '$'+n.toLocaleString('en-US');}
function step2(name,houses){
  var first=name.split(/\s+/)[0],n=houses==='6-10'?6:houses==='11+'?0:+houses,total=n*500,kids=[];
  kids.push(el('h2','lf-h',['You’re in, '+first+'!']));
  if(n){kids.push(el('p','lf-p',['Your audit: '+n+' house'+(n===1?'':'s')+' × $500 = '+money(total)]));
    if(houses==='6-10')kids.push(el('p','lf-n',['Final price depends on house count.']));}
  else kids.push(el('p','lf-p',['Larger portfolios get a custom quote. I’ll email you within a day.']));
  var memo='“'+name+' Audit”';
  var pay=n?[el('b','',['Pay by Zelle: ']),money(total)+' to '+ZELLE+', memo: '+memo+'.']
           :[el('b','',['Pay by Zelle ']),'once you have your quote, to '+ZELLE+', memo: '+memo+'.'];
  kids.push(el('ol','',[el('li','',pay),
    el('li','',[el('b','',['Intake form. ']),'Once payment lands, I’ll email the intake form (about 30 minutes).']),
    el('li','',[el('b','',['Report and call. ']),'Report in about 5 business days, then a 45-minute walkthrough call.'])]));
  kids.push(el('div','guar',[el('small','',['Money-back guarantee']),'If the audit doesn’t find you at least $500 a year in savings per house, you get your money back.']));
  var a=el('a','',['ColivingCait@gmail.com']);a.href='mailto:ColivingCait@gmail.com';
  kids.push(el('p','lf-q',['Questions first? Email ',a]));
  kids.forEach(function(k){s2.appendChild(k);});
  s1.hidden=true;s1.style.display='none';s2.hidden=false;slide.scrollTop=0;s2.focus({preventScroll:true});
}
f.addEventListener('submit',function(e){e.preventDefault();
  var d={name:f.name.value.trim().replace(/\s+/g,' '),email:f.email.value.trim(),houses:f.houses.value,company:f.hp_7c2f.value};
  var bad=[];if(!d.name)bad.push(f.name);if(!EMAIL.test(d.email))bad.push(f.email);if(!d.houses)bad.push(f.houses);
  [f.name,f.email,f.houses].forEach(function(x){x.classList.toggle('bad',bad.indexOf(x)>-1);});
  if(bad.length){m.textContent='Please fill in your name, email and how many houses you have.';bad[0].focus();return;}
  m.textContent='';b.disabled=true;b.textContent='One moment…';
  fetch('/api/audit-lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
  .then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(!r.ok)throw new Error(j.error);});})
  .then(function(){step2(d.name,d.houses);})
  .catch(function(err){b.disabled=false;b.textContent='Find my leaks →';m.textContent=(err&&err.message)||'Something went wrong. Please try again, or email ColivingCait@gmail.com.';});
});})();
</script></body>"""
assert s.count("</body>") == 1
s = s.replace("</body>", js, 1)

open(out, "w").write(s)
print("written", len(s))
