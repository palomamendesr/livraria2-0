import { atualizarProduto } from './../../core/store/actions/produto.action';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../core/models/produto.model';
import { SaveUpdateProduto } from '../../core/models/save-update-produto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../core/store/service/produto.service';
import { NotificationService } from '../../core/store/service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as ProdutoAction from '../../core/store/actions/produto.action'
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { selectCriarProdutoLoading } from '../../core/store/selectors/produto.selector';

@Component({
  selector: 'app-alterar-produto',
  standalone: false,
  templateUrl: './alterar-produto.component.html',
  styleUrl: './alterar-produto.component.scss',  
})
export class AlterarProdutoComponent {

  formAlterar!: FormGroup;
  produto!: Produto;
  idProduto!: any;
  atualizarProduto$: any;

  constructor(
    private fb: FormBuilder, 
    private produtoService: ProdutoService, 
    private notificationService: NotificationService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private spinner: NgxSpinnerService) {
        this.atualizarProduto$ = this.store.select(selectCriarProdutoLoading);
    }

  ngOnInit(): void {
    this.initializeForm();
    this.carregarProduto();
  }

  initializeForm() {
    this.formAlterar = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      valor: ['', [Validators.required]],
    });
  }

  carregarProduto(): void {
    this.spinner.show();
    this.produtoService.getProdutoById(this.idProduto)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (produto) => {
          this.produto = produto;
          this.formAlterar.patchValue({
            nome: produto.nome,
            valor: produto.valor,
          });
        },
        error: (erro) => {
          this.notificationService.showError('Erro ao carregar produto!');
          console.error('Erro ao carregar produto', erro);
        }
      });
  }

alterarProduto() {
  if (this.formAlterar.invalid) {
    this.formAlterar.markAllAsTouched();
    return;
}

  const updatedProduto: Partial<Produto> = {
    nome: this.formAlterar.value.nome,
    valor: this.formAlterar.value.valor,
  };

  // Dispara a ação que seu Effect irá escutar
  this.store.dispatch(
    ProdutoAction.atualizarProduto({
      idProduto: this.idProduto,
      produto: updatedProduto as any
    })
  );

}

  // alterarProduto() {
  //   if (!this.formAlterar.valid) {
  //     this.formAlterar.markAllAsTouched();
  //   } else {
  //     // this.atualizarProduto(this.formAlterar.value);
  //   }
  // }

  // atualizarProduto(produto: SaveUpdateProduto): void {
  //   this.ngxSpinnerService.show();
  //   console.log("produto para ser salvo e o id", produto, this.idProduto);
  //   this.produtoService.alterarProduto(produto, this.idProduto).subscribe({
  //     next: (dados: Produto) => {
  //       this.ngxSpinnerService.hide();
  //       this.produto = dados;
  //       this.notificationService.showSuccess(`Produto ${this.produto.nome} alterado com sucesso!`);
  //       this.router.navigate(['/listar-produtos']);
  //     },
  //     error: (erro: any) => {
  //       this.ngxSpinnerService.hide();
  //       this.notificationService.showError(`Erro ao alterar produto ${this.produto?.nome}!`);
  //       console.error('Erro ao alterar produto', erro.error);
  //     }
  //   });
  // }

}

