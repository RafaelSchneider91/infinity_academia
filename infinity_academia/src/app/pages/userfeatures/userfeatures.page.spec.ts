import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserfeaturesPage } from './userfeatures.page';

describe('UserfeaturesPage', () => {
  let component: UserfeaturesPage;
  let fixture: ComponentFixture<UserfeaturesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfeaturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
