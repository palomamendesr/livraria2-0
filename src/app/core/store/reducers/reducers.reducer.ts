import { ProdutoState } from './../../view-models/produto-state';
import * as ProdutoAction from '../actions/produto.action';
import { Produto } from '../../models/produto.model';
import { createReducer, on } from '@ngrx/store';

export const initialStateProduto: ProdutoState = {
  produtos: null,
  error: null,
  produtoSelecionado: null,
  loading: false,
  criarProdutoLoading: false,
  atualizarProdutoLoading: false
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

const loadProdutoByIdSuccess = (
  state: ProdutoState,
  { produto }: { produto: Produto }
): ProdutoState => ({
  ...state,
  produtoSelecionado: produto,
  loading: false,
  error: null
});

const atualizarProdutoSuccess = (
  state: ProdutoState,
  { produto }: { produto: Produto }
): ProdutoState => ({
  ...state,
  atualizarProdutoLoading: false,
  produtos: state.produtos
    ? state.produtos.map(p => (p.id === produto.id ? produto : p))
    : null,
  produtoSelecionado:
    state.produtoSelecionado?.id === produto.id
      ? produto
      : state.produtoSelecionado,
  error: null
});

const deletarProdutoSuccess = (
  state: ProdutoState,
  { idProduto }: { idProduto: number }
): ProdutoState => ({
  ...state,
  produtos: state.produtos
    ? state.produtos.filter(p => p.id !== idProduto)
    : null
});


export const produtoReducer = createReducer(
    initialStateProduto,
  on(ProdutoAction.loadProdutoSuccess, loadProdutoSuccess),
  on(ProdutoAction.loadProdutoFailure, loadProdutoFailure),
  on(ProdutoAction.loadProdutoByIdSuccess, loadProdutoByIdSuccess),
  on(ProdutoAction.atualizarProdutoSuccess, atualizarProdutoSuccess),
  on(ProdutoAction.atualizarProdutoFailure, loadProdutoFailure),
  on(ProdutoAction.deletarProdutoSuccess, deletarProdutoSuccess),
  on(ProdutoAction.deletarProdutoFailure, loadProdutoFailure),
);
