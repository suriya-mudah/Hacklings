import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
];

export default routeConfig;
