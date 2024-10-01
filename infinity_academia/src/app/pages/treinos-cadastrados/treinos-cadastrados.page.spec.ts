import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreinosCadastradosPage } from './treinos-cadastrados.page';

describe('TreinosCadastradosPage', () => {
  let component: TreinosCadastradosPage;
  let fixture: ComponentFixture<TreinosCadastradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinosCadastradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
