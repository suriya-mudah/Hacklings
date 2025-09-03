import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@app/shared/components/nav/nav';
import { ActivityCard } from './components/activity-card/activity-card';
import { StartCard } from './components/start-card/start-card';
import { Activity } from '@app/interfaces';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavComponent, ActivityCard, StartCard],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  startActivity = false;
  activityTitle = '';
}
