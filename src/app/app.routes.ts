import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { Register } from './register/register';
import { Home } from './home/home';
import { Add } from './add/add';

export const routes: Routes = [
    {path:'home', component:Home},
    {path:'login',component:Login},
    {path:'contact',component:Contact},
    {path:'register',component:Register},
    {path:'add',component:Add},
    {path:'', redirectTo:'register', pathMatch:'full'},
];
