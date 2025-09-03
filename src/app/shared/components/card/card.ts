import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
  title: string;
  image: string;
  time: string;
  duration: string;
  spots: string;
  tags: string[];
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
})
export class Card {
  @Input() activity!: Activity;
  trackByTag(index: number, tag: string) {
    return tag;
  }
}
