import { Component, OnInit } from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {ActualizarHeaderService} from '../services/actualizar-header.service';
import {CarritoService} from '../services/carrito.service';
import { Producto } from '../modelos/Producto';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isUserMenuVisible = false;
  isNavMenuVisible = false;
  isMenuVisible = false;
  img: Observable<any> = of('');
  isCartVisible = false;
  productosEnCarrito: Producto[] = [];
  userRole: any | null = null;


  constructor(private authService: AuthService,  private actualizar: ActualizarHeaderService, public carritoService: CarritoService) {
    this.carritoService.carrito$.subscribe(productos => {
      this.productosEnCarrito = productos;
    });
  }

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  mostarMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  mostarNav() {
    this.isNavMenuVisible = !this.isNavMenuVisible;
  }

  ngOnInit() {
    this.userRole = localStorage.getItem('rol');
    this.refreshHeader();
    this.actualizar.refreshHeader$.subscribe(() => {
      this.userRole = localStorage.getItem('rol');
      this.refreshHeader();
    });
  }

  refreshHeader() {
    let token = localStorage.getItem('token');
    let userId: string | null = localStorage.getItem('userId');
    if (token) {
      let rol = localStorage.getItem('rol');
      if (rol === 'ONG') {
        this.authService.obtenerImgOng(of(userId)).subscribe(imgUrl => {
          if (imgUrl === null) {
            this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
          } else {
            this.img = of(imgUrl);
          }
        });
      } else if (rol === 'PROVEEDOR') {
        this.authService.obtenerImgProveedor(of(userId)).subscribe(imgUrl => {
          if (imgUrl === null) {
            this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
          } else {
            this.img = of(imgUrl);
          }
        });
      } else if (rol === 'CLIENTE') {
        this.authService.obtenerImgCliente(of(userId)).subscribe(imgUrl => {
          if (imgUrl === null) {
            this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
          } else {
            this.img = of(imgUrl);
          }
        });
      } else {
        // Default image
        this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
      }
    } else {
      this.img = of("https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png");
    }
  }

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }

  logout() {
    this.authService.logout();
  }
}
