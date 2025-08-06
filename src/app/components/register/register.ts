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

  constructor(
    private fb: FormBuilder,
    private router: Router
  
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      console.log(this.registerForm.value); 
      alert('Kayıt başarılı');
      this.registerForm.reset();
    }

  }
}
