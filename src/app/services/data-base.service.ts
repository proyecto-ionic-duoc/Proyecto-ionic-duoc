import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
        CREATE TABLE IF NOT EXISTS USUARIO (
          cuenta TEXT PRIMARY KEY NOT NULL,
          correo TEXT NOT NULL,
          password TEXT NOT NULL,
          nivelEducacional TEXT NOT NULL,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          preguntaSecreta TEXT NOT NULL,
          respuestaSecreta TEXT NOT NULL,
          fechaNacimiento TEXT NOT NULL  
        );
      `]
    },
  ]

  nombreBD = 'asistencia1';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private sqliteService: SqliteService) { }

  async inicializarBaseDeDatos() {
    await this.sqliteService.crearBaseDeDatos({database: this.nombreBD, upgrade: this.userUpgrades});
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
  }

  async crearUsuariosDePrueba() {
    await this.leerUsuario('atorres@duocuc.cl').then(async usuario => {
      if (!usuario) await this.guardarUsuario(Usuario.getUsuario('atorres','atorres@duocuc.cl', '1234', 'Ana', 'Torres', '¿Nombre de mi mascota?', 'gato','1','2000-01-01'));
      this.leerUsuario('avalenzuela@duocuc.cl').then(async usuario => {
        if (!usuario) await this.guardarUsuario(Usuario.getUsuario('jperez','jperez@duocuc.cl', '5678', 'Juan', 'Perez', '¿Postre favorito?', 'panqueques','1','2000-01-01'));
        this.leerUsuario('cfuentes@duocuc.cl').then(async usuario => {
          if (!usuario) await this.guardarUsuario(Usuario.getUsuario('cmujica','cmujita@duocuc.cl', '0987', 'Carla', 'Mujica', '¿Cual es tu vehiculo favorito?', 'motos','1','2000-02-01'));
        });
      });
    });
  }

  async guardarUsuario(usuario: Usuario) {
    const sql = 'INSERT OR REPLACE INTO USUARIO (cuenta, correo, password, nombre, apellido, ' +
      'preguntaSecreta, respuestaSecreta, nivelEducacional, fechaNacimiento) VALUES (?,?,?,?,?,?,?,?,?);';
    await this.db.run(sql, [usuario.cuenta, usuario.correo, usuario.password, usuario.nombre, usuario.apellido, 
      usuario.preguntaSecreta, usuario.respuestaSecreta, usuario.nivelEducacional,usuario.fechaNacimiento]);
    await this.leerUsuarios();
  }

  async leerUsuarios() {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
  }

  async leerUsuario(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;', [correo])).values as Usuario[];
    return usuarios[0];
  }
  
  async eliminarUsuarioUsandoCorreo(correo: string) {
    await this.db.run('DELETE FROM USUARIO WHERE correo=?', [correo]);
    await this.leerUsuarios();
  }

  async validarUsuario(cuenta: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE cuenta=? AND password=?;',
      [cuenta, password])).values as Usuario[];
    return usuarios[0];
  }

}
