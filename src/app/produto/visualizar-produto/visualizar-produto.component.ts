import { selectProdutoLoading, selectProdutoSelecionado } from './../../core/store/selectors/produto.selector';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../core/store/service/produto.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProdutoAction from '../../core/store/actions/produto.action';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.component.html',
  styleUrls: ['./visualizar-produto.component.css']
})
export class VisualizarProdutoComponent implements OnInit {

  idProduto!: number;
  produto$!: Observable<Produto | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  // dataSource = new MatTableDataSource<Produto>([]);
  loadProdutoById!: number;
  // produto?: Produto;



  constructor(private router: Router,private route: ActivatedRoute, private store: Store) {
    // this.dataSource = new MatTableDataSource<Produto>();
    this.produto$ = this.store.select(selectProdutoSelecionado)
    this.idProduto = Number(this.route.snapshot.paramMap.get('id'));
      console.log('ID do produto na rota:', this.route.snapshot.paramMap.get('id'));
    console.log("produto", this.produto$)
    this.loading$ = this.store.select(selectProdutoLoading)
    
   }

  ngOnInit() {
     if (this.idProduto) {
      console.log('ID load produto:', this.idProduto);
      this.store.dispatch(
        ProdutoAction.loadProdutoById({ idProduto: this.idProduto })
      );
    } else {
      console.warn('ID inválido de produto:', this.idProduto);
      this.router.navigate(['/produtos']);
    }
  }

  reload() {
    this.store.dispatch(
      ProdutoAction.loadProdutoById({ idProduto: this.idProduto })
    );
  }


  // buscarProduto() {
  //   this.produtoService.getProdutoById(this.idProduto).subscribe({
  //     next: (produto: Produto) => {
  //       this.produto = produto;
  //       console.log('Produto carregado:', produto);
  //       },
  //     error: (erro) => {
  //       console.log("Deu erro: ", erro.error);
  //       }
  //   });
  // }

}