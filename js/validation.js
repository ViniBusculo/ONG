// js/validation.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastro");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const dataNasc = document.getElementById("data_nasc");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");

    let erros = [];

    if (nome.value.trim().length < 2) erros.push("Nome deve ter ao menos 2 caracteres.");
    if (!email.value.includes("@")) erros.push("E-mail inválido.");
    if (cpf.value.length < 14) erros.push("CPF incompleto.");
    if (telefone.value.length < 14) erros.push("Telefone inválido.");
    if (!dataNasc.value) erros.push("Data de nascimento obrigatória.");
    if (cep.value.length < 9) erros.push("CEP incompleto.");
    if (!endereco.value.trim()) erros.push("Endereço obrigatório.");
    if (!cidade.value.trim()) erros.push("Cidade obrigatória.");
    if (!estado.value) erros.push("Selecione um estado.");

    const msgBox = document.querySelector(".mensagem-validacao");
    if (!msgBox) {
      const div = document.createElement("div");
      div.classList.add("mensagem-validacao");
      form.appendChild(div);
    }

    const aviso = document.querySelector(".mensagem-validacao");
    aviso.style.marginTop = "1rem";

    if (erros.length > 0) {
      aviso.textContent = "⚠️ Corrija os seguintes erros:\n" + erros.join("\n");
      aviso.style.color = "red";
    } else {
      aviso.textContent = "✅ Cadastro enviado com sucesso!";
      aviso.style.color = "green";

      // salva dados localmente (simulação)
      const dados = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        cidade: cidade.value,
        estado: estado.value
      };
      localStorage.setItem("ultimoCadastro", JSON.stringify(dados));

      form.reset();
    }
  });
});
