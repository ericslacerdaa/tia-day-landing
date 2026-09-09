/* ============================================================
   RASTREAMENTO CENTRAL — Meta Pixel + Google (GA4 / Google Ads)
   ------------------------------------------------------------
   COLE SEUS IDs ABAIXO. Deixe "" (vazio) no que não for usar.
   Enquanto estiverem vazios, NADA é carregado (site fica limpo).
   Seguro para carregar no <head> (não depende do body existir).
   ============================================================ */
(function(){
  "use strict";

  var IDS = {
    ga4:       "G-2194G7EJKR",       // Google Analytics 4
    googleAds: "",                    // Google Ads — ex: "AW-123456789"
    adsLabel:  "",                    // rótulo de conversão do Google Ads
    metaPixel: "1408935801179368"     // Meta/Facebook Pixel
  };

  // Lê a campanha da página no momento do uso (body pode não existir ainda no <head>)
  function getCampanha(){ return (document.body && document.body.getAttribute("data-campanha")) || "site"; }
  var pagina = location.pathname.split("/").pop() || "index";

  /* ---- Captura e guarda os UTMs da campanha (persistem na sessão) ---- */
  var UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
  var utm = {};
  try{ utm = JSON.parse(sessionStorage.getItem("tiaday_utm") || "{}"); }catch(e){}
  try{
    var sp = new URLSearchParams(location.search);
    UTM_KEYS.forEach(function(k){ if(sp.get(k)) utm[k] = sp.get(k); });
    if(sp.get("gclid"))  utm.gclid  = sp.get("gclid");
    if(sp.get("fbclid")) utm.fbclid = sp.get("fbclid");
    sessionStorage.setItem("tiaday_utm", JSON.stringify(utm));
  }catch(e){}
  window.tiaday_utm = function(){ return utm; };
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
    (document.head || document.documentElement).appendChild(g);
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

  /* ---- Conversões ---- */
  function adsConversion(){
    if(window.gtag && IDS.googleAds && IDS.adsLabel){
      gtag("event", "conversion", { send_to: IDS.googleAds + "/" + IDS.adsLabel });
    }
  }
  // Clique no WhatsApp = início de conversa (Contact)
  window.tiaday_contact = function(where){
    var c = getCampanha();
    try{ if(window.fbq) fbq("track", "Contact", { content_name: where || "whatsapp", campanha: c }); }catch(e){}
    try{ if(window.gtag && IDS.ga4) gtag("event", "contato_whatsapp", { campanha: c, origem: where || "whatsapp" }); }catch(e){}
    adsConversion();
  };
  // Envio do formulário = Lead
  window.tiaday_lead = function(where){
    var c = getCampanha();
    try{ if(window.fbq) fbq("track", "Lead", { content_name: where || "formulario", campanha: c }); }catch(e){}
    try{ if(window.gtag && IDS.ga4) gtag("event", "generate_lead", { campanha: c, origem: where || "formulario" }); }catch(e){}
    adsConversion();
  };

  /* Qualquer clique em link do WhatsApp dispara o evento Contact */
  document.addEventListener("click", function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp"]') : null;
    if(a && window.tiaday_contact) window.tiaday_contact("whatsapp");
  }, true);

  /* Evento por página (com a campanha correta) — dispara quando o body existe */
  function firePageView(){
    var c = getCampanha();
    try{ if(window.fbq) fbq("trackCustom", "PaginaVista", { campanha: c, pagina: pagina }); }catch(e){}
    try{ if(window.gtag) gtag("event", "pagina_vista", { campanha: c, pagina: pagina }); }catch(e){}
  }
  if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", firePageView); }
  else { firePageView(); }
})();
