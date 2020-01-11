import {Component, OnInit} from '@angular/core';
import {
  icon,
  LatLng,
  latLng,
  Map,
  MapOptions,
  marker,
  tileLayer
} from "leaflet";
import {DEFAULT_LATITUDE, DEFAULT_LONGITUDE} from "../app.constants";
import {NominatimService} from "../services/nominatim-service";
import {MapPoint} from "../shared/models/map-point.model";

@Component({
  selector: 'app-nominatim',
  templateUrl: './nominatim.component.html',
  styleUrls: ['./nominatim.component.scss']
})
export class NominatimComponent implements OnInit {

  map: Map;
  mapPoint: MapPoint;
  options: MapOptions;
  lastLayer: any;

  results: any;

  constructor(private nominatimService: NominatimService) {
  }

  ngOnInit() {
    this.initializeMapOptions();
    this.initializeDefaultMapPoint();
  }

  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
    this.initializeMapClickEventListening();
  }

  addressLookup(address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(res => {
        this.results = res;
      });
    } else {
      this.results = [];
    }
  }

  getAddress(latitude: number, longitude: number, name: string) {
    this.updateMapPoint(latitude, longitude, name);
    this.createMarker();
    const coordinates = new LatLng(this.mapPoint.latitude, this.mapPoint.longitude);
    this.setMapView(coordinates);
  }


  private initializeMapOptions() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'OSM'})
      ]
    }
  }

  private initializeMapClickEventListening() {
    this.map.on('click', <LeafletMouseEvent> (e) => {
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
    if(name)
      this.mapPoint.name = name;
  }

  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, 12);
  }

  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }

  private setMapView(coordinates: LatLng) {
    this.map.panTo(coordinates);
    this.map.setZoom(12);
    this.map.setView(coordinates, 12)
  }

  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }

}
