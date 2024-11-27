import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Asistencia } from 'src/app/model/asistencia';
import { DataBaseService } from 'src/app/services/data-base.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule],
})
export class MiclaseComponent  implements OnInit {

  asistencia= new Asistencia();

  constructor(private bd: DataBaseService,
              private dataBaseService: DataBaseService,
              private translateService: TranslateService
  ) {   
    const lang = localStorage.getItem('lang') || 'es'
    this.translateService.setDefaultLang('lang');
    this.translateService.use(lang);}

  ngOnInit() {
    this.bd.datosQR.subscribe((datosQR) => {
      this.asistencia = new Asistencia().obtenerAsistenciaDesdeQR(datosQR);
    });
  }

}