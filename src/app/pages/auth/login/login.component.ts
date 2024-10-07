import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ErrorHandlerAuthApiService } from 'src/app/Services/error-handler-auth-api.service';
import { FormValidatorService } from 'src/app/Services/form-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup
  errorMessage?: string

  constructor(
    private router: Router, 
    private fb:FormBuilder,
    private formValidatorService: FormValidatorService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerAuthApiService
  ){
    this.loginForm = this.fb.group({
      mail:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
    })
  }

  getErrorMessage(controlName: string): string{
    return this.formValidatorService.getErrorMessage(this.loginForm, controlName)
  }

  hasError(controlName: string): boolean {
    return this.formValidatorService.hasError(this.loginForm, controlName);
  }


  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('loginToken', response.data.token)
          sessionStorage.setItem('loginData', JSON.stringify(response.data))
          this.router.navigate([''])
          console.log('login exitoso:', response);
        },
        error: (error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            const resultCode = error.error.header.resultCode
            this.errorMessage = this.errorHandlerService.getErrorMessage(resultCode)
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor intenta nuevamente.'
          }
          console.log('Error en el registro:', error)
        }
      })
      console.log(this.loginForm)
    } else {
      this.loginForm.markAllAsTouched()
      this.errorMessage = 'Corrija los campos'
      console.log('Formulario no válido:', this.loginForm.errors);
    }
  }

  register(){
    this.router.navigate(['/login/register'])
  }
}
