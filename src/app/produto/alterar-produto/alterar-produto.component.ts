import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../core/models/produto.model';
import { SaveUpdateProduto } from '../../core/models/save-update-produto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../core/store/service/produto.service';
import { NotificationService } from '../../core/store/service/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private fb: FormBuilder, 
    private produtoService: ProdutoService, 
    private notificationService: NotificationService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngxSpinnerService: NgxSpinnerService) {
       this.idProduto = Number(this.activatedRoute.snapshot.paramMap.get('idProduto'));
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
    this.ngxSpinnerService.show();
    this.produtoService.getProdutoById(this.idProduto).subscribe({
      next: (produto: Produto) => {
        this.produto = produto;
        this.formAlterar.patchValue({
          nome: produto.nome,
          valor: produto.valor
        });
        this.ngxSpinnerService.hide();
      },
      error: (erro :any) => {
        this.ngxSpinnerService.hide();
        this.notificationService.showError(`Erro ao carregar produto!`);
        console.error('Erro ao carregar produto', erro.error);
      }
    });
  }

  alterarProduto() {
    if (!this.formAlterar.valid) {
      this.formAlterar.markAllAsTouched();
    } else {
      this.atualizarProduto(this.formAlterar.value);
    }
  }

  atualizarProduto(produto: SaveUpdateProduto): void {
    this.ngxSpinnerService.show();
    console.log("produto para ser salvo e o id", produto, this.idProduto);
    this.produtoService.alterarProduto(produto, this.idProduto).subscribe({
      next: (dados: Produto) => {
        this.ngxSpinnerService.hide();
        this.produto = dados;
        this.notificationService.showSuccess(`Produto ${this.produto.nome} alterado com sucesso!`);
        this.router.navigate(['/listar-produtos']);
      },
      error: (erro: any) => {
        this.ngxSpinnerService.hide();
        this.notificationService.showError(`Erro ao alterar produto ${this.produto?.nome}!`);
        console.error('Erro ao alterar produto', erro.error);
      }
    });
  }

}

