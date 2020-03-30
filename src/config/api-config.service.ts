import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  url = 'http://localhost:9095/apis' 
  constructor() { }
}
