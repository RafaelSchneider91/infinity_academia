import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AerobicosPage } from './aerobicos.page';

describe('AerobicosPage', () => {
  let component: AerobicosPage;
  let fixture: ComponentFixture<AerobicosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AerobicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
