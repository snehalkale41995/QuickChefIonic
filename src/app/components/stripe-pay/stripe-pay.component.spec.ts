import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePayComponent } from './stripe-pay.component';

describe('StripePayComponent', () => {
  let component: StripePayComponent;
  let fixture: ComponentFixture<StripePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripePayComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
