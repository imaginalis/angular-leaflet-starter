import {Component, OnInit} from '@angular/core';
import {
  icon,
  latLng,
  Map,
  MapOptions,
  marker,
  tileLayer
} from "leaflet";
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "../app.constants";
import {MapPoint} from "../shared/models/map-point.model";
import {NominatimResponse} from "../shared/models/nominatim-response.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;

  results: NominatimResponse[];

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();
    this.initializeDefaultMapPoint();
  }

  initializeMap(map: Map) {
    this.map = map;
    this.initializeMapClickEventListening();
    this.createMarker();
  }

  getAddress(result: NominatimResponse) {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  refreshSearchList(results: any) {
    this.results = results;
  }

  private initializeMapOptions() {
    this.options = {
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OSM'})
      ]
    }
  }

  private initializeMapClickEventListening() {
    this.map.on('click', <LeafletMouseEvent>(e) => {
      if (this.map.hasLayer(this.lastLayer)) {
        this.map.removeLayer(this.lastLayer);
      }
      this.createMarker();
      this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    });
  }

  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: "Hello",
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    };
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string) {
    this.mapPoint.latitude = latitude;
    this.mapPoint.longitude = longitude;
    if (name)
      this.mapPoint.name = name;
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

}
