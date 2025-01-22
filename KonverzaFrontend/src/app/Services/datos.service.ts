import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datos } from '../Interfaces/datos';
import { Inventario } from '../Interfaces/inventario';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private API_URL: string = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem("authToken");

    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  }

  getDatos(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<{ data: Datos[] }>(`${this.API_URL}/misProductos`, { headers })
      .pipe(res => res);
  }

  postDatos(datos: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.API_URL + "/agregarProducto", datos, { headers });
  }

  getDatoById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API_URL + "/seleccionarProducto/" + id, { headers });
  }

  putDatos(datos: any, id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.API_URL + "/editarProducto/" + id, datos, { headers })
  }

  deleteDatos(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.API_URL + "/eliminarProducto/" + id, { headers });
  }


  //Estas rutas son para agregar los movimientos de la tabla inventario:

  postMovimiento(datos: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.API_URL + "/agregarUnInventario", datos, { headers });
  }

  putHabastecerProducto(datos: any, id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.API_URL + "/habastecerProducto/" + id, datos, { headers })
  }

  getInventario(): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<{ data: Inventario[] }>(`${this.API_URL}/listarInventario`, { headers })
      .pipe(res => res);
  }

}
