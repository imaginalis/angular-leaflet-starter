import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NominatimService {

  constructor(private http: HttpClient) {
  }

  addressLookup(req?: any) {
    let url = "https://nominatim.openstreetmap.org/search?format=json&q=" + req + "&viewbox=17.32%2C54.14%2C18.46%2C53.33&bounded=1";
    return this.http
      .get(url);
  }

}
