import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GeocodingComponent} from './geocoding/geocoding.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {NominatimService} from "./services/nominatim-service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { MapComponent } from './map/map.component';
import { MapPointFormComponent } from './map-point-form/map-point-form.component';

@NgModule({
  declarations: [
    AppComponent,
    GeocodingComponent,
    MapComponent,
    MapPointFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
    FormsModule
  ],
  providers: [
    NominatimService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
