import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { SqliteService } from './sqlite.service';
import { Usuario } from '../model/usuario';

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
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          preguntaSecreta TEXT NOT NULL,
          respuestaSecreta TEXT NOT NULL,
          nivelEducacional TEXT NOT NULL,
          fechaNacimiento TEXT NOT NULL,
          direccion TEXT NOT NULL,
          admin TEXT NOT NULL DEFAULT 0
        );
      `]
    },
  ];

  nombreBD = 'asistencia1';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private sqliteService: SqliteService) { }

  async CerrarBasededatos() {
    await this.sqliteService.eliminarBaseDeDatos(this.nombreBD);
    console.log('Cerrando bd :',this.nombreBD );
  }
  

  // Inicializa la base de datos
  async inicializarBaseDeDatos() {
    await this.sqliteService.crearBaseDeDatos({ database: this.nombreBD, upgrade: this.userUpgrades });
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
    await this.crearUsuariosDePrueba();
  }

  // Crea usuarios de prueba si no existen
  async crearUsuariosDePrueba() {
    console.log('Cargando usuarios de prueba...');
    let usuario = await this.leerUsuario('atorres@duocuc.cl');
    if (!usuario) {
      await this.guardarUsuario(Usuario.getUsuario('atorres', 'atorres@duocuc.cl', '1234', 'Ana', 'Torres', '¿Nombre de mi mascota?', 'gato', 'Superior Completa', '2000-01-01', 'Alonso Ovalle','0'));
    }

    usuario = await this.leerUsuario('avalenzuela@duocuc.cl');
    if (!usuario) {
      await this.guardarUsuario(Usuario.getUsuario('jperez', 'jperez@duocuc.cl', '5678', 'Juan', 'Perez', '¿Postre favorito?', 'panqueques', 'Superior Completa', '2000-01-01', 'Alonso Ovalle','0'));
    }

    usuario = await this.leerUsuario('cfuentes@duocuc.cl');
    if (!usuario) {
      await this.guardarUsuario(Usuario.getUsuario('cmujica', 'cmujita@duocuc.cl', '0987', 'Carla', 'Mujica', '¿Cual es tu vehiculo favorito?', 'motos', 'Superior Completa', '2000-02-01', 'Alonso Ovalle','0'));
    }

    let usuarioAdmin = await this.leerUsuario('admin@duocuc.cl');
    console.log('Resultado búsqueda admin:', usuarioAdmin);
  
    if (!usuario) {
      console.log('Usuario admin no encontrado. Intentando crear...');
      await this.guardarUsuario(
        Usuario.getUsuario(
          'admin',
          'admin@duocuc.cl',
          '1234',
          'Admin',
          'Admin',
          'Eres Administrador',
          'si',
          'Superior Completa',
          '2000-01-01',
          'Calle Admin',
          '1'
        )
      );
      console.log('Usuario admin creado correctamente.');
    } else {
      console.log('Usuario admin ya existe:', usuarioAdmin);
    }
  
    // Llama a todos los usuarios para verificar los cambios
    await this.leerTodosLosUsuarios();
    
  }

  // Guarda un usuario en la base de datos
  async guardarUsuario(usuario: Usuario) {
    const sql = `
      INSERT OR REPLACE INTO USUARIO 
      (cuenta, correo, password, nombre, apellido, preguntaSecreta, 
      respuestaSecreta, nivelEducacional, fechaNacimiento, direccion,admin)
      VALUES (?,?,?,?,?,?,?,?,?,?,?);
    `;
    console.log('Intentando guardar usuario:', usuario);
  
    await this.db.run(sql, [
      usuario.cuenta,
      usuario.correo,
      usuario.password,
      usuario.nombre,
      usuario.apellido,
      usuario.preguntaSecreta,
      usuario.respuestaSecreta,
      usuario.nivelEducacional,
      usuario.fechaNacimiento,
      usuario.direccion,
      usuario.admin
    ]);
  
    console.log('Usuario guardado con éxito');
    await this.leerUsuarios();
  }
  
  async leerTodosLosUsuarios() {
    const usuarios = await this.db.query('SELECT * FROM USUARIO;');
    console.log('Usuarios en la base de datos:', usuarios.values);
  }

  // Lee todos los usuarios de la base de datos
  async leerUsuarios() {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
  }

  async leerUsuario(correo: string): Promise<Usuario | undefined> {
    console.log(`Buscando usuario con correo: ${correo}`);
    const resultado = await this.db.query('SELECT * FROM USUARIO WHERE correo=?;', [correo]);
    console.log('Resultado de la consulta:', resultado);
  
    const usuarios: Usuario[] = resultado.values as Usuario[];
    return usuarios.length > 0 ? usuarios[0] : undefined;
  }
  

  // Elimina un usuario usando su correo
  async eliminarUsuarioUsandoCorreo(correo: string) {
    await this.db.run('DELETE FROM USUARIO WHERE correo=?', [correo]);
    await this.leerUsuarios();
  }

  // Valida las credenciales de un usuario
  async validarUsuario(cuenta: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE cuenta=? AND password=?;',
      [cuenta, password])).values as Usuario[];
    return usuarios[0];
  }
}
