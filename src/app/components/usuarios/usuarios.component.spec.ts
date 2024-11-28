import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UsuariosComponent } from './usuarios.component';
import { DataBaseService } from 'src/app/services/data-base.service';
import { of } from 'rxjs';

class MockDataBaseService {
  listaUsuarios = of([
    { correo: 'usuario1@example.com', admin: '0' },
    { correo: 'usuario2@example.com', admin: '0' },
    { correo: 'admin@example.com', admin: '1' }
  ]);

  leerUsuarios() {
    return Promise.resolve(); // Simula la carga de usuarios
  }

  eliminarUsuarioUsandoCorreo(correo: string) {
    // Simula la eliminación de un usuario
    return Promise.resolve();
  }
}

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let dbService: DataBaseService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), UsuariosComponent],
      providers: [
        { provide: DataBaseService, useClass: MockDataBaseService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DataBaseService);
    fixture.detectChanges();
  }));

  it('Deberia funcionar correctamente el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los usuarios', async () => {
    await component.ngOnInit();
    expect(component.listaUsuarios.length).toBe(2); // Solo usuarios no administradores
  });

  it('Debe eliminar un usuario y volver a cargar la tabla', async () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simula confirmación de eliminación
    spyOn(window, 'alert'); // Espía la alerta para verificarla después

    await component.eliminarUsuario('usuario1@example.com');

    expect(window.alert).toHaveBeenCalledWith('Usuario eliminado correctamente.');
    await component.cargarUsuarios(); // Recarga la lista tras la eliminación
    expect(component.listaUsuarios.length).toBe(2); // Verifica que la lista de usuarios se haya recargado
  });

  it('No debe eliminar un usuario con se de a cancelar la confirmacion', async () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simula cancelación de confirmación
    spyOn(component, 'cargarUsuarios'); // Espía el método cargarUsuarios

    await component.eliminarUsuario('usuario1@example.com');

    expect(component.cargarUsuarios).not.toHaveBeenCalled(); // Verifica que no se llame a cargarUsuarios
  });

  it('Debería filtrar a los usuarios administradores de la lista', async () => {
    await component.cargarUsuarios(); // Carga los usuarios
    const filteredUsers = component.listaUsuarios;

    // Verifica que solo usuarios no administradores estén en la lista
    expect(filteredUsers.length).toBe(2); // Hay 2 usuarios no administradores en el mock
    expect(filteredUsers.every(user => user.admin !== '1')).toBeTrue(); // Ningún usuario debe ser administrador
  });

  it('Debe gestionar la lista de usuarios vacía', async () => {
    // Modifica el observable en el mock para emitir una lista vacía
    (dbService.listaUsuarios as any) = of([]); // Cambia la listaUsuarios a un observable vacío

    await component.cargarUsuarios(); // Carga usuarios con la lista vacía
    expect(component.listaUsuarios.length).toBe(0); // La lista debe estar vacía
  });
});