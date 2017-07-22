import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Produto } from './produto';
import { ProdutoRequest } from './produto-request';
import { Lista } from '../lista/lista';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Injectable()
export class ProdutoListaService {

    private headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    private URL_HOST:String = "https://lista-mercado-rest.herokuapp.com";

    constructor(private http: Http) { }

    deletaProdutoDaLista(idProduto:number, idLista: number){
        return this.http.
            post(`${this.URL_HOST}/produtosLista/deletaProdutoDaLista?idProduto=${idProduto}&idLista=${idLista}`, new RequestOptions({ headers: this.headers }));
    }

    gravaProdutoNaLista(produto:ProdutoRequest){
        return this.http.
            post(`${this.URL_HOST}/produtosLista/cadastraProdutoNaLista`, JSON.stringify(produto), new RequestOptions({ headers: this.headers }));
    }

    getProdutosCadastradosNaLista(id:number): Observable<Produto[]> {
          if(!id)
           id = 0;
        return this.http.
            get(`${this.URL_HOST}/produtosLista/buscaProdutosDaLista?idLista=${id}`)
            .map(response => response.json());
    }

    getProdutosNaoCadastrados(id:number): Observable<Produto[]> {
        if(!id)
           id = 0;
        return this.http.
            get(`${this.URL_HOST}/produtosLista/buscaProdutosNaoCadastradosNaLista?idLista=${id}`)
            .map(response => response.json());
    }

    cadastraProduto(produto:Produto){
        return this.http.
            post(`${this.URL_HOST}/produtos/cadastraProduto`, JSON.stringify(produto), new RequestOptions({ headers: this.headers }));
    }

    excluiProduto(id:Number){
        return this.http. 
            post(`${this.URL_HOST}/produtos/deletaProdutoPeloId?id=${id}`, new RequestOptions({ headers: this.headers }));
    }

    cadastraLista(nome:String){
        return this.http.
            post(`${this.URL_HOST}/listas/cadastraLista?nome=${nome}`, new RequestOptions({ headers: this.headers }));
    }

    getListasCadastradas(): Observable<Lista[]> {
        return this.http.
            get(`${this.URL_HOST}/listas/buscaTodas`)
            .map(response => response.json());
    }

    excluirLista(id:number){
         return this.http.
            post(`${this.URL_HOST}/listas/deletaListaPeloId?id=${id}`, new RequestOptions({ headers: this.headers }));
    }
    
    private handleError(err: any): Promise<any> {
        console.log('Erro: ', err)
        return Promise.reject(err.message || err);
    }
}
