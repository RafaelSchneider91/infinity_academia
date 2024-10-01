import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotinaDPage } from './rotina-d.page';

describe('RotinaDPage', () => {
  let component: RotinaDPage;
  let fixture: ComponentFixture<RotinaDPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
