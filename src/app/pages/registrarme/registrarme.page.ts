import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { showToast } from 'src/app/tools/message-routines';


@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // Asegúrate de importar IonicModule
})
export class RegistrarmePage {
  cuenta: string = '';
  correo: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  preguntaSecreta: string = '';
  respuestaSecreta: string = '';
  nivelEducacional: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
  admin:string = '0';

  constructor(private dataBaseService: DataBaseService, private router: Router) {}

  async registrar() {
    const usuario = Usuario.getUsuario(
      this.cuenta,
      this.correo,
      this.password,
      this.nombre,
      this.apellido,
      this.preguntaSecreta,
      this.respuestaSecreta,
      this.nivelEducacional,
      this.direccion,
      this.fechaNacimiento,
      this.admin
    );

    // Guardar usuario en la base de datos
    await this.dataBaseService.guardarUsuario(usuario);
    showToast('Usuario registrado correctamente.');

    // Redirigir al login
    this.router.navigate(['ingreso']);
  }

  
  cancelar(){
    this.router.navigate(['/ingreso']);
  }
}
