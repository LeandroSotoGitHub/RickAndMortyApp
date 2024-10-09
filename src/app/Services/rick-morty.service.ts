import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private urlApi = 'https://rickandmortyapi.com/api'

  constructor (private http: HttpClient) { }

  public getCharacters(page: number = 1, name?: string): Observable<any> {
    const apiUrl = name 
      ? `${this.urlApi}/character/?name=${name}&page=${page}`
      : `${this.urlApi}/character?page=${page}`
  
    return this.http.get<any>(apiUrl)
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

