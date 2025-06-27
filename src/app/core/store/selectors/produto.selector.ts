import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProdutoState } from "../../view-models/produto-state";

export const selectProdutoState = createFeatureSelector<ProdutoState>('produto');

// Selector for all demandas
export const selectProdutos = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.produtos
);

export const selectProdutoSelecionado = createSelector (
  selectProdutoState,
  (state: ProdutoState) => state.produtoSelecionado
)

export const selectProdutoLoading = createSelector (
  selectProdutoState,
  (state: ProdutoState) => state.loading
)

export const selectCriarProdutoLoading = createSelector (
  selectProdutoState,
  (state: ProdutoState) => state.criarProdutoLoading
)

export const selectorAtualizarProdutoLoading = createSelector (
  selectProdutoState,
  (state: ProdutoState) => state.atualizarProdutoLoading
)

export const selectProdutoError = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.error
);

