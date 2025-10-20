// js/templates.js
export function cardProjeto({ titulo, descricao, imagem }) {
  return `
    <div class="card">
      <img src="${imagem}" alt="${titulo}">
      <h3>${titulo}</h3>
      <p>${descricao}</p>
    </div>
  `;
}
