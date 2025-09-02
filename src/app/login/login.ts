import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/button.component';
import { NavComponent } from '../shared/nav.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NavComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {}
