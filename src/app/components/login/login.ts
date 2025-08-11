import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.loading = true; 

      setTimeout(() => {
        this.loading = false;

        const { email, rememberMe } = this.loginForm.getRawValue();

        const user = {
          email,
          rememberMe,
          loggedAt: new Date().toISOString()
        };

        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/dashboard']); // giriş başarılıysa dasboard sayfasına yönlendir.
      }, 1000); // yalandan 1 sn bekletme 
    } 
    else {
      this.errorMessage = 'Lütfen geçerli bilgiler girin.';
    }
  }

}
