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
    this.initializeMap();
    this.initializeDefaultMapPoint();
  }

  private initializeMap() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
      ],
      zoom: 5,
      center: latLng(46.879966, -121.726909)
    }
  }

  private initializeMapClickEvent() {
    const mapIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
    this.map.on('click', <LeafletMouseEvent> (e) => {
      if (this.map.hasLayer(this.lastLayer)) {
        this.map.removeLayer(this.lastLayer);
      }
      this.lastLayer = marker(e.latlng).setIcon(mapIcon);
      this.lastLayer.addTo(this.map);
      this.updateMapPoint(e.latlng);
    });
  }
  private initializeDefaultMapPoint() {
    this.mapPoint = {
      name: "Hello",
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE
    };
  }

  onMapReady(map: Map) {
    this.map = map;
    const mapIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
    this.lastLayer = null;
    if (this.mapPoint.longitude && this.mapPoint.latitude) {
      const latlng = new LatLng(this.mapPoint.latitude, this.mapPoint.longitude);
      this.lastLayer = marker(latlng).setIcon(mapIcon).addTo(this.map);
      setTimeout(function () {
        map.invalidateSize();
        map.panTo(latlng);
        map.setZoom(12);
        map.setView(latlng, 12);
      }, 100)
    }
    this.initializeMapClickEvent();
  }

  private updateMapPoint(latLng: any) {
    this.mapPoint.latitude = latLng.lat;
    this.mapPoint.longitude = latLng.lng;
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

  getAddress(lat, lng, displayName) {
    this.mapPoint.latitude = lat;
    this.mapPoint.longitude = lng;
    this.mapPoint.name = displayName;
    this.generateIcon();
    const latlng = new LatLng(this.mapPoint.latitude, this.mapPoint.longitude);
    this.map.invalidateSize();
    this.map.panTo(latlng);
    this.map.setZoom(12);
    this.map.setView(latlng, 12)
  }

  private generateIcon() {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
    const mapIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '/content/2273e3d8ad9264b7daa5bdbf8e6b47f8.png'
    });
    const latlng = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(latlng).setIcon(mapIcon).addTo(this.map);
    this.map.setView(latlng, 12);
  }


}
