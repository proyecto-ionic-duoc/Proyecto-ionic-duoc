import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CorreoPage } from './correo.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

describe('CorreoPage', () => {
  let component: CorreoPage;
  let fixture: ComponentFixture<CorreoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CorreoPage, // Usamos 'imports' porque es un componente standalone
        IonicModule.forRoot(), // Asegúrate de importar IonicModule para los componentes de Ionic
        TranslateModule.forRoot(), // Asegúrate de importar TranslateModule para que funcione TranslateService
      ],
      providers: [
        TranslateService, // Proveemos TranslateService para que esté disponible en las pruebas
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});