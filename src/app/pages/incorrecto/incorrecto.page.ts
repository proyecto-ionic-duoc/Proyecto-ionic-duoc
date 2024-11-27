import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';


@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
  standalone: true,
  imports: [IonicModule, 
            CommonModule, 
            FormsModule,
            TranslateModule]
})
export class IncorrectoPage implements OnInit {
  selectedLanguage: string = 'es';

  constructor(private router: Router,
    private translateService: TranslateService
  ) {
    const lang = localStorage.getItem('lang') || 'es'
    this.translateService.setDefaultLang('lang');
    this.translateService.use(lang);
  }

  ngOnInit() {

  }
  login() {
    this.router.navigate(['ingreso']);
  }
}
