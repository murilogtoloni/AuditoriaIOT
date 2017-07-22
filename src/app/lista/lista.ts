import { Produto } from '.././produtos/produto';

export class Lista {

  constructor(
    public id: number,
  public nome: String,
  public produtos: Produto[],
  public estimado: number,
  public total: number
  ) { }


  aumentarQuantidade(produto: Produto) {
    console.log("oi");
    produto.quantidade++;
    this.getValorEstimado();
  }

  diminuirQuantidade(produto: Produto) {
    if (produto.quantidade > 0) {
      produto.quantidade--;
      this.getValorEstimado();
    }
  }

  getValorEstimado() {
    this.estimado = 0;
    if(this.produtos){
    this.produtos.forEach(element => {
      this.estimado += (element.valor * element.quantidade);
    });
    }
  }

  pegarProduto(produto: Produto) {
    produto.jaPegou = true;
    this.total += (produto.valor * produto.quantidade);
  }
  devolverProduto(produto: Produto){
    produto.jaPegou = false;
    this.total -= (produto.valor * produto.quantidade);
  }
}
