import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominatimComponent } from './nominatim.component';

describe('NominatimComponent', () => {
  let component: NominatimComponent;
  let fixture: ComponentFixture<NominatimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominatimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominatimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
