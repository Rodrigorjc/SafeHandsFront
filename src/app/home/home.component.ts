import { Component } from '@angular/core';
import {DemoComponent} from '../demo/demo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DemoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
