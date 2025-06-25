import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProdutoState } from "../../view-models/produto-state";

export const selectProdutoState = createFeatureSelector<ProdutoState>('produto');

// Selector for all demandas
export const selectProdutos = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.produtos
);

export const selectProdutoError = createSelector(
  selectProdutoState,
  (state: ProdutoState) => state.error
);

