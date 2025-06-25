import { createAction, props } from '@ngrx/store';
import { Produto } from '../../models/produto.model';

export const loadProduto = createAction('[Produto] Load Produto');
export const loadProdutoSuccess = createAction('[Produto] Load Produto Success', props<{ produto: Produto[] }>());

export const deletarProduto = createAction('[Produto] Deletar Produto', props< {idProduto: number} > ());
export const deleteProdutoSuccess = createAction('[Produto] Deletar Produto Sucesso)', props< {idProduto: number} > ());


export const loadProdutoFailure = createAction('[Produto] Load Produto Failure',props<{ error: string }>());

