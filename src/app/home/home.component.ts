import { Component } from '@angular/core';
import {DemoComponent} from '../demo/demo.component';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DemoComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
