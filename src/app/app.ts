import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Login } from './login/login';
import { Register } from './register/register';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule, Login, Register, Header, Menu, RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  profileForm = new FormControl({
    email: new FormControl(''),
    password: new FormControl('')
  });
}
