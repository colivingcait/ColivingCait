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

# 0. Page title and link preview (iMessage, Slack, Facebook, LinkedIn...).
#    The preview image is public/audit/og.jpg, made by scripts/render-audit-og.js.
import os, re
TITLE = "Coliving Portfolio Performance Audit"
DESC = "Full rooms, thin margins? Find out what your PadSplit houses really earn, and where the money's leaking. $500 per property, money back guarantee."
OG_IMAGE = "https://www.colivingcait.com/audit/og.jpg"
_meta = f"""<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<link rel="canonical" href="https://www.colivingcait.com/audit">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Coliving Cait">
<meta property="og:url" content="https://www.colivingcait.com/audit">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:image" content="{OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Full rooms. Thin margins. $8,200 a year left on the table.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{OG_IMAGE}">"""
s, _n = re.subn(r"<title>.*?</title>", lambda m: _meta, s, count=1, flags=re.S)
assert _n == 1, "deck has no <title>"

# 0b. Realistic bill + banded stack artwork (scripts/money.svg), used by the
#     money pile, falling bills and the money rain.
_money = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "money.svg")).read()
_money = re.sub(r"<!--.*?-->", "", _money, flags=re.S).strip()
s, _n = re.subn(r"(<body[^>]*>)", lambda m: m.group(1) + _money, s, count=1)
assert _n == 1, "deck has no <body>"

# 1. Add the lead form as a new final slide, after "How it works".
last = s.rindex('<section class="s">')
end = s.index("</section>", last) + len("</section>")
assert 'id="get-audited"' not in s, "deck already has the lead form"
form_slide = """<section class="s dark lf" id="get-audited"><div class="lf-in" id="lf1">
<h2 class="lf-h">Where&rsquo;s your money hiding?</h2>
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
<div class="lf-in lf2" id="lf2" hidden tabindex="-1"></div>
<div class="lf-art" aria-hidden="true"><div class="lf-glow"></div><div class="lf-fallers"><svg viewBox="0 0 240 102" style="left:55%;animation-delay:0.00s;animation-duration:3.6s;--r0:43deg;--r1:179deg;--dx:-17px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:31%;animation-delay:0.55s;animation-duration:4.4s;--r0:-20deg;--r1:-160deg;--dx:22px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:68%;animation-delay:1.10s;animation-duration:3.9s;--r0:12deg;--r1:140deg;--dx:-30px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:40%;animation-delay:1.65s;animation-duration:4.8s;--r0:-35deg;--r1:95deg;--dx:18px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:24%;animation-delay:2.20s;animation-duration:4.1s;--r0:28deg;--r1:-120deg;--dx:35px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:60%;animation-delay:2.75s;animation-duration:3.7s;--r0:-48deg;--r1:60deg;--dx:-12px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:46%;animation-delay:3.30s;animation-duration:4.5s;--r0:8deg;--r1:200deg;--dx:26px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:34%;animation-delay:3.85s;animation-duration:4.0s;--r0:-12deg;--r1:-90deg;--dx:-20px"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:72%;animation-delay:4.40s;animation-duration:4.2s;--r0:30deg;--r1:150deg;--dx:-35px"><use href="#mb-bill"/></svg></div><div class="lf-pile"><svg viewBox="0 0 240 102" style="left:-3%;bottom:-4px;width:132px;height:56px;transform:rotate(-22deg)"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:72%;bottom:-2px;width:128px;height:54px;transform:rotate(19deg)"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 132" style="left:3%;bottom:0px;width:150px;height:82px;transform:rotate(-4deg)"><use href="#mb-stack"/></svg><svg viewBox="0 0 240 132" style="left:33%;bottom:4px;width:150px;height:82px;transform:rotate(2deg)"><use href="#mb-stack"/></svg><svg viewBox="0 0 240 132" style="left:63%;bottom:0px;width:150px;height:82px;transform:rotate(6deg)"><use href="#mb-stack"/></svg><svg viewBox="0 0 240 132" style="left:17%;bottom:54px;width:150px;height:82px;transform:rotate(-7deg)"><use href="#mb-stack"/></svg><svg viewBox="0 0 240 132" style="left:48%;bottom:56px;width:150px;height:82px;transform:rotate(5deg)"><use href="#mb-stack"/></svg><svg viewBox="0 0 240 132" style="left:32%;bottom:106px;width:150px;height:82px;transform:rotate(-3deg)"><use href="#mb-stack"/></svg><svg viewBox="0 0 240 102" style="left:26%;bottom:156px;width:140px;height:60px;transform:rotate(-16deg)"><use href="#mb-bill"/></svg><svg viewBox="0 0 240 102" style="left:44%;bottom:150px;width:136px;height:58px;transform:rotate(13deg)"><use href="#mb-bill"/></svg></div></div></section>"""
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
.lf-go{display:block;margin-top:2.6vh;text-align:center;background:var(--gold);color:var(--deep);font-weight:bold;font-size:19px;padding:16px;border-radius:10px;text-decoration:none}
.lf-go:hover{background:#ecb965}
/* desktop: animated money pile beside the form */
.lf-art{display:none}
@media (min-width:900px){
 .s.lf{flex-direction:row;align-items:center;justify-content:center;gap:5vw}
 .s.lf .lf-in{flex:0 1 560px}
 .lf-art{display:block;position:relative;flex:0 1 480px;height:min(68vh,560px);align-self:center}
}
.lf-glow{position:absolute;left:50%;bottom:4%;width:78%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(226,169,79,.35) 0%,rgba(226,169,79,.12) 45%,rgba(226,169,79,0) 70%);animation:lf-pulse 3.2s ease-in-out infinite}
.lf-pile{position:absolute;left:0;right:0;bottom:5%;height:250px}
.lf-pile svg{position:absolute;overflow:visible;filter:drop-shadow(0 6px 9px rgba(0,0,0,.45))}

