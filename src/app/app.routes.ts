import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Profile } from './profile/profile';

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
  {
    path: 'profile',
    component: Profile,
    title: 'Profile',
  }
];

export default routeConfig;
