import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    // Get saved user from localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Check if entered credentials match
      if (user.email === email && user.password === password) {
        // Redirect to home
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    } else {
      this.errorMessage = 'No registered user found. Please register first.';
    }
  }
}