.lf-fallers{position:absolute;inset:-8% 0 0;overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 22%);mask-image:linear-gradient(to bottom,transparent 0,#000 22%)}
.lf-fallers svg{position:absolute;top:-12%;width:104px;height:44px;overflow:visible;opacity:0;animation-name:lf-drop;animation-timing-function:cubic-bezier(.45,.05,.55,.95);animation-iteration-count:infinite;filter:drop-shadow(0 6px 8px rgba(0,0,0,.35))}
@keyframes lf-drop{0%{opacity:0;transform:translate(0,0) rotate(var(--r0)) rotateX(0deg)}10%{opacity:1}75%{opacity:1}100%{opacity:0;transform:translate(var(--dx),min(50vh,400px)) rotate(var(--r1)) rotateX(540deg)}}
@keyframes lf-pulse{0%,100%{opacity:.75;transform:translateX(-50%) scale(.96)}50%{opacity:1;transform:translateX(-50%) scale(1.04)}}

@media (prefers-reduced-motion:reduce){.lf-fallers{display:none}.lf-glow{animation:none}}
.lf-rain{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:20}
.lf-rain svg{position:absolute;top:-10vh;overflow:visible;animation-name:lf-fall;animation-timing-function:linear;animation-fill-mode:both;will-change:transform;filter:drop-shadow(0 4px 6px rgba(0,0,0,.3))}
@keyframes lf-fall{from{transform:translate(0,0) rotate(var(--r0)) rotateX(0deg)}to{transform:translate(var(--dx),125vh) rotate(var(--r1)) rotateX(900deg)}}
.lf-count{text-align:center;color:#cfe2df;font-size:15px;margin-top:1.2vh;min-height:1.3em}
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

# 3b. PostHog analytics + session replay (key/region in lib/posthog-config.json;
#     skipped while the key is empty). Loaded through /ingest on this domain.
import json, os
_ph = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib", "posthog-config.json")))
if _ph.get("key"):
    ui_host = "https://eu.posthog.com" if _ph.get("region") == "eu" else "https://us.posthog.com"
    ph_head = """<script>
// PostHog: queue calls until the library has loaded.
window.__ph=function(f){var p=window.posthog;if(p&&p.__loaded)f(p);else(window.__phq=window.__phq||[]).push(f);};
function __phInit(){posthog.init(%s,{api_host:'/ingest',ui_host:%s,defaults:'2025-05-24',
  session_recording:{maskAllInputs:false},
  loaded:function(p){var q=window.__phq||[];window.__phq=[];q.forEach(function(f){f(p);});}});}
</script>
<script src="/ingest/static/array.js" async onload="__phInit()"></script>
""" % (json.dumps(_ph["key"]), json.dumps(ui_host))
    assert s.count("</head>") == 1
    s = s.replace("</head>", ph_head + "</head>", 1)
    ph_slides = r"""<script>
// PostHog: which slides people reach, and when they get to the form.
(function(){
  var deck=document.querySelector('.deck');if(!deck||!window.__ph)return;
  var slides=[].slice.call(deck.querySelectorAll('.s')),seen=-1,t;
  function name(sl,i){
    if(sl.id==='get-audited')return 'Lead form';
    var k=sl.querySelector('.k'),h=sl.querySelector('h1,h2');
    return (k&&k.textContent.trim())||(i===0?'Cover':'')||(h?h.textContent.trim().slice(0,60):'Slide '+(i+1));
  }
  function check(){
    var i=Math.round(deck.scrollLeft/deck.clientWidth);if(i===seen||!slides[i])return;seen=i;
    var props={slide:i+1,of:slides.length,name:name(slides[i],i)};
    __ph(function(p){p.capture('audit_slide_viewed',props);
      if(slides[i].id==='get-audited')p.capture('audit_form_viewed');});
  }
  deck.addEventListener('scroll',function(){if(!t)t=requestAnimationFrame(function(){t=0;check();});},{passive:true});
  check();
})();
</script></body>"""
    assert s.count("</body>") == 1
    s = s.replace("</body>", ph_slides, 1)

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
function rainMoney(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var box=document.createElement('div');box.className='lf-rain';box.setAttribute('aria-hidden','true');
  var NS='http://www.w3.org/2000/svg';
  for(var i=0;i<40;i++){
    var w=58+Math.random()*52,b=document.createElementNS(NS,'svg'),u=document.createElementNS(NS,'use');
    b.setAttribute('viewBox','0 0 240 102');u.setAttribute('href','#mb-bill');b.appendChild(u);
    var r0=Math.round(Math.random()*80-40),r1=r0+Math.round(Math.random()*360-180);
    b.style.cssText='left:'+(Math.random()*100-5)+'%;width:'+w+'px;height:'+(w*102/240)+'px;'+
      'animation-duration:'+(2.4+Math.random()*1.8)+'s;animation-delay:'+(Math.random()*2.2)+'s;'+
      '--dx:'+Math.round(Math.random()*120-60)+'px;--r0:'+r0+'deg;--r1:'+r1+'deg';
    box.appendChild(b);
  }
  document.body.appendChild(box);
  setTimeout(function(){box.remove();},6000);
}
function step2(name,houses,intakeUrl){
  var first=name.split(/\s+/)[0],n=houses==='6-10'?6:houses==='11+'?0:+houses,total=n*500,kids=[];
  kids.push(el('h2','lf-h',['You’re in, '+first+'!']));
  if(n){kids.push(el('p','lf-p',['Your audit: '+n+' house'+(n===1?'':'s')+' × $500 = '+money(total)]));
    if(houses==='6-10')kids.push(el('p','lf-n',['Final price depends on house count.']));}
  else kids.push(el('p','lf-p',['Larger portfolios get a custom quote. I’ll email you within a day.']));
  if(intakeUrl){
    // Hand off straight to their intake page: button now, or automatically.
    kids.push(el('p','lf-sub',['Next up: your 5-minute intake. Upload your P&Ls, share your PadSplit data and answer a few quick questions.']));
    var go=el('a','lf-go',['Start my intake →']);go.href=intakeUrl;
    var count=el('p','lf-count',[]);
    kids.push(go,count);
    kids.push(el('p','lf-n',['I also emailed you this link, so you can come back to it anytime.']));
    rainMoney();
    var left=5,tick=function(){
      if(left<=0){count.textContent='Opening your intake…';location.href=intakeUrl;return;}
      count.textContent='Taking you to your intake in '+left+'…';left--;setTimeout(tick,1000);
    };
    tick();
  }else{
    var memo='“'+name+' Audit”';
    var pay=n?[el('b','',['Pay by Zelle: ']),money(total)+' to '+ZELLE+', memo: '+memo+'.']
             :[el('b','',['Pay by Zelle ']),'once you have your quote, to '+ZELLE+', memo: '+memo+'.'];
    kids.push(el('ol','',[
      el('li','',[el('b','',['Check your inbox. ']),'I just emailed you the next steps for your audit.']),
      el('li','',pay),
      el('li','',[el('b','',['Report and call. ']),'Your audit starts once payment lands. Report in about 5 business days, then a 45-minute walkthrough call.'])]));
    kids.push(el('div','guar',[el('small','',['Money-back guarantee']),'If the audit doesn’t find you at least $500 a year in savings per house, you get your money back.']));
    var a=el('a','',['ColivingCait@gmail.com']);a.href='mailto:ColivingCait@gmail.com';
    kids.push(el('p','lf-q',['Questions first? Email ',a]));
  }
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
  .then(function(r){return r.json().catch(function(){return {};}).then(function(j){if(!r.ok)throw new Error(j.error);return j;});})
  .then(function(j){if(window.__ph)__ph(function(p){p.identify(d.email,{email:d.email,name:d.name,houses:d.houses});p.capture('audit_form_submitted',{houses:d.houses});});step2(d.name,d.houses,j.intakeUrl);})
  .catch(function(err){b.disabled=false;b.textContent='Find my leaks →';m.textContent=(err&&err.message)||'Something went wrong. Please try again, or email ColivingCait@gmail.com.';});
});})();
</script></body>"""
assert s.count("</body>") == 1
s = s.replace("</body>", js, 1)

open(out, "w").write(s)
print("written", len(s))
