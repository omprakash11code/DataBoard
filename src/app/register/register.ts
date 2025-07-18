import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  registerForm: FormGroup;
  registrationError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.registrationError = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;
    const user = { firstName, lastName, email, password };

    this.authService.registerUser(user).subscribe({
      next: (res) => {
        const msg = (res.message || '').toLowerCase();

        if (msg === 'success') {
          this.router.navigate(['/login']);
        } else if (msg.includes('already')) {
          this.registrationError = 'Email already registered.';
        } else {
          this.registrationError = 'Unexpected response from server.';
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.registrationError = 'Server error occurred. Please try again later.';
      }
    });
  }
}
