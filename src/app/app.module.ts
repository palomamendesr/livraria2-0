import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';
import { CadastrarProdutoComponent } from './produto/cadastrar-produto/cadastrar-produto.component';
import { AlterarProdutoComponent } from './produto/alterar-produto/alterar-produto.component';
import { VisualizarProdutoComponent } from './produto/visualizar-produto/visualizar-produto.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideStore, StoreModule } from '@ngrx/store';
import { produtoReducer } from './core/store/reducers/reducers.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ProdutoEffects } from './core/store/effects/produto.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListarProdutoComponent,
    CadastrarProdutoComponent,
    AlterarProdutoComponent,
    VisualizarProdutoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    ToastModule,
    NgxSpinnerModule,
    MatProgressSpinnerModule,

      //imports do NGRX
    StoreModule.forRoot({}, {}),          // Inicializa o store global
    EffectsModule.forRoot([]),            // Inicializa o Effects principal (mesmo se vazio)
  ],
  providers: [
    MessageService,
    provideStore({ produto: produtoReducer }),
    provideEffects( ProdutoEffects ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideAnimationsAsync(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function provideStoreDevtools(arg0: { maxAge: number; }): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

