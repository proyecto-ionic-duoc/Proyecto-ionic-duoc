export class Usuario {
  cuenta = '';
  correo = '';
  password = '';
  nombre = '';
  apellido = '';
  preguntaSecreta = '';
  respuestaSecreta = '';
  nivelEducacional = '';
  fechaNacimiento = '';
  direccion = '';
  admin = '0'; 

  constructor(
    cuenta: string = '',
    correo: string = '',
    password: string = '',
    nombre: string = '',
    apellido: string = '',
    preguntaSecreta: string = '',
    respuestaSecreta: string = '',
    nivelEducacional: string = '',
    fechaNacimiento: string = '',
    direccion: string = '',
    admin: string = '',
  ) {
    this.cuenta = cuenta;
    this.correo = correo;
    this.password = password;
    this.nombre = nombre;
    this.apellido = apellido;
    this.preguntaSecreta = preguntaSecreta;
    this.respuestaSecreta = respuestaSecreta;
    this.nivelEducacional = nivelEducacional;
    this.fechaNacimiento = fechaNacimiento;
    this.direccion = direccion;
    this.admin = admin;
  }

  static getUsuario(
    cuenta: string,
    correo: string,
    password: string,
    nombre: string,
    apellido: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nivelEducacional: string,
    fechaNacimiento: string,
    direccion: string,
    admin: string
  ): Usuario {
    return new Usuario(
      cuenta,
      correo,
      password,
      nombre,
      apellido,
      preguntaSecreta,
      respuestaSecreta,
      nivelEducacional,
      fechaNacimiento,
      direccion,
      admin
    );
  }
  

  // Métodos de validación
  validarCampoRequerido(nombreCampo: string, valor: string) {
    if (valor.trim() === '') return `El campo "${nombreCampo}" debe tener un valor.`;
    return '';
  }



  validarCorreo(correo: string): string {
    return this.validarCampoRequerido('correo', correo);
  }

  validarDireccion(direccion: string): string {
    return this.validarCampoRequerido('dirección', direccion);
  }

  validarPassword(password: string): string {
    return this.validarCampoRequerido('contraseña', password);
  }

  validarNombre(nombre: string): string {
    return this.validarCampoRequerido('nombre', nombre);
  }

  validarApellido(apellido: string): string {
    return this.validarCampoRequerido('apellido', apellido);
  }

  validarPreguntaSecreta(preguntaSecreta: string): string {
    return this.validarCampoRequerido('pregunta secreta', preguntaSecreta);
  }

  validarRespuestaSecreta(respuestaSecreta: string): string {
    return this.validarCampoRequerido('respuesta secreta', respuestaSecreta);
  }

  validarPropiedadesUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string, direccion: string,admin: string): string {
    return this.validarCorreo(correo) 
      || this.validarPassword(password)
      || this.validarNombre(nombre)
      || this.validarApellido(apellido)
      || this.validarPreguntaSecreta(preguntaSecreta)
      || this.validarRespuestaSecreta(respuestaSecreta)
      || this.validarDireccion(direccion)
  }

}




