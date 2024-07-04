import { Component } from '@angular/core';
import {NgIf, NgStyle} from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective,ToasterService,ToastComponent } from '@coreui/angular';
import {  Router } from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoginRequest } from './LoginRequest';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from "sweetalert2";
import { authGuard } from 'src/app/auth.guard';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, ReactiveFormsModule, HttpClientModule, NgIf],
    providers: [LoginService]
})
export class LoginComponent {

  loginForm: FormGroup;
  constructor(private router:Router,private fb:FormBuilder,private loginService:LoginService, private toasterService: ToasterService) {
    this.createForm();
   }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  login() {
    // Aquí puedes agregar lógica de autenticación si es necesario.
    // Si la autenticación es exitosa, redirige al dashboard.
    const formValues = this.loginForm.value;
    const loginRequest = formValues as LoginRequest;
    if(this.loginForm.valid) {
      this.loginService.login(loginRequest).subscribe({
      next: (userData) => {
          console.log('Datos de usuario recibidos:', userData);
      },
      error: (errorData) => {
          console.error('Error al iniciar sesión:', errorData);
          // Muestra una notificación de error con SweetAlert2
          // Swal.fire({
          //     icon: 'error',
          //     title: 'Error de inicio de sesión',
          //     text: 'Error al ingresar los datos.',
          //     confirmButtonColor: '#3085d6',
          //     confirmButtonText: 'OK'

      },
      complete: () => {
          console.info("Inicio de sesión completo");
          // Realiza acciones adicionales después del inicio de sesión, si es necesario
          this.loginForm.reset();
      }
  });
    console.log(loginRequest);}else{
      this.markFormGroupTouched(this.loginForm);

    }
  }
  register(){
    this.router.navigate(['/register']);

  }
  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
