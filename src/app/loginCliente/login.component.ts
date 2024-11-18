import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Login} from '../modelos/Login';

@Component({
  selector: 'app-loginCliente',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements  OnInit {
  login: Login = new Login();
  username: string = '';
  password: string = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit(): void {
    this.username='';
    this.password='';
  }

  onLogin() {
    this.login.username = this.username;
    this.login.password = this.password;
    this.authService.login(this.login).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if(respuesta.token != null){
          localStorage.setItem('token' , respuesta.token);
          localStorage.setItem('username', this.username),
            this.router.navigate(['home']);
        }

      },
      error: (e) => console.error(e),
    });
  }
}
