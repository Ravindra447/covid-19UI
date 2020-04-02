import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  url = 'http://localhost:9095/apis'
  // url ='https://dg-covid-19.herokuapp.com/apis'
  // url = '/apis'

   
  constructor() { }
}
