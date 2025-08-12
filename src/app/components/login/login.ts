import { CommonModule, JsonPipe } from '@angular/common';
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
    if (this.loginForm.invalid) return;

    this.loading = true; // islem devam ediyor buton aktif degil

      const { email, password, rememberMe } = this.loginForm.getRawValue();

      const users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

      const found = users.find(u => u.email === email && u.password === password);

      if (!found) {
        this.loading = false;
        this.errorMessage = 'E-posta veya şifre hatalı.';
        return; // kod akisi if bloguna girdiyse fonk. kodlari bundan sonrasinda calismayacak
      }

      const sessionUser = {
        name: found.name,
        email: found.email,
        loggedAt: new Date().toISOString()
      };

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(sessionUser));

      this.loading = false; // islem bitti buton aktif olabilir
      this.router.navigate(['/dashboard']); // giriş başarılıysa dasboard sayfasına yönlendir.

  }

}
