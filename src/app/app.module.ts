import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ItemProdutoComponent } from './item-produto/item-produto.component';
import { ListaComponent } from './lista/lista.component';
import { CadastrarAlterarProdutoComponent } from './cadastrar-alterar-produto/cadastrar-alterar-produto.component';
import { CadastrarAlterarListaComponent } from './cadastrar-alterar-lista/cadastrar-alterar-lista.component';
import { ProdutoListaService } from './produtos/produto-lista.service';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ItemProdutoComponent,
    ListaComponent,
    CadastrarAlterarProdutoComponent,
    CadastrarAlterarListaComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProdutoListaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
