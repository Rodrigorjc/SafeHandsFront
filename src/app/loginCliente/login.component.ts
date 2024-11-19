import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Login} from '../modelos/Login';
import {jwtDecode} from 'jwt-decode';

interface CustomJwtPayload {
  userId: string;
  rol: string;
}

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
          let tokenUser = respuesta.token;
          let decodeToken = jwtDecode<CustomJwtPayload>(tokenUser);
          let userId = decodeToken.userId;
          let role = decodeToken.rol;
          if (role === "PROVEEDOR") {
            console.log('User ID:', userId);
            console.log('Role:', role);
            localStorage.setItem('token' , respuesta.token);
            localStorage.setItem('rol', role);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', this.username),
              this.router.navigate(['homeProveedor']);
          } if (role === "CLIENTE") {
            console.log('User ID:', userId);
            console.log('Role:', role);
            localStorage.setItem('token' , respuesta.token);
            localStorage.setItem('rol', role);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', this.username),
              this.router.navigate(['home']);
          } if (role === "ONG") {
            console.log('User ID:', userId);
            console.log('Role:', role);
            localStorage.setItem('token' , respuesta.token);
            localStorage.setItem('rol', role);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', this.username),
              this.router.navigate(['homeONG']);
          }
        }

      },
      error: (e) => console.error(e),
    });
  }
}
