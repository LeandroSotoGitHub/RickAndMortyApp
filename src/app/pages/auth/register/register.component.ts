import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/Services/form-validator.service';
import { AuthService } from '../../../Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { matchingPasswords } from 'src/app/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup
  successMessage?: string
  errorMessage?: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formValidatorService: FormValidatorService,
    private authService: AuthService,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      mail: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(50)]],
        city: ['', [Validators.required, Validators.maxLength(50)]],
        country: ['Argentina', [Validators.required, Validators.maxLength(50)]],
        cp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      })
    }, { validators: matchingPasswords('password') });
  }
  
  
  onSubmit() {
    if (this.registerForm.valid) {
      const userObject = this.createUserObject()

      this.authService.register(userObject).subscribe({
        next: (response) => {
          sessionStorage.setItem('registerToken', response.data.user.id)
          this.successMessage = 'Usuario creado correctamente'
          console.log('Registro exitoso:', response)
          this.router.navigate(['login'])
        },
        error: (error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            const resultCode = error.error.header.resultCode
            this.errorMessage = this.authService.getErrorMessage(resultCode)
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor intenta nuevamente.'
          }
        }
      })
    } else {
      this.errorMessage = 'Corrija los campos'
      this.registerForm.markAllAsTouched()
      console.log('Formulario no válido:', this.registerForm.errors)
    }
  }
  
  getErrorMessage(controlName: string): string{
    return this.formValidatorService.getErrorMessage(this.registerForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.formValidatorService.hasError(this.registerForm, controlName);
  }

  back(){
    this.router.navigate(['login'])
  }

  createUserObject() {
    return {
      name: this.registerForm.value.name,
      mail: this.registerForm.value.mail,
      password: this.registerForm.value.password,
      address: {
        street: this.registerForm.value.address.street,
        location: this.registerForm.value.address.location,
        city: this.registerForm.value.address.city,
        country: this.registerForm.value.address.country,
        cp: this.registerForm.value.address.cp,
      }
    }
  }
}
