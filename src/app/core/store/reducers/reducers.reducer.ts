import * as ProdutoAction from '../actions/produto.action';
import { ProdutoState } from '../../view-models/produto-state';
import { Produto } from '../../models/produto.model';
import { createReducer, on } from '@ngrx/store';

export const initialStateProduto: ProdutoState = {
  produtos: null,
  error: null,
};
 
const loadProdutoSuccess = (
  state: ProdutoState,
  { produto }: { produto: Produto[] }
): ProdutoState => ({
  ...state,
  produtos: produto,
  error: null,
});

const loadProdutoFailure = (
  state: ProdutoState,
  { error }: { error: string }
): ProdutoState => ({
  ...state,
  error,
});

const onDeleteProduto = (
  state: ProdutoState,
  { idProduto }: { idProduto: number }
): ProdutoState => ({
  ...state,
  error: null,
});



export const produtoReducer = createReducer(
    initialStateProduto,
  on(ProdutoAction.loadProdutoSuccess, loadProdutoSuccess),
  on(ProdutoAction.loadProdutoFailure, loadProdutoFailure),
  on(ProdutoAction.deletarProduto, onDeleteProduto),
  on(ProdutoAction.loadProdutoFailure, loadProdutoFailure),
);
