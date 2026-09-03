/* ============================================================
   Formulário de agendamento -> monta a mensagem e abre o WhatsApp.
   Não guarda nem envia nada para nenhum servidor (100% no navegador).
   ============================================================ */
(function(){
  "use strict";

  var WHATSAPP = "5531990606482"; // DDI+DDD+número, só dígitos

  var LABELS = {
    "check-up": "check-up inicial",
    "recem-nascidos": "recém-nascidos",
    "troca-de-dentes": "troca de dentes",
    "primeiros-dentinhos": "primeiros dentinhos"
  };

  function val(form, name){
    var el = form.querySelector('[name="'+name+'"]');
    return el ? (el.value || "").trim() : "";
  }

  function montarMensagem(form){
    var nome = val(form,"nome");
    var tel = val(form,"tel");
    var idade = val(form,"idade");
    var tipo = val(form,"tipo");
    var periodo = val(form,"periodo");
    var campanha = document.body.getAttribute("data-campanha") || "site";

    var linhas = [];
    linhas.push(nome ? ("Olá! Meu nome é " + nome + ".") : "Olá!");
    linhas.push("Gostaria de agendar uma consulta para meu filho(a). 😊");
    linhas.push("");
    if(idade)   linhas.push("• Idade da criança: " + idade);
    if(tipo)    linhas.push("• " + tipo);
    if(periodo) linhas.push("• Melhor período: " + periodo);
    if(tel)     linhas.push("• Meu WhatsApp: " + tel);
    if(LABELS[campanha]) { linhas.push(""); linhas.push("(Vim pela página de " + LABELS[campanha] + ")"); }

    return linhas.join("\n");
  }

  function handle(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var nome = val(form,"nome");
      var tel = val(form,"tel");
      // validação mínima
      var ok = true;
      [["nome",nome],["tel",tel]].forEach(function(p){
        var el = form.querySelector('[name="'+p[0]+'"]');
        if(el){ el.classList.toggle("erro", !p[1]); if(!p[1]) ok = false; }
      });
      if(!ok){
        var first = form.querySelector(".erro");
        if(first) first.focus();
        return;
      }
      var phone = form.getAttribute("data-phone") || WHATSAPP;
      var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(montarMensagem(form));

      // rastreamento (GA4 / fila local), se disponível
      var campanha = document.body.getAttribute("data-campanha") || "site";
      try{ if(window.tiaday_track){ window.tiaday_track("form_submit", {campanha:campanha}); }
           else if(typeof window.gtag==="function"){ window.gtag("event","form_submit",{campanha:campanha}); } }catch(err){}
      try{ if(window.tiaday_lead) window.tiaday_lead("formulario"); }catch(err){}

      window.open(url, "_blank");
    });

    // remove estado de erro ao digitar
    form.querySelectorAll("input,select").forEach(function(el){
      el.addEventListener("input", function(){ el.classList.remove("erro"); });
    });
  }

  // expõe para o pop-up (form injetado depois) reutilizar a mesma lógica
  window.tiaday_bindForm = handle;
  document.querySelectorAll("form.wa-form").forEach(handle);
})();
