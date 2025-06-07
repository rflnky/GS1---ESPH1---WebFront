const menuBtn = document.querySelector(".navbar-toggle");
const menu = document.querySelector(".navbar-menu");

menuBtn.addEventListener("click", () => {
  const ativo = menu.classList.toggle("ativo");
  menuBtn.classList.toggle("ativo");
  menuBtn.setAttribute("aria-expanded", ativo);
});

document.addEventListener("click", function (e) {
  if (
    menu.classList.contains("ativo") &&
    !menu.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    menu.classList.remove("ativo");
    menuBtn.classList.remove("ativo");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".navbar-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("ativo");
    menuBtn.classList.remove("ativo");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".tema-switcher button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.className = `tema-${btn.dataset.tema}`;
  });
});

let slideAtual = 0;
const slides = document.querySelectorAll(".slide");

function mostrarSlide(n) {
  slides.forEach((slide, i) => slide.classList.toggle("ativo", i === n));
}

document.querySelector(".slide-btn.next").onclick = () => {
  slideAtual = (slideAtual + 1) % slides.length;
  mostrarSlide(slideAtual);
};

document.querySelector(".slide-btn.prev").onclick = () => {
  slideAtual = (slideAtual - 1 + slides.length) % slides.length;
  mostrarSlide(slideAtual);
};

mostrarSlide(slideAtual);

const form = document.getElementById("formEmergencia");
if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const local = document.getElementById("local").value.trim();
    const desc = document.getElementById("descricao").value.trim();
    const erro = document.getElementById("msgErro");

    if (!nome || !local || !desc) {
      erro.textContent = "Todos os campos são obrigatórios!";
    } else {
      erro.textContent = "";
      alert("Pedido enviado! Aguarde contato da equipe SafeChat.");
      form.reset();
    }
  };
}

const quizzes = {
  usuario: [
    {
      q: "Qual o número da Defesa Civil?",
      op: ["190", "199", "192"],
      a: "199",
    },
    {
      q: "O que NÃO fazer na enchente?",
      op: ["Ficar em área baixa", "Ouvir alertas", "Buscar abrigo alto"],
      a: "Ficar em área baixa",
    },
    {
      q: "O que pode ajudar em crise de ansiedade?",
      op: ["Respiração lenta", "Ignorar sentimentos", "Ficar isolado"],
      a: "Respiração lenta",
    },
    {
      q: "Como avisar familiares em perigo?",
      op: ["Usar chat/app", "Ficar em silêncio", "Aguardar"],
      a: "Usar chat/app",
    },
    {
      q: "O que é seguro em enchentes?",
      op: [
        "Permanecer em local elevado",
        "Atravessar correnteza",
        "Ficar perto de fios",
      ],
      a: "Permanecer em local elevado",
    },
    {
      q: "Quando pedir ajuda?",
      op: ["Assim que perceber risco", "Depois da enchente", "Nunca"],
      a: "Assim que perceber risco",
    },
    {
      q: "Que canal é útil para apoio emocional?",
      op: ["Chat de suporte", "Redes desconhecidas", "Ignorar o problema"],
      a: "Chat de suporte",
    },
    {
      q: "Ao sentir ansiedade devo:",
      op: ["Buscar apoio", "Ficar sozinho", "Esconder sentimentos"],
      a: "Buscar apoio",
    },
    {
      q: "Em emergência, enviar localização:",
      op: ["Ajuda o resgate", "É inútil", "Complica tudo"],
      a: "Ajuda o resgate",
    },
    {
      q: "Qual atitude é incorreta?",
      op: ["Pedir socorro", "Entrar em área alagada", "Aguardar instruções"],
      a: "Entrar em área alagada",
    },
  ],
  voluntario: [
    {
      q: "O voluntário deve sempre...",
      op: ["Ouvir com empatia", "Pressionar a vítima", "Ignorar o relato"],
      a: "Ouvir com empatia",
    },
    {
      q: "Ao receber uma localização, o voluntário...",
      op: ["Confirma e repassa a equipe", "Ignora", "Publica nas redes"],
      a: "Confirma e repassa a equipe",
    },
    {
      q: "Se notar crise de ansiedade, deve-se...",
      op: ["Falar calmamente", "Apressar a pessoa", "Brigar"],
      a: "Falar calmamente",
    },
    {
      q: "Informações pessoais do usuário são...",
      op: ["Sigilosas", "Divulgadas", "Sem importância"],
      a: "Sigilosas",
    },
    {
      q: "Ao usar o chat, priorize...",
      op: ["Mensagens claras e objetivas", "Textos longos", "Respostas vagas"],
      a: "Mensagens claras e objetivas",
    },
    {
      q: "Em dúvida sobre procedimento, o voluntário deve...",
      op: ["Buscar orientação", "Inventar solução", "Desconsiderar o risco"],
      a: "Buscar orientação",
    },
    {
      q: "Caso não saiba lidar com ansiedade, o voluntário...",
      op: [
        "Encaminha a um psicólogo",
        "Ignora o usuário",
        "Dá conselhos leigos",
      ],
      a: "Encaminha a um psicólogo",
    },
    {
      q: "Em situações de risco, o voluntário deve...",
      op: ["Orientar a evacuação", "Pedir calma e não agir", "Despedir-se"],
      a: "Orientar a evacuação",
    },
    {
      q: "Contato com familiares deve ser feito...",
      op: ["Com autorização do usuário", "Sem critério", "Sempre publicamente"],
      a: "Com autorização do usuário",
    },
    {
      q: "O principal valor do voluntário SafeChat é...",
      op: ["Acolhimento humano", "Neutralidade", "Indiferença"],
      a: "Acolhimento humano",
    },
  ],
};

