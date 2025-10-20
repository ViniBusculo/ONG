// js/validation.js

// substitui o listener direto por uma função de inicialização que
// será executada imediatamente se o documento já estiver carregado
function initValidation() {
  const form = document.getElementById("form-cadastro");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const campos = form.querySelectorAll("input, select");
    let valido = true;

    campos.forEach(campo => {
      const erro = campo.nextElementSibling;
      if (erro && erro.classList.contains("erro")) erro.remove();

      if (!campo.checkValidity()) {
        valido = false;
        const msg = document.createElement("span");
        msg.classList.add("erro");
        msg.textContent = "Preencha corretamente este campo.";
        campo.insertAdjacentElement("afterend", msg);
      }
    });

    if (valido) {
      // coleta valores do formulário
      const data = new FormData(form);
      const cadastro = {
        nome: data.get("nome") || "",
        email: data.get("email") || "",
        cpf: data.get("cpf") || "",
        telefone: data.get("telefone") || "",
        data_nasc: data.get("data_nasc") || "",
        cep: data.get("cep") || "",
        endereco: data.get("endereco") || "",
        cidade: data.get("cidade") || "",
        estado: data.get("estado") || "",
        criadoEm: new Date().toISOString()
      };

      // salva no array 'cadastros' do localStorage
      const existentes = JSON.parse(localStorage.getItem("cadastros") || "[]");
      existentes.push(cadastro);
      localStorage.setItem("cadastros", JSON.stringify(existentes));

      // atualiza último envio (legível) e UI
      const ts = new Date().toLocaleString();
      localStorage.setItem("ultimoCadastro", ts);
      const info = document.getElementById("info-envio");
      if (info) info.textContent = `Último cadastro enviado em: ${ts}`;

      alert("Cadastro enviado com sucesso!");
      form.reset();
    }
  });
}

// executa init imediatamente se DOM já estiver pronto, caso contrário aguarda DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initValidation);
} else {
  initValidation();
}
