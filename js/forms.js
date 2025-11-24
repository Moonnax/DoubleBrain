const form = document.getElementById("contactForm");

const apenasTexto = /^[A-Za-zÀ-ÿ\s]+$/;
const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function limparErros() {
  document.querySelectorAll(".error-message").forEach(span => span.textContent = "");
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    limparErros();

    const nome = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("subject").value.trim();
    const mensagem = document.getElementById("message").value.trim();

    let houveErro = false;

    if (!apenasTexto.test(nome)) {
      document.getElementById("error-name").textContent = "Use apenas letras.";
      houveErro = true;
    }

    if (!validarEmail.test(email)) {
      document.getElementById("error-email").textContent = "Digite um e-mail válido.";
      houveErro = true;
    }

    if(!assunto) {
        document.getElementById("error-subject").textContent = "Este campo é obrigatório.";
        houveErro = true
    }

    if (!mensagem) {
      document.getElementById("error-message").textContent = "Este campo é obrigatório.";
      houveErro = true;
    }

    if (houveErro) return;

    const dados = { nome, email, assunto, mensagem };
    localStorage.setItem("formContato", JSON.stringify(dados));

    console.log("Dados salvos:", dados);

    form.reset();
    
    // Mostra o modal
    const modal = document.getElementById("success-modal");
    if (modal) {
      modal.classList.add("active");
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  });
}