import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'; // Importa TranslateModule para resolver TranslateStore
import { MisdatosComponent } from './misdatos.component';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de importar Storage

describe('MisdatosComponent', () => {
  let component: MisdatosComponent;
  let fixture: ComponentFixture<MisdatosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MisdatosComponent, // Asegúrate de importar MisdatosComponent, ya que es standalone
        IonicModule.forRoot(), // Necesario para los componentes de Ionic
        TranslateModule.forRoot(), // Necesario para TranslateService y TranslateStore
      ],
      providers: [
        { 
          provide: Storage, 
          useValue: jasmine.createSpyObj('Storage', ['set', 'get', 'remove', 'create']) 
        } // Proveer un mock completo de Storage incluyendo 'create'
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MisdatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});