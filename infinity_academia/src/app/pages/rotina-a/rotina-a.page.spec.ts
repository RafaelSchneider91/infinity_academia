import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotinaAPage } from './rotina-a.page';

describe('RotinaAPage', () => {
  let component: RotinaAPage;
  let fixture: ComponentFixture<RotinaAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
