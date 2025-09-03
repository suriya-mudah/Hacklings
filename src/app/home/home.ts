// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBtn } from './components/menu-btn/menu-btn';
import { ProfImg } from './components/prof-img/prof-img';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, MenuBtn, ProfImg],
//   templateUrl: './home.html',
//   styleUrls: ['./home.scss'],
// })
// export class Home {}

import { Component } from '@angular/core';

interface Activity {
  title: string;
  time: string;
  duration: string;
  spots: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, MenuBtn, ProfImg],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  activities: Activity[] = [
    {
      title: 'Tur til Freikollen',
      time: 'Helgen / Fleksibel',
      duration: '2 timer',
      spots: 'Plass til flere +',
      tags: ['Lett', 'Tur', 'Helg'],
    },
    {
      title: 'Sykkeltur i marka',
      time: 'Lørdag',
      duration: '3 timer',
      spots: 'Plass til 2',
      tags: ['Middels', 'Sykkel', 'Lørdag'],
    },
    // ...add more activities as needed
  ];
  currentIndex = 0;
  cardX = 0;
  cardY = 0;
  cardRotate = 0;
  get currentActivity() {
    return this.activities[this.currentIndex];
  }

  private startX = 0;
  private startY = 0;
  private dragging = false;

  onPointerDown(event: PointerEvent) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dragging = true;
  }

  onPointerMove(event: PointerEvent) {
    if (!this.dragging) return;
    this.cardX = event.clientX - this.startX;
    this.cardY = event.clientY - this.startY;
    this.cardRotate = this.cardX / 10;
  }

  onPointerUp(event: PointerEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    // Swipe threshold
    if (this.cardX > 100) {
      this.nextActivity();
    } else if (this.cardX < -100) {
      this.prevActivity();
    }
    this.cardX = 0;
    this.cardY = 0;
    this.cardRotate = 0;
  }

  nextActivity() {
    this.currentIndex = (this.currentIndex + 1) % this.activities.length;
  }
  prevActivity() {
    this.currentIndex =
      (this.currentIndex - 1 + this.activities.length) % this.activities.length;
  }
}
