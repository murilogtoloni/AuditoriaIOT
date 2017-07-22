import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '.././produtos/produto';

@Component({
  selector: 'app-item-produto',
  templateUrl: './item-produto.component.html',
  styleUrls: ['./item-produto.component.css']
})
export class ItemProdutoComponent implements OnInit {

  @Input() produto: Produto;
  @Output() eventAdicionar = new EventEmitter();
  @Output() eventAlterar = new EventEmitter();
  @Output() eventExcluir = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  enviarParaLista(){
    this.eventAdicionar.emit({produto : this.produto});
  }

  alterarProduto(){
    this.eventAlterar.emit({produto : this.produto});
  }

  excluirProduto(){
    this.eventExcluir.emit({produto : this.produto});
  }
}
  