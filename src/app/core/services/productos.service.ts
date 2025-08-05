import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl: string = environment.baseUrl + "/api/Producto/"

  constructor(
    private http: HttpClient
  ) { }

  getProductos() {
    return this.http.get<Producto[]>(`${this.apiUrl}`);
  }

  getProductoById(id: number) {
    return this.http.get<Producto>(`${this.apiUrl}${id}`);
  }

  createProducto(producto: Producto) {
    return this.http.post<Producto>(`${this.apiUrl}`, producto);
  }

  updateProducto(id: number, producto: Producto) {
    return this.http.put<Producto>(`${this.apiUrl}${id}`, producto);
  }

  deleteProducto(id: number) {
    return this.http.delete(`${this.apiUrl}${id}`);
  }


}
