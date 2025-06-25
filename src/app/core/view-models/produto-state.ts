import { Produto } from "../models/produto.model";

export interface ProdutoState {
  produtos: Produto[] | null;   
  error: string | null;
}
