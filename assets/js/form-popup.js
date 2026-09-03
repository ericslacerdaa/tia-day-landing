/* ============================================================
   Pop-up de agendamento — janelinha flutuante no canto inferior direito.
   Reaproveita o mesmo formulário e a lógica do form.js (tiaday_bindForm).
   Não aparece em páginas com <body data-no-popup="1">.
   ============================================================ */
(function(){
  "use strict";
  if(document.body.getAttribute("data-no-popup") === "1") return;

  var wa = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4-1.1l-.3-.2-2.8.7.7-2.8-.2-.3A8 8 0 1112 20z"/></svg>';
  var cal = '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  // Launcher
  var launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "form-pop-launcher";
  launcher.setAttribute("aria-label", "Agendar consulta");
  launcher.innerHTML = cal + '<span>Agendar consulta</span>';

  // Painel
  var pop = document.createElement("div");
  pop.className = "form-pop";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-label", "Agendar a consulta do seu filho");
  pop.innerHTML =
    '<div class="form-pop-head">' +
      '<div><h3>Agende a consulta</h3><p>A mensagem já vai montada para o WhatsApp.</p></div>' +
      '<button type="button" class="form-pop-close" aria-label="Fechar">&times;</button>' +
    '</div>' +
    '<div class="form-pop-body">' +
      '<form class="wa-form" novalidate>' +
        '<label>Nome do responsável<input name="nome" type="text" placeholder="Seu nome" required /></label>' +
        '<label>WhatsApp<input name="tel" type="tel" inputmode="tel" placeholder="(31) 9 9999-9999" required /></label>' +
        '<label>Idade da criança <span class="opt">(opcional)</span><input name="idade" type="text" placeholder="Ex.: 3 anos, ou 8 meses" /></label>' +
        '<label>Primeira consulta ou acompanhamento? <span class="opt">(opcional)</span>' +
          '<select name="tipo"><option value="">Selecione</option><option>Primeira consulta</option><option>Acompanhamento / retorno</option></select></label>' +
        '<label>Melhor período <span class="opt">(opcional)</span>' +
          '<select name="periodo"><option value="">Selecione</option><option>Manhã</option><option>Tarde</option><option>Indiferente</option></select></label>' +
        '<p class="form-note">Vai direto para a conversa no WhatsApp. Esta página não guarda nem envia nada para nenhum outro lugar.</p>' +
        '<button type="submit" class="btn btn-enviar btn-lg">' + wa + ' Enviar no WhatsApp</button>' +
      '</form>' +
    '</div>';

  document.body.appendChild(launcher);
  document.body.appendChild(pop);

  // liga a lógica de envio no formulário do pop-up
  var form = pop.querySelector("form.wa-form");
  if(window.tiaday_bindForm) window.tiaday_bindForm(form);

  function open(){ pop.classList.add("open"); launcher.classList.add("hidden"); setTimeout(function(){ var f=pop.querySelector('[name="nome"]'); if(f) f.focus(); }, 300); }
  function close(){ pop.classList.remove("open"); launcher.classList.remove("hidden"); }

  launcher.addEventListener("click", open);
  pop.querySelector(".form-pop-close").addEventListener("click", close);
  document.addEventListener("keydown", function(e){ if(e.key === "Escape" && pop.classList.contains("open")) close(); });
})();
