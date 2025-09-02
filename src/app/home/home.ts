import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
    </div>
  `,
  styleUrls: ['./home.scss']
})
export class Home {}
