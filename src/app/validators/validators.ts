import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingPasswords(passwordControlName: string): ValidatorFn {
  
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName)
    const confirmPasswordControl = control.get('confirmPassword')
    if (!passwordControl || !confirmPasswordControl) {
      return null
    }
    const password = passwordControl.value
    
    const confirmPassword = confirmPasswordControl.value
    if (!password || !confirmPassword) {
      return null // Si uno de los campos está vacío, no validar
    }
    if (password !== confirmPassword) {
      return { passwordsMismatch: true } // Error si no coinciden
    }
    return null // Las contraseñas coinciden, no hay error
  }
}
