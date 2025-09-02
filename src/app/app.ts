import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div>
      <nav>
        <a routerLink="/">Home</a>
        <a routerLink="/login" style="margin-left:1rem">Login</a>
      </nav>
      <h1>{{ title() }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('hacklings');
}
