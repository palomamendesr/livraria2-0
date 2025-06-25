import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../models/produto.model';
import { SaveUpdateProduto } from '../../models/save-update-produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}produto`);
  }

  getProdutoById(idProduto: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}produto/${idProduto}`);
  }

  salvarProduto(produto: SaveUpdateProduto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}produto`, produto);
  }

  alterarProduto(produto: SaveUpdateProduto, idproduto: any): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}produto/${idproduto}`, produto);
  }

  deletarProduto(idProduto: any): Observable<Produto> {
    return this.http.delete<Produto>(`${this.apiUrl}produto/${idProduto}`);
  }

}