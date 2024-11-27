import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrComponent } from 'src/app/components/qr/qr.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, 
            CommonModule, 
            FormsModule,
            QrComponent, 
            MiclaseComponent, 
            ForoComponent, 
            MisdatosComponent,
            TranslateModule]
})
export class InicioPage implements OnInit {

  selectedLanguage: string = 'es';
  componente_actual = 'qr';

  constructor(
    private authService: AuthService, 
    private bd: DataBaseService,
    private api: ApiClientService,
    private translateService: TranslateService
  ) {
    const lang = localStorage.getItem('lang') || 'es'
    this.translateService.setDefaultLang('es');
    this.translateService.use(lang);
  }
  CambiarIdioma(lang: string) {
    this.translateService.use(lang);
    this.selectedLanguage = lang;
  }
  

  ngOnInit() {
    this.authService.primerInicioSesion.subscribe(esPrimerInicioSesion => {
      this.componente_actual = 'qr';
      this.bd.datosQR.next('');
    });
  }

  cambiarComponente(nombreComponente: string) {
    this.componente_actual = nombreComponente;
    if (nombreComponente === 'foro') this.api.fetchPosts();
    if (nombreComponente === 'misdatos') this.authService.leerUsuarioAutenticado();
    if (nombreComponente === 'cerrarsesion')this.authService.logout();
  }

}
