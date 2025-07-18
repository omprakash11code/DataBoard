import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = ''; // Clear previous errors

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.loginUser({ email, password }).subscribe({
      next: (res) => {
        if (res.message === 'Login successful') {
          // You can store user info here if you want, e.g. localStorage.setItem('user', JSON.stringify(res.user));

          this.router.navigate(['/home']); // Redirect after success
        } else {
          this.errorMessage = res.message || 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Server error. Please try again later.';
      },
      complete: () => {
        this.submitted = false; // Reset submitted flag when done
      }
    });
  }
}
