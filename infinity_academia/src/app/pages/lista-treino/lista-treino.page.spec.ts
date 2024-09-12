import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTreinoPage } from './lista-treino.page';

describe('ListaTreinoPage', () => {
  let component: ListaTreinoPage;
  let fixture: ComponentFixture<ListaTreinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTreinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
