import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/components/button/button';
import { NavComponent } from '../shared/components/nav/nav';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NavComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {}
