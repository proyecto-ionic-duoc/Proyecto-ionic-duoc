import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ForoComponent } from './foro.component'; // Asegúrate de importar correctamente el componente
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslateStore } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';

// Mock para el servicio Storage
class MockStorage {
  create() {
    return Promise.resolve(this); // Simula la inicialización
  }

  get(key: string) {
    return Promise.resolve(null); // Devuelve un valor predeterminado
  }

  set(key: string, value: any) {
    return Promise.resolve(); // Simula que el valor se guarda correctamente
  }
}

describe('ForoComponent', () => {
  let component: ForoComponent;
  let fixture: ComponentFixture<ForoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ForoComponent, // Importa el componente standalone aquí
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientModule,
      ],
      providers: [
        TranslateService,
        TranslateStore,
        AuthService,
        { provide: Storage, useClass: MockStorage }, // Proveemos el mock de Storage
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
