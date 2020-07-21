import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderandfooterComponent } from './headerandfooter.component';

describe('HeaderandfooterComponent', () => {
  let component: HeaderandfooterComponent;
  let fixture: ComponentFixture<HeaderandfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderandfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderandfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
