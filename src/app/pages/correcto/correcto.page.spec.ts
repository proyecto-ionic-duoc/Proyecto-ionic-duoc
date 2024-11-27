import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CorrectoPage } from './correcto.page';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core'; // Importar TranslateModule
import { of } from 'rxjs'; // Importar 'of' para simular observables

describe('CorrectoPage', () => {
  let component: CorrectoPage;
  let fixture: ComponentFixture<CorrectoPage>;

  // Mock de ActivatedRoute
  const mockActivatedRoute = {
    snapshot: {
      queryParamMap: {
        get: jasmine.createSpy('get').and.returnValue('some-password') // Simula el parámetro 'pass'
      }
    },
    queryParamMap: of({
      get: (key: string) => {
        if (key === 'pass') {
          return 'some-password'; // Devuelve 'some-password' para el parámetro 'pass'
        }
        return null;
      }
    }),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ 
        CorrectoPage, // Importar el componente standalone
        TranslateModule.forRoot() // Agregar TranslateModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute } // Proveer el mock de ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pass from ActivatedRoute', () => {
    // Verifica si 'get' fue llamado con el parámetro correcto
    expect(mockActivatedRoute.snapshot.queryParamMap.get).toHaveBeenCalledWith('pass');
    expect(component.contrasena).toBe('some-password'); // Verifica que la contraseña sea la que esperamos
  });
});