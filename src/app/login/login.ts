import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Login</h2>
      <p>Please enter your credentials to log in.</p>
    </div>
  `,
  styleUrls: ['./login.scss']
})
export class Login {}
