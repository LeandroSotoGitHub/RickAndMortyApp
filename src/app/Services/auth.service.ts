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
}
