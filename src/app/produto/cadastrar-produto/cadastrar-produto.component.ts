import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../core/store/service/produto.service';
import { SaveUpdateProduto } from '../../core/models/save-update-produto.model';
import { Produto } from '../../core/models/produto.model';
import { NotificationService } from '../../core/store/service/notification.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

    form!: FormGroup;
    produto!: Produto;

  constructor(
    private fb: FormBuilder, 
    private prudutoService: ProdutoService, 
    private notificationService: NotificationService, 
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
     this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      valor: ['', [Validators.required]],
    });
  }

  cadastrarProduto() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();

    } else {
        this.salvarProduto(this.form.value);
      
    }
  }

  salvarProduto(produto: SaveUpdateProduto): void {
    this.ngxSpinnerService.show();
     this.prudutoService.salvarProduto(produto).subscribe({
      next:(dados: Produto) => {
        this.ngxSpinnerService.hide();
        this.produto = dados;
        this.notificationService.showSuccess(`Produto ${this.produto.nome} salvo com sucesso  !`);
        this.router.navigate(['/listar-produtos']);
      },
      error: (erro) => {
        this.ngxSpinnerService.hide();
        this.notificationService.showError(`Produto ${this.produto.nome} com erro ao salvar  !`);
        console.error('Erro ao carregar produtos', erro.error);
      }
     })
   } 


}
