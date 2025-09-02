import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../shared/button.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {}
