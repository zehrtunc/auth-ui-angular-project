import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})

export class Register {
  registerForm:  FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit() {
    if(this.registerForm.invalid) return; // gelen bilgiler valid degilse burdan sonraki fonksiyon kodlarini calistirma. fonk. disina cik
    
    this.loading = true; //islem devam ediyor butonu kitle

    setTimeout(() => {
      const{ name, email, password } = this.registerForm.getRawValue();

      const users: any[] = JSON.parse(localStorage.getItem('users') || '[]');

      if(users.some(u => u.email == email)) {
        this.loading = false;
        this.errorMessage = 'Bu e-posta ile daha önce kayıt olunmuş.';
        return; // fonksiyon burdan sonra calismayi birakmasi icin
      }
      // fonks. kod akisi bu if`in icine girmezse asagidaki kodlar calisir

      users.push({ name, email, password, createdAt: new Date().toISOString() });
      localStorage.setItem('users', JSON.stringify(users));

      this.loading = false; // islem bitti, butonu aktif et 

      console.log(this.registerForm.value); 
      alert('Kayıt başarılı');
      this.registerForm.reset(); // tum bilgiler alindiktan sonra formu temizleriz, bunu yapabiklmesi tum islemlerden sonrasina yazariz

      this.router.navigate(['/login']);
    }, 1000);

    
  }
}
