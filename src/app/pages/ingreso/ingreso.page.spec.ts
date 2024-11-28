import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';  // Asegúrate de importar Router
import { TranslateModule } from '@ngx-translate/core';
import { IngresoPage } from './ingreso.page';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { waitForAsync } from '@angular/core/testing';

describe('IngresoPage', () => {
  let component: IngresoPage;
  let fixture: ComponentFixture<IngresoPage>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let databaseService: jasmine.SpyObj<DataBaseService>;

  beforeEach(waitForAsync(() => {
    // Crear un espía para AuthService
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'login']);
    
    // Crear un espía para Router
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    // Crear un espía para DataBaseService
    const databaseSpy = jasmine.createSpyObj('DataBaseService', ['crearUsuariosDePrueba']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule,
        FormsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DataBaseService, useValue: databaseSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;  // Esto inyecta el espía para el Router
    databaseService = TestBed.inject(DataBaseService) as jasmine.SpyObj<DataBaseService>; // Inyectar el espía de DataBaseService
    fixture.detectChanges();
  }));

});