import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produto.model';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../core/store/service/produto.service';

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.component.html',
  styleUrls: ['./visualizar-produto.component.css']
})
export class VisualizarProdutoComponent implements OnInit {

  idProduto: any;
  produto?: Produto;

  constructor(private activatedRoute: ActivatedRoute, private produtoService: ProdutoService) {
     this.idProduto = this.activatedRoute.snapshot.paramMap.get('idProduto');
     console.log(this.idProduto);
   }

  ngOnInit() {
   this.buscarProduto();
  }

  buscarProduto() {
    this.produtoService.getProdutoById(this.idProduto).subscribe({
      next: (produto: Produto) => {
        this.produto = produto;
        console.log('Produto carregado:', produto);
        },
      error: (erro) => {
        console.log("Deu erro: ", erro.error);
        }
    });
  }

}