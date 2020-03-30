import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../services/api-services.service';
// interface marker {
//   lat: number;
//   lng: number;
//   label?: string;
//   draggable: boolean;
//   content?: string;
//   isShown: boolean;
//   icon: string;
// }
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiServicesService) { }

  defaultState:string;

  latitude: number;
  longitude: number;
  zoom: number;
  CovidData: any;
  covidDataByStates: any = [];

  totalConfirmedCases: number;
  newlyConfirmedCases: number;
  totalDeaths: number;
  newDeaths: number;
  totalRecoveredCases: number;
  newlyRecoveredCases: number;

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.folder==="canada"){
      this.defaultState="CA";
      this.latitude=56.130366;
      this.longitude=-106.346771;
      this.zoom=4
    }else{
      this.defaultState="global";
      this.zoom=3
    }
    this.getCovidData();
  }
  markers: any = []
  // markers: marker[] = [
  //   {
  //     lat: 53.9333,
  //     lng: -116.5765,
  //     // label: '542',
  //     draggable: false,
  //     content: 'Alberta : Cases - 542',
  //     isShown: false,
  //     icon: './assets/icon/map.png'
  //   }
  // ]
  // private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 15;
  //     });
  //   }
  // }
  getCovidData() {
    this.apiService.getCovidData(this.defaultState).subscribe((data: any) => {
      if (data.satus) {
        this.CovidData = data.result;
        this.latitude = this.CovidData.location.lat;
        this.longitude = this.CovidData.location.long;
        // console.log(this.CovidData)

        this.totalConfirmedCases=this.CovidData.stats.totalConfirmedCases;

        this.newlyConfirmedCases=this.CovidData.stats.newlyConfirmedCases;
        this.totalDeaths=this.CovidData.stats.totalDeaths;
        this.newDeaths=this.CovidData.stats.newDeaths;
        this.totalRecoveredCases=this.CovidData.stats.totalRecoveredCases;
        this.newlyRecoveredCases=this.CovidData.stats.newlyRecoveredCases;


        this.covidDataByStates = this.CovidData.stats.breakdowns;
        console.log(this.covidDataByStates)

        this.covidDataByStates.forEach(stateData => {
          this.markers.push({
            countryOrRegion:stateData.location.countryOrRegion,
            provinceOrState:stateData.location.provinceOrState,
            totalConfirmedCases:stateData.totalConfirmedCases,
            newlyConfirmedCases:stateData.newlyConfirmedCases,

            totalDeaths:stateData.totalDeaths,
            newDeaths:stateData.newDeaths,
            totalRecoveredCases:stateData.totalRecoveredCases,
            newlyRecoveredCases:stateData.newlyRecoveredCases,


            lat: stateData.location.lat,
            lng: stateData.location.long,
            // label: '542',
            draggable: false,
            content: 'Cases - '+stateData.totalConfirmedCases,
            isShown: false,
            icon: './assets/icon/map.png'
          })
        });
      }
    })
  }
}
