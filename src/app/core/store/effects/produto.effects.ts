import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProdutoService } from "../service/produto.service";
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
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

  deleteAcaoControle$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProdutoAction.deletarProduto),  
      switchMap(action => 
        this.produtoService.deletarProduto(action.idProduto).pipe(
          map(() => ProdutoAction.deleteProdutoSuccess({ idProduto: action.idProduto })),
          catchError((error) => 
            of(ProdutoAction.loadProdutoFailure({ error: error.message }))
          )
        )
      )
    ),
    { functional: true }
  );

}