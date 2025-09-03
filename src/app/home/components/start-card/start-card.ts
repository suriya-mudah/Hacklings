import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-start-card',
  imports: [],
  templateUrl: './start-card.html',
  styleUrls: ['./start-card.scss'],
})
export class StartCard {
  startActivity = input<boolean>();
  startActivityChange = output<boolean>();

  activityTitle = input<string>();

  toActivity() {
    this.startActivityChange.emit(false);
    console.log('Changed to false');
  }
}
