import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Asegúrate de importar el Router aquí
import { DataBaseService } from 'src/app/services/data-base.service';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class IngresoPage {

  correo = '';
  password = '';


  constructor(private authService: AuthService,private router: Router,  private dataBaseService: DataBaseService) {}

  async ingresar() {
    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      // El usuario ya está autenticado, redirige a la página de inicio.
      this.router.navigate(['inicio']);
    } else {
      // El usuario no está autenticado, intenta realizar el inicio de sesión.
      this.authService.login(this.correo, this.password);
    }
  }
  recuperarContrasena() {
    this.router.navigate(['correo']);
  }
  generarUsuarios() {
    this.dataBaseService.crearUsuariosDePrueba();

  }
}



