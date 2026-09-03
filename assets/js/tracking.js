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

  // Identifica a página atual (para rastrear cada uma individualmente)
  var campanha = document.body.getAttribute("data-campanha") || "site";
  var pagina = location.pathname.split("/").pop() || "index";

  /* ---- Captura e guarda os UTMs da campanha (persistem na sessão) ---- */
  var UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
  var utm = {};
  try{ utm = JSON.parse(sessionStorage.getItem("tiaday_utm") || "{}"); }catch(e){}
  try{
    var sp = new URLSearchParams(location.search);
    UTM_KEYS.forEach(function(k){ if(sp.get(k)) utm[k] = sp.get(k); });
    if(sp.get("gclid"))  utm.gclid  = sp.get("gclid");   // Google Ads click id
    if(sp.get("fbclid")) utm.fbclid = sp.get("fbclid");  // Meta click id
    sessionStorage.setItem("tiaday_utm", JSON.stringify(utm));
  }catch(e){}

  window.tiaday_utm = function(){ return utm; };
  // Linhas legíveis da origem, para irem dentro da mensagem do WhatsApp
  window.tiaday_utm_lines = function(){
    var lines = [];
    UTM_KEYS.forEach(function(k){ if(utm[k]) lines.push(k.replace("utm_","") + ": " + utm[k]); });
    return lines;
  };

  /* ---- Google (gtag): GA4 e/ou Google Ads ---- */
  if(IDS.ga4 || IDS.googleAds){
    var gid = IDS.ga4 || IDS.googleAds;
    var g = document.createElement("script");
    g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + gid;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ dataLayer.push(arguments); };
    gtag("js", new Date());
    if(IDS.ga4)       gtag("config", IDS.ga4,       { page_path: location.pathname });
    if(IDS.googleAds) gtag("config", IDS.googleAds);
  }

  /* ---- Meta Pixel ---- */
  if(IDS.metaPixel){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", IDS.metaPixel);
    fbq("track", "PageView");
    // evento por página (permite ver cada LP separadamente no Ads Manager)
    fbq("trackCustom", "PaginaVista", { campanha: campanha, pagina: pagina });
  }
  try{ if(window.gtag) gtag("event", "pagina_vista", { campanha: campanha, pagina: pagina }); }catch(e){}

  /* ---- Conversões ---- */
  function adsConversion(){
    if(window.gtag && IDS.googleAds && IDS.adsLabel){
      gtag("event", "conversion", { send_to: IDS.googleAds + "/" + IDS.adsLabel });
    }
  }
  // Clique no WhatsApp = início de conversa (Contact)
  window.tiaday_contact = function(where){
    try{ if(window.fbq) fbq("track", "Contact", { content_name: where || "whatsapp", campanha: campanha }); }catch(e){}
    try{ if(window.gtag && IDS.ga4) gtag("event", "contato_whatsapp", { campanha: campanha, origem: where || "whatsapp" }); }catch(e){}
    adsConversion();
  };
  // Envio do formulário = Lead
  window.tiaday_lead = function(where){
    try{ if(window.fbq) fbq("track", "Lead", { content_name: where || "formulario", campanha: campanha }); }catch(e){}
    try{ if(window.gtag && IDS.ga4) gtag("event", "generate_lead", { campanha: campanha, origem: where || "formulario" }); }catch(e){}
    adsConversion();
  };

  /* Qualquer clique em link do WhatsApp dispara o evento Contact */
  document.addEventListener("click", function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp"]') : null;
    if(a && window.tiaday_contact) window.tiaday_contact("whatsapp");
  }, true);
})();
