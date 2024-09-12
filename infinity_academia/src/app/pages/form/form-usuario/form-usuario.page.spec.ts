import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormUsuarioPage } from './form-usuario.page';

describe('FormUsuarioPage', () => {
  let component: FormUsuarioPage;
  let fixture: ComponentFixture<FormUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
