import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
 template: `
  <div>
    <h1>{{ title() }}</h1>
  </div>
 `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hacklings');
}
