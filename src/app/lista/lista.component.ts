import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '.././produtos/produto';
import { ProdutoRequest } from '.././produtos/produto-request';
import { Lista } from './lista';
import { ProdutoListaService} from '../produtos/produto-lista.service'
declare var jQuery:any;

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {
  @Input() lista: Lista;
  @Output() eventAtualizarProdutos = new EventEmitter();
  
  titleModal: String;
  listaCad: Lista;
  listas: Lista[];
  msgResponse :String;
  listaSelec: Lista;
  request : ProdutoRequest;

  constructor(private produtoListaService: ProdutoListaService) {
   this.listaSelec = new Lista(0, '',null, 0, 0);
    this.listaCad = new Lista(0, '', null, 0, 0);
    this.consultaListasCadastradas();
  }

  ngOnInit() {
  }

  getClassSeJaPegou(jaPegou): {} {
    return {'bandeira-opaca ' : jaPegou};
  }

  removerProdutoDaLista(produto:Produto){
      this.produtoListaService.deletaProdutoDaLista(produto.id, this.listaSelec.id).subscribe(
      data =>  {
        this.msgResponse = "Produto Removido da Lista";
        this.eventAtualizarProdutos.emit({'idLista': this.listaSelec.id});
        var index = this.listaSelec.produtos.indexOf(produto);
        if(index > -1){
          this.listaSelec.produtos.splice(index, 1);
        }
        this.listaSelec.getValorEstimado();
      },
      err =>  {console.log(err); this.msgResponse = "Ocorreu um erro"; jQuery("#modalResponseLista").modal("show")},
      () =>  jQuery("#modalResponseLista").modal("show")
    );}

  gravaProdutoNaLista(produto:Produto){
    if(!this.listaSelec.id){
      this.msgResponse = "Selecione ou crie uma lista para adicionar esse produto"; 
      jQuery("#modalResponseLista").modal("show");
    }else{
      this.request = new ProdutoRequest(produto.id, this.listaSelec.id, false, 1);
      this.produtoListaService.gravaProdutoNaLista(this.request).subscribe(
      data =>  {
        this.msgResponse = "Produto Adicionado!";
        this.eventAtualizarProdutos.emit({'idLista': this.listaSelec.id});
        produto.quantidade = 1;
        produto.jaPegou = false;
        this.listaSelec.produtos.push(produto);
        this.listaSelec.getValorEstimado();
      },
      err =>  {console.log(err); this.msgResponse = "Ocorreu um erro"; jQuery("#modalResponseLista").modal("show")},
      () =>  jQuery("#modalResponseLista").modal("show")
    );}
  }

  buscaProdutosLista(id: Number){
    console.log(id);
  }

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-group': true,
      'has-danger': !isValid && !isPristine,
      'has-success': isValid && !isPristine
    };
  }

  getFormControlClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-control': true,
      'form-control-danger': !isValid && !isPristine,
      'form-control-success': isValid && !isPristine
    };
  }

  openModalLista(title: String) {
    console.log(title);
    this.titleModal = title;
  }

  consultaListasCadastradas(){
    this.listas = new Array<Lista>();
    this.produtoListaService.getListasCadastradas()
      .subscribe(listas => {
        listas.forEach(lista => { this.listas.push(new Lista(lista.id, lista.nome, null, 0, 0));
          console.log(this.listas);
        })
      })
  }

  onSubmit(){
    jQuery("#listaModal").modal("hide");    
    this.produtoListaService.cadastraLista(this.listaCad.nome).subscribe(
      data =>  {this.msgResponse = "Cadastro Efetuado com Sucesso", this.consultaListasCadastradas();},
      err =>  {console.log(err); this.msgResponse = "Ocorreu um erro"; jQuery("#modalResponseLista").modal("show")},
      () =>  jQuery("#modalResponseLista").modal("show")
    );
  }

  excluirLista(){
    jQuery("#modalExcluirLista").modal("hide");    
    this.produtoListaService.excluirLista(this.listaSelec.id).subscribe(
      data =>  {
        this.msgResponse = "Lista deletada com sucesso", 
        this.consultaListasCadastradas(); 
        this.listaSelec.produtos = null;
        this.eventAtualizarProdutos.emit({'idLista': 0})
        this.listaSelec.getValorEstimado();
        },
      err =>  {console.log(err); this.msgResponse = "Ocorreu um erro"; jQuery("#modalResponseLista").modal("show")},
      () =>  jQuery("#modalResponseLista").modal("show")
    );
  }

  buscaProdutosDaLista(){
     this.produtoListaService.getProdutosCadastradosNaLista(this.listaSelec.id)
      .subscribe(produtos => {
        this.listaSelec.produtos = produtos;
        this.listaSelec.getValorEstimado();
        this.eventAtualizarProdutos.emit({'idLista': this.listaSelec.id})
      })
      
  }
}
