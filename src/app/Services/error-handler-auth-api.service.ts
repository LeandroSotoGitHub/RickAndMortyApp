import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerAuthApiService {
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
