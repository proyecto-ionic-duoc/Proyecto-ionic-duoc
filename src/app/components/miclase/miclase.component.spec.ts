import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core'; // Importa TranslateModule
import { MiclaseComponent } from './miclase.component';

describe('MiclaseComponent', () => {
  let component: MiclaseComponent;
  let fixture: ComponentFixture<MiclaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MiclaseComponent, // Componente standalone importado aquí
        IonicModule.forRoot(), // Módulo de Ionic para soporte
        TranslateModule.forRoot(), // Agregar TranslateModule para TranslateService y TranslateStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MiclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});