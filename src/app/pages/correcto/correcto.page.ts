import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';


@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
  standalone: true,
  imports: [IonicModule, 
            CommonModule, 
            FormsModule,
            TranslateModule]
})
export class CorrectoPage implements OnInit {
  selectedLanguage: string = 'lang';
  contrasena: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private translateService: TranslateService
            ) {
              const lang = localStorage.getItem('lang') || 'es'
              this.translateService.setDefaultLang('lang');
              this.translateService.use(lang); 
    const passParam = this.route.snapshot.queryParamMap.get('pass');
    if (passParam !== null) {
      this.contrasena = passParam;
    }
  }

  ngOnInit() {

  }
  login() {
    this.router.navigate(['ingreso']);
  }
}
