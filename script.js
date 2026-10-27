
const jogos = [
  { id: 1, nome: "Cyberpunk 2077", cat: "RPG", preco: 89.90 },
  { id: 2, nome: "Elden Ring", cat: "Ação", preco: 149.90 },
  { id: 3, nome: "EA SPORTS FC 26", cat: "Esportes", preco: 229.90 },
  { id: 4, nome: "Minecraft", cat: "Aventura", preco: 99.90 },
  { id: 5, nome: "God of War Ragnarök", cat: "Ação", preco: 179.90 },
  { id: 6, nome: "Forza Horizon 5", cat: "Corrida", preco: 119.90 }
];

let categoriaAtual = "Todos";
let carrinho = [];

const formatarPreco = valor =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

function renderizarJogos() {
  const busca = document
    .getElementById("busca").value.toLowerCase();

  const filtrados = jogos.filter(j =>
    (categoriaAtual === "Todos" || j.cat === categoriaAtual) &&
    j.nome.toLowerCase().includes(busca)
  );

  document.getElementById("jogos").innerHTML =
    filtrados.map(j => `
      <article class="jogo">
        <div class="capa">
          <h3>${j.nome}</h3>
        </div>
        <div class="detalhes">
          <p>${j.cat}</p>
          <p class="preco">${formatarPreco(j.preco)}</p>
          <button data-add="${j.id}">
            Adicionar ao carrinho
          </button>
        </div>
      </article>
    `).join("");
}

function renderizarCarrinho() {
  document.getElementById("quantidade").textContent =
    carrinho.length;

  document.getElementById("itens-carrinho").innerHTML =
    carrinho.map((j, i) => `
      <div class="item-carrinho">
        <span>${j.nome} — ${formatarPreco(j.preco)}</span>
        <button data-remove="${i}">Remover</button>
      </div>
    `).join("");

  const total = carrinho.reduce(
    (soma, j) => soma + j.preco, 0
  );

  document.getElementById("total").textContent =
    formatarPreco(total);
}

document.getElementById("jogos").addEventListener("click", e => {
  const id = e.target.dataset.add;
  if (!id) return;

  const jogo = jogos.find(j => j.id === Number(id));
  if (jogo) carrinho.push(jogo);

  renderizarCarrinho();
});

document.getElementById("itens-carrinho")
  .addEventListener("click", e => {
    const indice = e.target.dataset.remove;
    if (indice === undefined) return;

    carrinho.splice(Number(indice), 1);
    renderizarCarrinho();
  });

document.getElementById("busca")
  .addEventListener("input", renderizarJogos);

document.getElementById("categorias")
  .addEventListener("click", e => {
    const categoria = e.target.dataset.cat;
    if (!categoria) return;

    categoriaAtual = categoria;
    renderizarJogos();
  });

document.getElementById("ver-carrinho")
  .addEventListener("click", () => {
    const secao = document.getElementById("carrinho");
    secao.hidden = !secao.hidden;

    if (!secao.hidden) {
      secao.scrollIntoView({ behavior: "smooth" });
    }
  });

document.getElementById("limpar").addEventListener("click", () => {
  carrinho = [];
  renderizarCarrinho();
});

renderizarJogos();
renderizarCarrinho();
