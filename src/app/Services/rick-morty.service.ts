import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private urlApi = 'https://rickandmortyapi.com/api'

  constructor (private http: HttpClient) { }

  public getCharacters(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/character?page=${page}`)
  }

  public paginate(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  
  public getOneCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlApi}/character/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching character', error);
        return throwError(() => new Error('Personaje no encontrado'))
      })
    )
  }
}

