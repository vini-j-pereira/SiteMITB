let artigos = [];
let paginaAtual = 0;
const artigosPorPagina = 5;

const container = document.getElementById('artigos-container');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

async function carregarArtigos() {
  const resposta = await fetch('/src/data/artigos.json');
  artigos = await resposta.json();
  exibirArtigos();
}

function exibirArtigos() {
  container.innerHTML = '';
  const inicio = paginaAtual * artigosPorPagina;
  const fim = inicio + artigosPorPagina;
  const pagina = artigos.slice(inicio, fim);

  pagina.forEach(artigo => {
    container.innerHTML += `
      <div class="box-artigos">
        <img src="${artigo.imagem}" alt="Imagem do artigo">
        <div class="box-txt">
          <h3>${artigo.titulo}</h3>
          <p>${artigo.descricao}</p>
          <div class="btn-box">
            <span>${artigo.data}</span>
            <button onclick="window.location.href='artigo.html?id=${artigo.id}'">Ler mais...</button>
          </div>
        </div>
      </div>
    `;
  });

  btnAnterior.disabled = paginaAtual === 0;
  btnProximo.disabled = fim >= artigos.length;
}

btnAnterior.addEventListener('click', () => {
  if (paginaAtual > 0) {
    paginaAtual--;
    exibirArtigos();
  }
});

btnProximo.addEventListener('click', () => {
  if ((paginaAtual + 1) * artigosPorPagina < artigos.length) {
    paginaAtual++;
    exibirArtigos();
  }
});

carregarArtigos();
