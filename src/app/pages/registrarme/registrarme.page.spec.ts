import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistrarmePage } from './registrarme.page';

describe('RegistrarmePage', () => {
  let component: RegistrarmePage;
  let fixture: ComponentFixture<RegistrarmePage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(RegistrarmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
