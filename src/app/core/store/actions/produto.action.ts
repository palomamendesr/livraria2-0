import { createAction, props } from '@ngrx/store';
import { Produto } from '../../models/produto.model';
import { SaveUpdateProduto } from '../../models/save-update-produto.model';

export const loadProduto = createAction('[Produto] Load Produto');
export const loadProdutoSuccess = createAction('[Produto] Load Produto Success', props<{ produto: Produto[] }>());

export const loadProdutoById = createAction('[Produto] Load Produto Por ID', props< {idProduto: number} >());
export const loadProdutoByIdSuccess = createAction('[Produto] Load Produto Por ID Success', props< {produto : Produto} >());
export const loadProdutoFailure = createAction('[Produto] Load Produto Failure',props<{ error: any }>());

export const criarProduto = createAction('[Produto] Criar Produto', props< {produto : Produto} >());
export const criarProdutoSuccess = createAction('[Produto] Criar Produto Success', props< {produto : Produto} >());
export const criarProdutoFailure = createAction('[Produto] Criar Produto Failure', props<{ error: any }>());

export const atualizarProduto = createAction('[Produto] Atualizar Produto', props< {idProduto: number; produto : SaveUpdateProduto} >());
export const atualizarProdutoSuccess = createAction('[Produto] Criar Produto Success', props< {produto : SaveUpdateProduto} >());
export const atualizarProdutoFailure = createAction('[Produto] Criar Produto Failure', props<{ error: any }>());

export const deletarProduto = createAction('[Produto] Deletar Produto', props< {idProduto: number} > ());
export const deletarProdutoSuccess = createAction('[Produto] Deletar Produto Sucesso)', props< {idProduto: number} > ());
export const deletarProdutoFailure = createAction('[Produto] Delete Failure', props<{ error: string }>());






