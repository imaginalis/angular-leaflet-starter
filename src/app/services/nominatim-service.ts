import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {NominatimResponse} from "../shared/models/nominatim-response.model";
import {map} from "rxjs/operators";

@Injectable()
export class NominatimService {

  constructor(private http: HttpClient) {
  }

  addressLookup(req?: any): Observable<NominatimResponse[]> {
    let url = "https://nominatim.openstreetmap.org/search?format=json&q=" + req + "&viewbox=17.32%2C54.14%2C18.46%2C53.33&bounded=1";
    return this.http
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      )
  }

}
