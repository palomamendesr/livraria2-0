import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';
import { CadastrarProdutoComponent } from './produto/cadastrar-produto/cadastrar-produto.component';
import { AlterarProdutoComponent } from './produto/alterar-produto/alterar-produto.component';
import { VisualizarProdutoComponent } from './produto/visualizar-produto/visualizar-produto.component';
//import { ExcluirProdutoComponent } from './produto/listar-produto/excluir-produto/excluir-produto.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar-produtos', pathMatch: 'full' }, 
  { path: 'listar-produtos', component: ListarProdutoComponent },
  { path: 'cadastrar-produto', component: CadastrarProdutoComponent },
  { path: 'alterar-produto/:id', component: AlterarProdutoComponent },
  { path: 'visualizar-produto/:id', component: VisualizarProdutoComponent },
  { path:'excluir-produto/idProduto', component: ListarProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
