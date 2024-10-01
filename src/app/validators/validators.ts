import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingPasswords(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(passwordControlName); // Obtiene el control de contraseña
    const confirmPasswordControl = control.get('confirmPassword'); // Obtiene el control de confirmación

    if (!passwordControl || !confirmPasswordControl) {
      return null; // No hay controles para validar
    }

    // Si ambos controles están vacíos, no se debe marcar como error
    if (passwordControl.value === '' && confirmPasswordControl.value === '') {
      return null;
    }

    // Retorna error si las contraseñas no coinciden
    return passwordControl.value !== confirmPasswordControl.value ? { passwordsMismatch: true } : null;
  };
}
