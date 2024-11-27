import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreguntaPage } from './pregunta.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PreguntaPage', () => {
  let component: PreguntaPage;
  let fixture: ComponentFixture<PreguntaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PreguntaPage], // Usa imports para componentes standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock de los parámetros de ruta
            snapshot: {
              paramMap: {
                get: (key: string) => 'mockValue', // Mock del método get
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

