async function carregarArtigo() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
  
    const resposta = await fetch('/src/data/artigos.json');
    const artigos = await resposta.json();
    const artigo = artigos.find(a => a.id === id);
  
    if (!artigo) {
      document.body.innerHTML = '<h2>Artigo não encontrado</h2>';
      return;
    }
  
    document.getElementById('titulo').textContent = artigo.titulo;
    document.getElementById('imagem').src = artigo.imagem;
    document.getElementById('data').textContent = `Publicado em: ${artigo.data}`;
    document.getElementById('texto').textContent = artigo.texto;
  }
  
  carregarArtigo();
  