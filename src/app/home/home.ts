import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBtn } from './components/menu-btn/menu-btn';
import { ProfImg } from './components/prof-img/prof-img';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MenuBtn, ProfImg],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {}
