import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTradeComponent } from './rate-trade.component';

describe('RateTradeComponent', () => {
  let component: RateTradeComponent;
  let fixture: ComponentFixture<RateTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
