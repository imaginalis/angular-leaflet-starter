import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GeocodingComponent} from './geocoding.component';

describe('NominatimComponent', () => {
  let component: GeocodingComponent;
  let fixture: ComponentFixture<GeocodingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeocodingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
