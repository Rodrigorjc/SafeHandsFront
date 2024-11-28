import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, action: string = 'Cerrar', duration: number = 3000) {
    const config: MatSnackBarConfig = {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar']
    };
    this.snackBar.open(message, action, config);
  }
}
