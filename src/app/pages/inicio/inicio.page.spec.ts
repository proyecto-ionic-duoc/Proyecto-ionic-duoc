import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(waitForAsync(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['get', 'set']);

    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule, // Importa HttpClientTestingModule
      ],
      declarations: [InicioPage],
      providers: [
        { provide: Storage, useValue: storageSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
