import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataBaseService  } from 'src/app/services/data-base.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';


@Component({
  selector: 'app-correo',
  templateUrl: 'correo.page.html',
  styleUrls: ['correo.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    TranslateModule 
  ],
})
export class CorreoPage {
  selectedLanguage: string = 'es';
  correo: string = '';
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(private navCtrl: NavController, 
              private dataBaseService: DataBaseService,
              private translateService: TranslateService
            ) {
              const lang = localStorage.getItem('lang') || 'es'
              this.translateService.setDefaultLang('es');
              this.translateService.use(lang);
            }

  async solicitarPreguntaSecreta() {
    // Validar el correo y comprobar si existe en la base de datos
    const usuario = await this.dataBaseService.leerUsuario(this.correo);

    if (usuario) {
      // Redirigir al usuario a la página de respuesta de pregunta secreta
      this.navCtrl.navigateForward('/pregunta', {
        queryParams: { correo: this.correo },
      });
    } else {
      // Mostrar un mensaje de error
      this.navCtrl.navigateBack('/incorrecto');
    }
    
  }
  volverAlInicio() {
    this.navCtrl.navigateBack('/ingreso');
  }
}
