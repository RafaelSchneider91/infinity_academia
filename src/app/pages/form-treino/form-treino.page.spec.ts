import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTreinoPage } from './form-treino.page';

describe('FormTreinoPage', () => {
  let component: FormTreinoPage;
  let fixture: ComponentFixture<FormTreinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTreinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
