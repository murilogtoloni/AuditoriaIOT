export class Produto {
  constructor(
    public id: number,
    public idLista: number,
    public jaPegou: boolean,
    public quantidade: number,
    public imagem: String,
    public valor: number,
    public nome: String,
    public noFiltro: boolean
  ) { }
}
