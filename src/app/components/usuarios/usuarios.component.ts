import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Usuario } from 'src/app/model/usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: Usuario[] = [];

  constructor(private dbService: DataBaseService) {}

  async ngOnInit() {
    // Cargar usuarios al iniciar la componente
    await this.cargarUsuarios();
  }

  async cargarUsuarios() {
    await this.dbService.leerUsuarios();
    this.dbService.listaUsuarios.subscribe((usuarios) => {
      // Filtrar usuarios que no sean administradores (admin !== '1')
      this.listaUsuarios = usuarios.filter((usuario) => usuario.admin !== '1');
    });
  }

  async eliminarUsuario(correo: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      await this.dbService.eliminarUsuarioUsandoCorreo(correo);
      alert('Usuario eliminado correctamente.');
      await this.cargarUsuarios(); // Recargar la lista tras eliminar un usuario
    }
  }
}
