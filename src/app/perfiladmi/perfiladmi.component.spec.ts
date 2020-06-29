import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiladmiComponent } from './perfiladmi.component';

describe('PerfiladmiComponent', () => {
  let component: PerfiladmiComponent;
  let fixture: ComponentFixture<PerfiladmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfiladmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiladmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
