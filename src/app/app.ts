import { Component } from '@angular/core';
import { Menu } from './menu/menu';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Login } from './login/login';
import { Register } from './register/register';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, Login, Register,  Header,Menu,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
  profileForm=new FormControl({
    email:new FormControl(''),
    password:new FormControl('')
  })
}