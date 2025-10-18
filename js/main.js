// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  // Rolagem suave para seções internas (ex: #doar e #about)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Exibe mensagem no console (teste de modularidade)
  console.log("Site Busculo’s carregado com sucesso!");
});
