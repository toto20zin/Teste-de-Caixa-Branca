const precos = {
  notebook: 3000,
  mouse: 80,
  teclado: 150
};

const estoque = {
  notebook: 5,
  mouse: 20,
  teclado: 10
};

const produto = document.getElementById("produto");
const quantidade = document.getElementById("quantidade");
const cupom = document.getElementById("cupom");
const frete = document.getElementById("frete");
const calcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");


// Calcula o desconto do cupom
function calcularDesconto(subtotal, codigo) {

  // Cupom de 10%
  if (codigo === "SENAI10") {
    return subtotal * 0.10;
  }

  // Cupom de 20% somente acima de R$ 1.000
  if (codigo === "SENAI20" && subtotal > 1000) {
    return subtotal * 0.20;
  }

  return 0;
}


// Calcula o valor do frete
function calcularFrete(tipo, subtotal) {

  // Retirada na loja
  if (tipo === "retirada") {
    return 0;
  }

  // Frete expresso
  if (tipo === "expresso") {
    return 60;
  }

  // Frete grátis para subtotal acima de R$ 500
  if (subtotal > 500) {
    return 0;
  }

  // Frete normal
  return 30;
}


// Finaliza o pedido
function finalizarPedido() {

  const produtoSelecionado = produto.value;
  const qtd = Number(quantidade.value);
  const codigo = cupom.value.trim().toUpperCase();


  // ERRO 1 CORRIGIDO
  // Quantidade 0 também é inválida
  if (qtd <= 0) {
    resultado.innerHTML = "<p>Quantidade inválida.</p>";
    return;
  }


  // ERRO 2 CORRIGIDO
  // Pode comprar exatamente a quantidade disponível
  if (qtd > estoque[produtoSelecionado]) {
    resultado.innerHTML = "<p>Quantidade indisponível em estoque.</p>";
    return;
  }


  // Calcula o subtotal
  const subtotal = precos[produtoSelecionado] * qtd;


  // Calcula desconto do cupom
  const desconto = calcularDesconto(subtotal, codigo);


  // Calcula frete
  const valorFrete = calcularFrete(frete.value, subtotal);


  // Calcula o total
  let total = subtotal - desconto + valorFrete;


  // ERRO 5 CORRIGIDO
  // Desconto de quantidade começa com 5 unidades
  if (qtd >= 5) {
    total = total - subtotal * 0.05;
  }


  // ERRO 6 CORRIGIDO
  // Pedido de R$ 3.000 ou mais recebe o desconto
  if (total >= 3000) {
    total = total * 0.95;
  }


  // Mensagem inicial
  let mensagem = "Pedido calculado com sucesso.";


  // Verifica se o total é inválido
  if (total <= 0) {
    mensagem = "Valor do pedido inválido.";

  // Pedido de alto valor
  } else if (total >= 3000) {
    mensagem = "Pedido de alto valor.";
  }


  // Mostra o resultado
  resultado.innerHTML = `
    <p>${mensagem}</p>
    <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
    <p>Desconto: R$ ${desconto.toFixed(2)}</p>
    <p>Frete: R$ ${valorFrete.toFixed(2)}</p>
    <p class="total">Total: R$ ${total.toFixed(2)}</p>
  `;
}


// Botão calcular
calcular.addEventListener("click", finalizarPedido);