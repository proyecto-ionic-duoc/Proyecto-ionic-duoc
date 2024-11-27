import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'; // Importa TranslateModule para resolver TranslateStore
import { QrComponent } from './qr.component';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de importar Storage

describe('QrComponent', () => {
  let component: QrComponent;
  let fixture: ComponentFixture<QrComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        QrComponent, // Asegúrate de importar QrComponent, ya que es standalone
        IonicModule.forRoot(), // Necesario para los componentes de Ionic
        TranslateModule.forRoot(), // Necesario para TranslateService y TranslateStore
      ],
      providers: [
        { 
          provide: Storage, 
          useValue: jasmine.createSpyObj('Storage', ['set', 'get', 'remove', 'create']) 
        } // Mock de Storage con 'create' incluido
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
