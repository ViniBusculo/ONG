// js/spa.js
document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  // garante que o CSS do menu esteja carregado (apenas uma vez)
  function ensureMenuCss() {
    if (document.getElementById("menu-css")) return;
    const link = document.createElement("link");
    link.id = "menu-css";
    link.rel = "stylesheet";
    link.href = "css/menu.css";
    document.head.appendChild(link);
  }

  // atualiza o estado "ativo" dos links do menu (baseado em [data-link])
  function updateActiveMenu(path) {
    const links = document.querySelectorAll("[data-link]");
    links.forEach(l => {
      const href = l.getAttribute("href");
      // normaliza root
      const normalizedHref = href === "" ? "/" : href;
      const normalizedPath = path === "" ? "/" : path;
      if (normalizedHref === normalizedPath) {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });
  }
  const routes = {
    "/": "templates/home.html",
    "/cadastro": "templates/cadastro.html",
    "/projetos": "templates/projetos.html"
  };

  async function navigate(path) {
    const route = routes[path] || routes["/"];
    // resolve to absolute URL so fetch/injects don't depend on current path
    const routeUrl = new URL(route, window.location.origin).href;
    const response = await fetch(routeUrl);
    const text = await response.text();

    // parse and inject only the body content of the template (if exists)
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const content = doc.body ? doc.body.innerHTML : text;
    app.innerHTML = content;
    window.history.pushState({}, "", path);
    // update menu state after navigation
    updateActiveMenu(path);

    // reattach necessary scripts for the /cadastro page
    if (path === "/cadastro") {
      try {
        await Promise.all([
          import("/js/mask.js"),
          import("/js/validation.js")
        ]);
      } catch (err) {
        console.error("Erro ao carregar scripts da página de cadastro:", err);
      }

      const form = document.getElementById("form-cadastro");
      const info = document.getElementById("info-envio");
      const data = localStorage.getItem("ultimoCadastro");

      if (info) {
        info.textContent = data ? `Último cadastro enviado em: ${data}` : "";
      }

      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault(); // impede o envio GET /cadastro

          const formData = new FormData(form);
          const dados = Object.fromEntries(formData.entries());

          console.log("Cadastro recebido (SPA):", dados);

          // opcional: salvar no localStorage
          localStorage.setItem("ultimoCadastro", new Date().toLocaleString("pt-BR"));

          // opcional: mostrar feedback visual
          if (info) {
            info.textContent = `Último cadastro enviado em: ${new Date().toLocaleString("pt-BR")}`;
          }

          alert("Cadastro enviado com sucesso (simulação SPA)!");
        });
      }
    }

    // renderiza projetos quando estiver na rota /projetos
    if (path === "/projetos") {
      import("/js/templates.js").then(module => {
        const lista = document.getElementById("lista-projetos");
        if (!lista) return;
        const projetos = [
          {
            titulo: "Projeto Educação para Todos",
            descricao: "Oferece reforço escolar e oficinas culturais para crianças e adolescentes, combatendo a evasão e incentivando o aprendizado contínuo.",
            imagem: "images/projetos/projeto1.jpg"
          },
          {
            titulo: "Projeto Alimentação Solidária",
            descricao: "Realiza campanhas mensais para arrecadar e distribuir alimentos a famílias em situação de vulnerabilidade.",
            imagem: "images/projetos/projeto2.jpg"
          }
        ];
        lista.innerHTML = projetos.map(module.cardProjeto).join("");
      }).catch(err => {
        console.error("Erro ao carregar templates:", err);
      });
    }
  }

  // links SPA (intercepta cliques) — usa closest para capturar clicks em elementos internos
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      navigate(link.getAttribute("href"));
    }
  });

  // trata back/forward do navegador
  window.addEventListener("popstate", () => {
    navigate(window.location.pathname);
  });

  // garante CSS do menu e navegação inicial com atualização do estado do menu
  ensureMenuCss();
  navigate(window.location.pathname);
});
