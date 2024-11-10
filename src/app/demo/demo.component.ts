import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const demoButton = document.getElementById('demoButton');
    if (demoButton) {
      demoButton.addEventListener('click', () => {
        const token = this.authService.getToken();
        if (token) {
          fetch('http://localhost:8080/demo', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => response.text())
            .then(data => {
              const demoResponse = document.getElementById('demoResponse');
              if (demoResponse) {
                demoResponse.innerText = data;
              }
            })
            .catch(error => console.error('Error:', error));
        } else {
          console.error('No token found');
        }
      });
    }
  }
}
