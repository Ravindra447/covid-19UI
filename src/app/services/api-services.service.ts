import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {ApiConfigService} from '../../config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  url: any;

  constructor(private http: HttpClient,private config: ApiConfigService) {
    this.url=config.url;
   }

  getCovidData(state){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.url + `/getCovidDataByState/${state}`, httpOptions)
  }

  getTrackNearMeData(lat,lng){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(this.url + `/getNearPersonInfo/${lat}/${lng}/30000`, httpOptions)
  }
}
