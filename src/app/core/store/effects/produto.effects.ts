import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProdutoService } from "../service/produto.service";
import { Store } from '@ngrx/store';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import * as ProdutoAction from '../actions/produto.action';

@Injectable()
export class ProdutoEffects {

    constructor(
      private actions$: Actions,
      private produtoService: ProdutoService,
      private store: Store
    ) {}

  loadProdutos$ = createEffect(() =>
    this.actions$.pipe(  
      ofType(ProdutoAction.loadProduto),
      mergeMap(() =>
        this.produtoService.getProducts().pipe(
          map(produto =>
            ProdutoAction.loadProdutoSuccess({ produto })
          ),
          catchError(error =>
            of(ProdutoAction.loadProdutoFailure({ error }))
          )
        )
      )
    ),
    { functional: true }
  );

  loadProdutosById$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProdutoAction.loadProdutoById),  
      mergeMap(({idProduto}) =>
        this.produtoService.getProdutoById(idProduto).pipe(
          map(produto =>
            ProdutoAction.loadProdutoByIdSuccess({ produto })
          ),
          catchError((error) =>
            of(ProdutoAction.loadProdutoFailure({ error })) 
          )
        )
      )
    ),
    { functional: true }
  );

  criarProduto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProdutoAction.criarProduto),
      switchMap(({ produto }) => 
        this.produtoService.salvarProduto(produto).pipe(
          map(saved => ProdutoAction.criarProdutoSuccess({ produto: saved})
        ),
        catchError((error) =>
          of(ProdutoAction.criarProdutoFailure({ error })) 
        )
        )
      ) 
    ),
    { functional: true }
  );

  atualizarProduto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProdutoAction.atualizarProduto),
      concatMap(({ idProduto, produto }) => 
        this.produtoService.alterarProduto(produto, idProduto).pipe(
          map((produtoAtualizado) => 
            ProdutoAction.atualizarProdutoSuccess({ produto: produtoAtualizado}),       
        ),
        catchError((error) =>
          of(ProdutoAction.atualizarProdutoFailure({ error })) 
        )
        )
      ) 
    ),
    { functional: true }
  );

  deletarLivro$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProdutoAction.deletarProduto),
      tap(action => console.log('[Effect] recebido deletarProduto com ID:', action.idProduto)),  
      switchMap(action => 
        this.produtoService.deletarProduto(action.idProduto).pipe(
          map(() => {
            return ProdutoAction.deletarProdutoSuccess({ idProduto: action.idProduto })
          }),
          catchError((error) => 
            of(ProdutoAction.deletarProdutoFailure({ error: error.message }))
          )
        )
      )
    ),
    { functional: true }
  );
}