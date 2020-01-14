import {Component, Input} from '@angular/core';
import {MapPoint} from "../shared/models/map-point.model";

@Component({
  selector: 'app-map-point-form',
  templateUrl: './map-point-form.component.html',
  styleUrls: ['./map-point-form.component.scss']
})
export class MapPointFormComponent {
  @Input()
  mapPoint: MapPoint;

  constructor() { }

}
