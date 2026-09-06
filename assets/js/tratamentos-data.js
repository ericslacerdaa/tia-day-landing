/* ============================================================
   Conteúdo das mini-páginas de tratamentos/procedimentos.
   Editar aqui adiciona/atualiza uma página automaticamente.
   ============================================================ */
window.TRATAMENTOS = {
  ordem: ["prevencao","limpeza","fluor","selantes","carie","canal","frenectomia","frenotomia","traumatismos","respiracao-bucal","bruxismo","mantenedores"],
  itens: {
    "prevencao": {
      cat: "Prevenção", title: "Prevenção",
      intro: "O cuidado que evita problemas antes mesmo de eles aparecerem — o melhor presente para o sorriso do seu filho.",
      blocks: [
        {h:"O que é", p:"Um acompanhamento regular que mantém a boca saudável com orientação de higiene, dieta e hábitos adequados para cada idade."},
        {h:"Quando é indicado", p:"Para todas as crianças, desde o primeiro dentinho. Consultas preventivas periódicas evitam cáries e tratamentos maiores."},
        {h:"Como cuidamos na Tia Day", p:"Avaliação completa, aplicação de flúor quando indicado e um plano de prevenção personalizado, com orientação clara para os pais."}
      ],
      faq: [{q:"De quanto em quanto tempo devo voltar?", a:"Em geral a cada 6 meses, mas a Dra. define o intervalo ideal conforme o risco de cada criança."}]
    },
    "limpeza": {
      cat: "Prevenção", title: "Limpeza (Profilaxia)",
      intro: "Uma higienização profissional, suave e delicada, que deixa os dentinhos limpos e protegidos.",
      blocks: [
        {h:"O que é", p:"A remoção da placa e de resíduos que a escovação em casa não alcança, seguida de polimento e, quando indicado, flúor."},
        {h:"Quando é indicado", p:"Nas consultas de rotina, para prevenir cáries e gengivite e manter o hálito e a saúde bucal em dia."},
        {h:"Como fazemos", p:"Com técnica gentil e no tempo da criança, transformando a limpeza numa experiência tranquila e até divertida."}
      ]
    },
    "fluor": {
      cat: "Prevenção", title: "Aplicação de Flúor",
      intro: "Uma camada extra de proteção que fortalece o esmalte e ajuda a prevenir a cárie.",
      blocks: [
        {h:"O que é", p:"A aplicação profissional de flúor, que reforça o esmalte dos dentes e o torna mais resistente aos ácidos que causam cárie."},
        {h:"Quando é indicado", p:"Especialmente em crianças com maior risco de cárie, como parte do acompanhamento preventivo."},
        {h:"Como fazemos", p:"De forma rápida, indolor e segura, sempre com a dose adequada para a idade da criança."}
      ]
    },
    "selantes": {
      cat: "Prevenção", title: "Selantes",
      intro: "Uma barreira protetora nos dentes de trás, onde a cárie mais costuma aparecer.",
      blocks: [
        {h:"O que é", p:"Uma fina resina que sela os sulcos dos dentes posteriores, impedindo o acúmulo de placa nas regiões de difícil escovação."},
        {h:"Quando é indicado", p:"Principalmente nos molares recém-nascidos (de leite e permanentes), como reforço da prevenção."},
        {h:"Como fazemos", p:"Aplicação simples, sem dor e sem anestesia — em poucos minutos o dente fica protegido."}
      ]
    },
    "carie": {
      cat: "Procedimento", title: "Tratamento de Cárie",
      intro: "Restaurações suaves e seguras para devolver a saúde e o conforto ao dentinho.",
      blocks: [
        {h:"O que é", p:"A remoção da cárie e a restauração do dente com materiais modernos, devolvendo função e estética."},
        {h:"Quando é indicado", p:"Ao primeiro sinal de cárie. Quanto antes tratada, mais simples e confortável é o procedimento."},
        {h:"Como cuidamos na Tia Day", p:"Com anestesia computadorizada e técnicas minimamente invasivas, para uma experiência sem trauma."}
      ],
      faq: [{q:"Vai doer?", a:"Trabalhamos para que não. A anestesia computadorizada torna a aplicação muito mais confortável — a maioria das crianças nem percebe."}]
    },
    "canal": {
      cat: "Procedimento", title: "Canal em Dente de Leite",
      intro: "Preservar o dente de leite é essencial — ele guarda o espaço e guia o dente permanente.",
      blocks: [
        {h:"O que é", p:"O tratamento do interior do dente de leite muito afetado por cárie ou trauma, evitando a extração precoce."},
        {h:"Quando é indicado", p:"Quando a cárie atinge a polpa do dente ou há dor e infecção, mas o dente ainda pode ser preservado."},
        {h:"Como cuidamos na Tia Day", p:"Com muito acolhimento, anestesia confortável e acompanhamento próximo dos pais em cada etapa."}
      ]
    },
    "frenectomia": {
      cat: "Procedimento", title: "Frenectomia",
      intro: "Uma correção precisa do freio (da língua ou do lábio) com laser — rápida e com recuperação tranquila.",
      blocks: [
        {h:"O que é", p:"O procedimento que corrige o freio quando ele limita os movimentos da língua ou do lábio."},
        {h:"Quando é indicado", p:"Em casos de língua ou lábio presos que interferem na fala, na higiene, no espaçamento dos dentes ou na amamentação."},
        {h:"Como cuidamos na Tia Day", p:"Com laser cirúrgico: menos sangramento, menos inchaço e recuperação mais rápida e confortável."}
      ]
    },
    "frenotomia": {
      cat: "Procedimento · Bebês", title: "Frenotomia (Teste da Linguinha)",
      intro: "A avaliação e correção da língua presa do bebê, tão importante para a amamentação.",
      blocks: [
        {h:"O que é", p:"A avaliação do frênulo lingual do bebê e, quando necessário, sua liberação — um procedimento simples e rápido."},
        {h:"Quando é indicado", p:"Nos primeiros meses, quando a língua presa dificulta a pega, causa dor ao amamentar ou afeta o ganho de peso."},
        {h:"Como cuidamos na Tia Day", p:"Com todo o cuidado com o bebê e acolhimento à mãe, orientando a amamentação antes e depois."}
      ]
    },
    "traumatismos": {
      cat: "Urgência", title: "Traumatismos Dentários",
      intro: "Caiu e machucou o dente? Mantenha a calma — a gente cuida do seu filho com rapidez e carinho.",
      blocks: [
        {h:"O que é", p:"O atendimento de dentes quebrados, deslocados ou avulsionados (que saíram) após quedas e batidas."},
        {h:"O que fazer na hora", p:"Mantenha a calma, guarde o pedaço/dente (em leite ou soro, se possível) e entre em contato imediatamente."},
        {h:"Como cuidamos na Tia Day", p:"Atendimento de urgência para acolher a família e resolver o problema com o máximo de conforto."}
      ],
      faq: [{q:"É urgência 24h?", a:"Sim. Em caso de trauma, fale conosco imediatamente pelo WhatsApp para orientarmos o próximo passo."}]
    },
    "respiracao-bucal": {
      cat: "Problema", title: "Respiração Bucal",
      intro: "Seu filho respira pela boca, ronca ou dorme mal? Vale investigar — isso afeta o sono e o desenvolvimento.",
      blocks: [
        {h:"O que é", p:"O hábito de respirar pela boca em vez do nariz, que pode alterar o crescimento da face, a mordida e a qualidade do sono."},
        {h:"Quando avaliar", p:"Ao notar boca sempre aberta, ronco, sono agitado, olheiras ou dificuldade de atenção."},
        {h:"Como cuidamos na Tia Day", p:"Avaliação especializada e orientação, com encaminhamento integrado quando necessário."}
      ]
    },
    "bruxismo": {
      cat: "Problema", title: "Bruxismo Infantil",
      intro: "Aquele ranger de dentes durante o sono tem explicação — e acompanhamento.",
      blocks: [
        {h:"O que é", p:"O ato de ranger ou apertar os dentes, comum na infância, que pode desgastar os dentes e causar desconforto."},
        {h:"Quando avaliar", p:"Ao ouvir o ranger à noite, notar desgaste nos dentes ou queixas de dor na face/cabeça."},
        {h:"Como cuidamos na Tia Day", p:"Acompanhamento, orientação e proteção do sorriso, investigando também as possíveis causas."}
      ]
    },
    "mantenedores": {
      cat: "Procedimento", title: "Mantenedores de Espaço",
      intro: "Quando um dente de leite cai cedo demais, guardamos o lugar do permanente.",
      blocks: [
        {h:"O que é", p:"Um pequeno aparelho que preserva o espaço deixado por um dente de leite perdido precocemente."},
        {h:"Quando é indicado", p:"Após a perda antecipada de um dente de leite, para evitar que os vizinhos ocupem o espaço do permanente."},
        {h:"Como cuidamos na Tia Day", p:"Planejamento individualizado e acompanhamento até o nascimento do dente permanente."}
      ]
    }
  }
};