let quizTipo = "usuario";
let quizIdx = 0;
let quizScore = 0;
const quizBox = document.getElementById("quizBox");
const quizNext = document.getElementById("quizNext");
const quizResultado = document.getElementById("quizResultado");
const quizUsuarioBtn = document.getElementById("quizUsuarioBtn");
const quizVoluntarioBtn = document.getElementById("quizVoluntarioBtn");

quizUsuarioBtn.onclick = () => {
  quizTipo = "usuario";
  quizUsuarioBtn.classList.add("ativo");
  quizVoluntarioBtn.classList.remove("ativo");
  quizIdx = 0;
  quizScore = 0;
  mostrarQuiz();
};

quizVoluntarioBtn.onclick = () => {
  quizTipo = "voluntario";
  quizUsuarioBtn.classList.remove("ativo");
  quizVoluntarioBtn.classList.add("ativo");
  quizIdx = 0;
  quizScore = 0;
  mostrarQuiz();
};

function mostrarQuiz() {
  const perguntas = quizzes[quizTipo];
  if (quizIdx < perguntas.length) {
    const p = perguntas[quizIdx];
    quizBox.innerHTML =
      `<p>${p.q}</p>` +
      p.op.map((o) => `<button class="quiz-opcao">${o}</button>`).join("");
    quizNext.style.display = "none";
    quizResultado.textContent = "";
    document.querySelectorAll(".quiz-opcao").forEach((btn) => {
      btn.onclick = () => responderQuiz(btn.textContent, btn);
    });
  } else {
    quizBox.innerHTML = "";
    quizNext.style.display = "none";
    quizResultado.textContent = `Quiz concluído! Você acertou ${quizScore} de ${quizzes[quizTipo].length} perguntas.`;
    quizIdx = 0;
    quizScore = 0;
  }
}

function responderQuiz(resp, btn) {
  const perguntas = quizzes[quizTipo];
  document.querySelectorAll(".quiz-opcao").forEach((b) => (b.disabled = true));
  if (resp === perguntas[quizIdx].a) {
    quizScore++;
    quizResultado.textContent = "Correto!";
    btn.style.background = "var(--cor-verde)";
  } else {
    quizResultado.textContent = "Errado!";
    btn.style.background = "var(--cor-erro)";
  }
  quizNext.style.display = "block";
}

quizNext.onclick = () => {
  quizIdx++;
  mostrarQuiz();
};

mostrarQuiz();

const secoes = document.querySelectorAll("main section");
const links = document.querySelectorAll(".navbar-menu a");

window.addEventListener("scroll", () => {
  let pos = window.scrollY || window.pageYOffset;
  let atual = "";
  secoes.forEach((sec) => {
    const offset = sec.offsetTop - 100;
    if (pos >= offset) atual = sec.getAttribute("id");
  });
  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href").slice(1) === atual
    );
  });
});
