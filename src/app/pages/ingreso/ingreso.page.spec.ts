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

  it('debe redirigir a "inicio" si el usuario está autenticado', async () => {
    authService.isAuthenticated.and.returnValue(Promise.resolve(true));  // Simula que está autenticado
    await component.ingresar();
    expect(router.navigate).toHaveBeenCalledWith(['inicio']);
  });
  
  it('debe intentar iniciar sesión si el usuario no está autenticado', async () => {
    authService.isAuthenticated.and.returnValue(Promise.resolve(false));  // Simula que no está autenticado
    component.cuenta = 'testuser';
    component.password = 'password';
    await component.ingresar();
    expect(authService.login).toHaveBeenCalledWith('testuser', 'password');
  });

  it('debe redirigir a "correo" al invocar recuperarContrasena', () => {
    component.recuperarContrasena();
    expect(router.navigate).toHaveBeenCalledWith(['correo']);
  });

  it('debe invocar crearUsuariosDePrueba del servicio DataBaseService', () => {
    component.generarUsuarios();
    expect(databaseService.crearUsuariosDePrueba).toHaveBeenCalled(); // Cambiado para usar el espía correcto
  });

  it('debe redirigir a "mapa" al invocar rutaduoc', () => {
    component.rutaduoc();
    expect(router.navigate).toHaveBeenCalledWith(['mapa']);
  });

  it('debe cambiar el idioma y almacenarlo en localStorage', () => {
    const langEvent = { detail: { value: 'en' } };
    spyOn(localStorage, 'setItem');
    component.CambiarIdioma(langEvent);
    expect(component.selectedLanguage).toBe('en');
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en');
  });

  it('debe cambiar el tema dinámicamente', () => {
    const themeEvent = { detail: { value: 'theme-dark' } };
    spyOn(document.body.classList, 'remove');
    spyOn(document.body.classList, 'add');
    component.cambiarTema(themeEvent);
    expect(document.body.classList.remove).toHaveBeenCalledWith('theme-light', 'theme-dark', 'theme-blue');
    expect(document.body.classList.add).toHaveBeenCalledWith('theme-dark');
  });
});