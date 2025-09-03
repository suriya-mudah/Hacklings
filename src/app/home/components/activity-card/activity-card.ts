import { Component, input, output } from '@angular/core';
import { Activity } from '@app/interfaces';

@Component({
  selector: 'app-activity-card',
  imports: [],
  templateUrl: './activity-card.html',
  styleUrls: ['./activity-card.scss'],
})
export class ActivityCard {
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
  startActivity = input<boolean>();
  startActivityChange = output<boolean>();

  activityTitle = output<string>();

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
  agreeActivity() {
    this.startActivityChange.emit(true);
  }
  selectActivity() {
    this.activityTitle.emit(this.currentActivity.title);
  }
}
