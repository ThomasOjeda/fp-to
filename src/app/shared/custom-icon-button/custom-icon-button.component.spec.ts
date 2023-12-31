import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIconButtonComponent } from './custom-icon-button.component';

describe('CustomIconButtonComponent', () => {
  let component: CustomIconButtonComponent;
  let fixture: ComponentFixture<CustomIconButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomIconButtonComponent]
    });
    fixture = TestBed.createComponent(CustomIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
