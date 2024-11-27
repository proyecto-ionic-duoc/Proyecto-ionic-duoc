import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para pruebas reales
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Importar TranslateModule para evitar el error de TranslateStore
import { IonicModule } from '@ionic/angular'; // Necesario para los componentes de Ionic
import { MapaPage } from './mapa.page'; // Importa MapaPage
import { GeoService } from 'src/app/services/geo.service'; // Importar GeoService

describe('MapaPage', () => {
  let component: MapaPage;
  let fixture: ComponentFixture<MapaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MapaPage, // Asegúrate de que MapaPage está en "imports" porque es un componente standalone
        IonicModule.forRoot(), // Asegura la correcta integración con Ionic
        HttpClientModule, // Importa HttpClientModule para permitir las peticiones HTTP
        TranslateModule.forRoot(), // Importa TranslateModule para que TranslateService funcione
      ],
      providers: [
        GeoService, // Proveedor de GeoService
        TranslateService, // Proveer TranslateService para evitar el error de TranslateStore
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});