import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Asegúrate de importar el Router aquí
import { DataBaseService } from 'src/app/services/data-base.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class IngresoPage {

  cuenta = '';
  password = '';
  selectedLanguage: string = 'lang';
  selectedTheme = 'theme-light'; // Tema por defecto


  constructor(
    private authService: AuthService,
    private router: Router,  
    private dataBaseService: DataBaseService,
    private translateService: TranslateService
  ) {
    const lang = localStorage.getItem('lang') || 'es'
    this.translateService.setDefaultLang('lang');
    this.translateService.use(lang);
  }

  CambiarIdioma(event: any){
    const lang = event.detail.value;
    this.translateService.use(lang);
    this.selectedLanguage = lang;
    localStorage.setItem('lang',lang);
  }

  async ingresar() {
    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      // El usuario ya está autenticado, redirige a la página de inicio.
      this.router.navigate(['inicio']);
    } else {
      // El usuario no está autenticado, intenta realizar el inicio de sesión.
      this.authService.login(this.cuenta, this.password);
    }
  }
  recuperarContrasena() {
    this.router.navigate(['correo']);
  }

  generarUsuarios() {
    this.dataBaseService.leerTodosLosUsuarios();
  }

  rutaduoc() {
    this.router.navigate(['mapa']);
  }
  
  cambiarTema(event: any) {
    const selectedTheme = event.detail.value;
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-blue'); // Quita el tema actual
    document.body.classList.add(selectedTheme); // Añade el tema seleccionado
  }

  navigateTheme() {
    this.router.navigate(['/theme']);
  }

  RegistrarUsuarios(){
    this.router.navigate(['/registrarme']);
  }



}



