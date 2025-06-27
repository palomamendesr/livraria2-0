import { Produto } from "../models/produto.model";

export interface ProdutoState {
  produtos: Produto[] | null;   
  error: string | null;
  produtoSelecionado: Produto | null;
  loading: boolean,
  criarProdutoLoading: boolean;
  atualizarProdutoLoading: boolean;
}
