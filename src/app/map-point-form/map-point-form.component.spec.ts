import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MapPointFormComponent} from './map-point-form.component';

describe('MapPointFormComponent', () => {
  let component: MapPointFormComponent;
  let fixture: ComponentFixture<MapPointFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapPointFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
