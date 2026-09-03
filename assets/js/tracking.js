/* ============================================================
   RASTREAMENTO CENTRAL — Meta Pixel + Google (GA4 / Google Ads)
   ------------------------------------------------------------
   COLE SEUS IDs ABAIXO. Deixe "" (vazio) no que não for usar.
   Enquanto estiverem vazios, NADA é carregado (site fica limpo).
   ============================================================ */
(function(){
  "use strict";

  var IDS = {
    ga4:       "",   // Google Analytics 4  — ex: "G-XXXXXXXXXX"
    googleAds: "",   // Google Ads          — ex: "AW-123456789"
    adsLabel:  "",   // rótulo de conversão do Google Ads (ex: "AbC-D_efG")
    metaPixel: ""    // Meta/Facebook Pixel — ex: "123456789012345"
  };

  /* ---- Google (gtag): serve GA4 e/ou Google Ads ---- */
  if(IDS.ga4 || IDS.googleAds){
    var gid = IDS.ga4 || IDS.googleAds;
    var g = document.createElement("script");
    g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + gid;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date());
    if(IDS.ga4)       gtag("config", IDS.ga4);
    if(IDS.googleAds) gtag("config", IDS.googleAds);
  }

  /* ---- Meta Pixel ---- */
  if(IDS.metaPixel){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", IDS.metaPixel);
    fbq("track", "PageView");
  }

  /* ---- Conversão de "Lead" (WhatsApp / formulário) ---- */
  window.tiaday_lead = function(where){
    try{ if(window.fbq) fbq("track", "Lead", { content_name: where || "" }); }catch(e){}
    try{
      if(window.gtag){
        if(IDS.ga4) gtag("event", "generate_lead", { method: where || "" });
        if(IDS.googleAds && IDS.adsLabel) gtag("event", "conversion", { send_to: IDS.googleAds + "/" + IDS.adsLabel });
      }
    }catch(e){}
  };

  /* Qualquer clique em link do WhatsApp já conta como Lead */
  document.addEventListener("click", function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp"]') : null;
    if(a && window.tiaday_lead) window.tiaday_lead("whatsapp");
  }, true);
})();
