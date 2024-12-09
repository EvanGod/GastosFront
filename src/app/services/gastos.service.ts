import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  private apiUrl = 'https://gastos-back-tawny.vercel.app/api/gastos';

  constructor(private http: HttpClient) {}

  // Método para agregar un gasto
  agregarGasto(gasto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/add`, gasto, { headers });
  }

  // Método para obtener todos los gastos del usuario
  obtenerGastos(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
