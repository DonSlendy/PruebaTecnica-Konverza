import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private localStorage: any;

  private urlLogin = "http://localhost:8000/api/auth/login";
  private urlLogout = "http://localhost:8000/api/auth/logout";

  private token = 'authToken';

  constructor(private httpClient: HttpClient, private route: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.urlLogin, { email, password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    )
  }

  private setToken(tokenVar: string): void {
    localStorage.setItem(this.token, tokenVar);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.token);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = payload.exp * 1000;
    return Date.now() < expired;
  }

  logout(): void {
    const token = localStorage.getItem('authToken'); // Se extrae el token del almacenamiento local
    if (token) {
      this.httpClient.post<any>(this.urlLogout, { token: token }).subscribe(response => {
        console.log(response.message); localStorage.removeItem('authToken'); 
        this.route.navigate(['/login']);
      }, error => { console.error('Error al cerrar sesión', error); });
    } else { console.error('No se encontró un token en el almacenamiento local'); }
  }
}
