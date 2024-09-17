import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: 'pregunta.page.html',
  styleUrls: ['pregunta.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    // ...
  ],
})
export class PreguntaPage {
  correo: string = '';
  preguntaSecreta: string = '';
  respuesta: string = '';
  errorMessage: string = '';
  pass: string = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private dataBaseService: DataBaseService,private router: Router) {
    const correoParam = this.route.snapshot.queryParamMap.get('correo');
    if (correoParam !== null) {
      this.correo = correoParam;
    } else {
      // Manejar el caso en el que 'correo' sea null, por ejemplo, redirigir a una página de error
    }

  }

  async ngOnInit() {
    // Obtener la pregunta secreta basada en el correo del usuario
    const usuario = await this.dataBaseService.leerUsuario(this.correo);

    if (usuario) {
      this.preguntaSecreta = usuario.preguntaSecreta;
    }
  }

  async validarRespuesta() {
    // Validar la respuesta del usuario
    const usuario = await this.dataBaseService.leerUsuario(this.correo);

    if (usuario && usuario.respuestaSecreta === this.respuesta) {
      // Respuesta correcta, permitir al usuario restablecer la contraseña o realizar otra acción
      // Puedes redirigir al usuario a otra página o mostrar opciones aquí
      this.navCtrl.navigateForward('/correcto', {
        queryParams: { pass: usuario.password },
      });
    } else {
      // Respuesta incorrecta, mostrar un mensaje de error
      this.navCtrl.navigateForward('/incorrecto');
    }
  }
  login() {
    this.router.navigate(['ingreso']);
  }
}
