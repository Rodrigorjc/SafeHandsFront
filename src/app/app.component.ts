import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from './services/auth.service';
import {DonacionesComponent} from './donaciones/donaciones.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, DonacionesComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SafeHands';
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
