import { loadProduto } from './../../core/store/actions/produto.action';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../../core/models/produto.model';
import { ProdutoService } from '../../core/store/service/produto.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

import * as ProdutoAction from '../../core/store/actions/produto.action';
import { selectProdutos } from '../../core/store/selectors/produto.selector';

import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-listar-produto',
  templateUrl: './listar-produto.component.html',
  styleUrls: ['./listar-produto.component.css'],
  standalone: false,
})
  export class ListarProdutoComponent implements OnInit {
    idProduto: any;
    produto?: Produto;
    navigateToUpdateProduto(arg0: any) {
  throw new Error('Method not implemented.');
  }

  displayedColumns: string[] = ['id', 'nome', 'valor', 'acoes'];
  dataSource = new MatTableDataSource<Produto>([]);
  produtos$: Observable<Produto[] | null>;
  private _initialized = false;

  @ViewChild(MatTable) table!: MatTable<Produto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produtoService: ProdutoService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store,) {
  this.produtos$ = this.store.select(selectProdutos);
  }

    ngOnInit() {
      this.produtos$.subscribe(list => {
        this.dataSource.data = list ?? [];
        if (this.table && this._initialized) {
          this.table.renderRows();

        }
      });
      this.store.dispatch(ProdutoAction.loadProduto());
      // setTimeout(() => this.loadProduto());
    }

    // listarProdutos() {
    //   this.produtoService.getProducts().subscribe({
    //     next: (dados: Produto[]) => {
    //       this.dataSource.data = dados;
    //     },
    //     error: (erro) => {
    //       console.error('Erro ao carregar produtos', erro);
    //     }
    //   });
    // }

    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this._initialized = true;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }

    irParaVisualizarComId(idProduto: any) {
      this.router.navigate(['visualizar-produto', idProduto]);
    }

    irParaAlterarComId(idProduto: number, nome: string, valor: number) {
      if(confirm('Deseja alterar o produto?'))
        this.store.dispatch(ProdutoAction.atualizarProduto({ idProduto, produto: {nome, valor}}));
        console.log(idProduto, "alterar com ID")
        this.router.navigate(['/produto', idProduto]);
    }

    //deletar com ngrx
    deletarProduto(idProduto: number) {
      if(confirm('Deseja excluir o produto?')){
        this.store.dispatch(ProdutoAction.deletarProduto({ idProduto }));
        console.log(idProduto)
    }}

  // deletarProduto(idProduto: any) {
  //   console.log("meu id", idProduto)
  //    this.produtos$.deletarProduto(idProduto).subscribe({
  //      next:(dados: Produto) => {
  //       this.produto = dados;
  //     },
  //     error: (erro) => {
  //       console.error('Erro ao carregar produtos', erro);
  //     }
  //   });
  // }

}
  
