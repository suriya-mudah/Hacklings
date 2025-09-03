import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@app/shared/components/nav/nav';

interface Activity {
  title: string;
  image: string;
  time: string;
  duration: string;
  spots: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  activities: Activity[] = [
    {
      title: 'Tur til Freikollen',
      image: 'assets/images/mountain.jpg',
      time: 'Helgen / Fleksibel',
      duration: '2 timer',
      spots: 'Plass til flere +',
      tags: ['Lett', 'Tur', 'Helg'],
    },
    {
      title: 'Sykkeltur i marka',
      image: 'assets/images/sycle.jpg',
      time: 'Lørdag',
      duration: '3 timer',
      spots: 'Plass til 2',
      tags: ['Middels', 'Sykkel', 'Lørdag'],
    },
    {
      title: 'Paddel',
      image: 'assets/images/padel.jpg',
      time: 'Lørdag 18:00',
      duration: '2 timer',
      spots: 'Plass til 3',
      tags: ['Lett', 'Paddel', 'Lørdag', 'Kveld'],
    },
    // ...add more activities as needed
  ];
  currentIndex = 0;
  get currentActivity() {
    return this.activities[this.currentIndex];
  }

  disagreeActivity() {
    if (this.currentIndex < this.activities.length - 1) {
      this.currentIndex = this.currentIndex + 1;
    } else {
      this.currentIndex = 0;
    }
  }
}
