export class ProdutoRequest {
  constructor(
	public idProduto:number,
	public idLista:number,
	public foiPego:boolean,
	public quantidade:number) { }
}
