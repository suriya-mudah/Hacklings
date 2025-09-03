import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '@app/shared/components/nav/nav';
import { title } from 'process';

interface ProfileData {
  shortName: string;
  firstName: string;
  age: number;
  address: string;
}
interface Activity {
  title: string;
  activities: string[];
}
interface Time {
  title: string;
  type: string[];
}
interface SkillsLevel {
  title: string;
  ferdigheter: { key: string; value: number }[];
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, NavComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  // Typed mock profile (simulate backend response)
  profileData: ProfileData = {
    shortName: 'SP',
    firstName: 'Sara',
    age: 27,
    address: 'Kristiansund'
  };
  activity: Activity[] = [
    {
      title: 'Aktiviteter',
      activities: [
        'Tur',
        'Strikking',
        'Yoga',
        'Løpe',
        'Kultur',
      ]
    }
  ];
  time: Time[] = [
    {
      title: 'Tidspunkt',
      type: ['Fleksibel', 'Jobb', 'Trening']
    }
  ];
  skillsLevel: SkillsLevel = {
    title: 'Ferdigheter',
    ferdigheter: [
      { key: 'Faglig', value: 4 },
      { key: 'Sosial', value: 5 },
      { key: 'Praktisk', value: 3 }
    ]
  };

  // Expose simple getters so templates can bind directly to these names
  get shortName(): string {
    return this.profileData.shortName;
  }

  get firstName(): string {
    return this.profileData.firstName;
  }

  get age(): number {
    return this.profileData.age;
  }

  get address(): string {
    return this.profileData.address;
  }
}
