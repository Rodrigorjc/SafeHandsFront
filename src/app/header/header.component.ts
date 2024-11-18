import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isUserMenuVisible = false;
  isNavMenuVisible = false;
  isMenuVisible = false;

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  mostarMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  mostarNav() {
    this.isNavMenuVisible = !this.isNavMenuVisible;
  }
}
