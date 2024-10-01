import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotinaCPage } from './rotina-c.page';

describe('RotinaCPage', () => {
  let component: RotinaCPage;
  let fixture: ComponentFixture<RotinaCPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
