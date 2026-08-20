/* ============================================================
   Comportamentos compartilhados — Landing Pages de campanha
   Configuração central + WhatsApp + animações + FAQ + GA4 events
   ============================================================ */
(function(){
  "use strict";

  // Configuração global do consultório
  const CONFIG = {
    whatsapp: "5531990606482",           // DDI+DDD+número, só dígitos
    instagram: "https://instagram.com/",  // ajustar quando tiver o @
    maps: "https://maps.app.goo.gl/5weKcikMgA9sZADF6"
  };

  // Mensagem específica da campanha (definida em cada página via <body data-wa-msg="...">)
  const campanhaMsg = document.body.getAttribute("data-wa-msg")
    || "Olá! Gostaria de agendar uma consulta com a Dra. Dayane. 😊";
  const campanhaId = document.body.getAttribute("data-campanha") || "site";

  const waUrl = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(campanhaMsg);

  // Aplica o link do WhatsApp em tudo que tiver .js-wa (ou href="#whats")
  document.querySelectorAll('.js-wa, a[href="#whats"]').forEach(function(a){
    a.setAttribute("href", waUrl);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
    a.addEventListener("click", function(){ trackEvent("whatsapp_click", { campanha: campanhaId, local: a.dataset.local || "cta" }); });
  });

  // Ano dinâmico no rodapé
  const y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();

  /* ===== GA4 / rastreamento de eventos ===== */
  function trackEvent(name, params){
    try{ if(typeof window.gtag === "function"){ window.gtag("event", name, params||{}); } }catch(e){}
    // fila local para o dashboard próprio (lida depois via API/serverless)
    try{
      const q = JSON.parse(localStorage.getItem("tiaday_events")||"[]");
      q.push({ name: name, params: params||{}, t: Date.now() });
      localStorage.setItem("tiaday_events", JSON.stringify(q.slice(-200)));
    }catch(e){}
  }
  window.tiaday_track = trackEvent;

  /* ===== Header com fundo ao rolar ===== */
  const header = document.querySelector(".lp-header");
  if(header){ addEventListener("scroll", function(){ header.classList.toggle("scrolled", scrollY > 40); }, {passive:true}); }

  /* ===== Animações de scroll ===== */
  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:.12, rootMargin:"0px 0px -40px 0px" });
  document.querySelectorAll("[data-anim]").forEach(function(el,i){
    el.style.transitionDelay = (Math.min(i%4,3)*0.06)+"s";
    io.observe(el);
  });

  /* ===== FAQ acordeão ===== */
  document.querySelectorAll(".faq-q").forEach(function(q){
    q.addEventListener("click", function(){
      const item = q.parentElement;
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(function(i){ i.classList.remove("open"); const a=i.querySelector(".faq-a"); if(a) a.style.maxHeight=null; });
      if(!open){ item.classList.add("open"); const a=item.querySelector(".faq-a"); if(a) a.style.maxHeight=a.scrollHeight+"px"; }
    });
  });

  /* ===== Contadores animados (faixa de números) ===== */
  const so = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ animate(e.target); so.unobserve(e.target); } });
  }, { threshold:.6 });
  document.querySelectorAll(".stat .num[data-count]").forEach(function(n){ so.observe(n); });
  function animate(el){
    const target = parseFloat(el.dataset.count.replace(",","."));
    const decimals = el.dataset.count.indexOf(",")>-1 ? 1 : 0;
    const prefix = el.dataset.prefix||"", suffix = el.dataset.suffix||"";
    const dur = 1400, start = performance.now();
    function tick(now){
      const p = Math.min((now-start)/dur,1);
      const eased = 1-Math.pow(1-p,3);
      el.textContent = prefix + (target*eased).toFixed(decimals).replace(".",",") + suffix;
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // pageview inicial da campanha
  trackEvent("lp_view", { campanha: campanhaId });
})();
