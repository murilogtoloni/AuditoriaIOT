import { Component, OnInit, Output } from '@angular/core';
import { Produto } from './produtos/produto';
import { Lista } from './lista/lista';
import { ProdutoListaService } from './produtos/produto-lista.service';
import { element } from 'protractor';
require('aws-sdk/dist/aws-sdk');
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];
  listaAtual: Lista;
  urlImgUpload: any;
  titleModal: String;
  msgResponse: String;
  produtoCad: Produto;
  idLista: number;

  constructor(private produtoListaService: ProdutoListaService) {
    this.listaAtual = new Lista(0, '', null , 0, 0);
    this.consultaProdutosNaoCadastrados(this.idLista);
  }

  consultaProdutosNaoCadastrados(idLista:number){
    this.idLista = idLista;
    this.produtoListaService.getProdutosNaoCadastrados(idLista)
      .subscribe(produtos => {
        this.produtos = produtos;
        this.produtos.forEach(element => {
          element.noFiltro = true;
        })
      })
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

  ngOnInit() {
    this.produtoCad = new Produto(0, 0, false, 0, '', 0, '', false);
  }



  buscarProduto(buscaDigitada) {
    console.log(buscaDigitada);
    this.produtos.forEach(function (element) {
      if (!element.nome.toLowerCase().includes(buscaDigitada.toLowerCase())) {
        element.noFiltro = false;
      } else {
        element.noFiltro = true;
      }
    });
  }

  fileEvent(fileInput: any) {
    var AWSService = window.AWS;
    var file = fileInput.target.files[0];
    AWSService.config.accessKeyId = 'AKIAJQGVWRZ5IT5M3T7A';
    AWSService.config.secretAccessKey = '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';
    AWSService.config.region = 'sa-east-1';
    var bucket = new AWSService.S3({ params: { Bucket: 'lucasmedinaa' } });
    var params = { Key: file.name, Body: file };
    this.urlImgUpload = bucket.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("AKIAJQGVWRZ5IT5M3T7A");
        this.Location = data.Location;
      }
    });
  }

  openModalProduto(title: String, produto: Produto) {
    this.titleModal = title;
    this.urlImgUpload = null;
    if(!produto){
       this.produtoCad = new Produto(0, 0, false, null, '', 0, '', false);
    }else{
      this.urlImgUpload = new Object();
      this.produtoCad = produto;
      this.urlImgUpload.Location = produto.imagem;
    }
  }

  onSubmit(){
    jQuery("#myModal").modal("hide"); 
    //this.produtoCad.id = null;
    this.produtoCad.imagem = this.urlImgUpload.Location;
    this.produtoListaService.cadastraProduto(this.produtoCad).subscribe(
      data =>  {this.msgResponse = "Cadastro Efetuado com Sucesso", this.consultaProdutosNaoCadastrados(this.idLista);},
      err =>  {console.log(err); this.msgResponse = "Ocorreu um erro"; jQuery("#modalResponse").modal("show")},
      () =>  jQuery("#modalResponse").modal("show")
    );
  }

  excluiProduto(id:Number){
    jQuery("#modalExcluirProduto").modal("hide"); 
    this.produtoListaService.excluiProduto(id).subscribe(
      data =>  {this.msgResponse = "Produto Removido com Sucesso", this.consultaProdutosNaoCadastrados(this.idLista);},
      err =>  {console.log(err); this.msgResponse = "Ocorreu um erro"; jQuery("#modalResponse").modal("show")},
      () =>  jQuery("#modalResponse").modal("show")
    );
  }
}
