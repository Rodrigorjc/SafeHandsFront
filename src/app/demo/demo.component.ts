import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  constructor(private authService: AuthService, private http: HttpClient) {}


  onDemoButtonClick() {
    this.http.get('http://localhost:8081/demo').subscribe(
      data => console.log('Data:', data),
      error => console.error('Error:', error)
    );
  }

  onGetRemainingTimeClick() {


    this.http.get('http://localhost:8081/demo/remaining-time').subscribe(
      (data: any) => console.log('Remaining Time:', data),
      error => console.error('Error:', error)
    );
  }
}
