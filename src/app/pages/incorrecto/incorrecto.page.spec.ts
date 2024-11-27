import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IncorrectoPage } from './incorrecto.page';
import { TranslateModule } from '@ngx-translate/core'; // Asegúrate de importar TranslateModule

describe('IncorrectoPage', () => {
  let component: IncorrectoPage;
  let fixture: ComponentFixture<IncorrectoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ 
        IncorrectoPage, // Importa tu página directamente si es standalone
        TranslateModule.forRoot() // Agrega TranslateModule para el servicio TranslateService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IncorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});