import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilAlunoPage } from './perfil-aluno.page';

describe('PerfilAlunoPage', () => {
  let component: PerfilAlunoPage;
  let fixture: ComponentFixture<PerfilAlunoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
