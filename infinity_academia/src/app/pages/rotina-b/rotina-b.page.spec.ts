import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotinaBPage } from './rotina-b.page';

describe('RotinaBPage', () => {
  let component: RotinaBPage;
  let fixture: ComponentFixture<RotinaBPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
