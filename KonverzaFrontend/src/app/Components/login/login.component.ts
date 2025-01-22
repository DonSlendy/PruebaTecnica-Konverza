import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      user: [],
      password: [],
    });
  }

  submitUser(): void {
    if (this.loginForm.valid) {
      const datos = this.loginForm.value;
      //console.log("Los datos enviados fueron: " + datos["user"] + " " + datos["password"]);
      this.loginService.login(datos['user'], datos['password']).subscribe({
        next: () => {
          this.router.navigate(["/InicioUser"])
        },
        error: (err) => {
          if (err.status === 401) { this.errorMessage = 'Correo electrónico o contraseña incorrectos.'; }
        }
      })
    }
  }

}
