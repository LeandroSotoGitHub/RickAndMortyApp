import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (private http: HttpClient) { }


  private apiUrl = 'http://api-auth.academy.mobydigital.com/api'


  register(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/user/register`, data).pipe(
      catchError(this.handleError)
    )
  }
  
  login(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/user/login`, data).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  private errorMessages: { [key: number]: string } = {
    0: 'Operación exitosa.',
    1: 'Mail ya registrado.',
    2: 'Error de validación.',
    3: 'Usuario no encontrado.',
    4: 'Contraseña inválida.',
  };

  getErrorMessage(code: number): string {
    return this.errorMessages[code] || 'Ocurrió un error inesperado.'
  }
}
