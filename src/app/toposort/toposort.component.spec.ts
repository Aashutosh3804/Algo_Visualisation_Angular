import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToposortComponent } from './toposort.component';

describe('ToposortComponent', () => {
  let component: ToposortComponent;
  let fixture: ComponentFixture<ToposortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToposortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToposortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
