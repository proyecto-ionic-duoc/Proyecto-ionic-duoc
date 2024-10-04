import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MisdatosComponent  implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';
  fechaVisualizar = '';

  constructor(private authService: AuthService, private bd: DataBaseService) { }

  ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
        this.repeticionPassword = usuario.password;
  
        // Cargar la fecha de nacimiento en el formato adecuado para el input
        if (usuario.fechaNacimiento) {
          this.fechaVisualizar = usuario.fechaNacimiento; // Asegúrate de que esté en YYYY-MM-DD
          console.log('Fecha cargada:', this.fechaVisualizar); // Verifica el formato
        }
      } else {
        this.usuario = new Usuario();
        this.repeticionPassword = '';
      }
    });
  }
  

  
  onDateChange(newDate: string) {
    this.usuario.fechaNacimiento = (newDate); // Guarda en formato YYYY-MM-DD
  }


  validarCampo(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }

  async actualizarPerfil() {
    if (!this.validarCampo('cuenta', this.usuario.cuenta)) return;
    if (!this.validarCampo('nombre', this.usuario.nombre)) return;
    if (!this.validarCampo('apellidos', this.usuario.apellido)) return;
    if (!this.validarCampo('correo', this.usuario.correo)) return;
    if (!this.validarCampo('pregunta secreta', this.usuario.preguntaSecreta)) return;
    if (!this.validarCampo('respuesta secreta', this.usuario.respuestaSecreta)) return;
    if (!this.validarCampo('contraseña', this.usuario.password)) return;
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
      return;
    }
    await this.bd.guardarUsuario(this.usuario);
    this.authService.guardarUsuarioAutenticado(this.usuario);
    showToast('Sus datos fueron actualizados');
  }

}
