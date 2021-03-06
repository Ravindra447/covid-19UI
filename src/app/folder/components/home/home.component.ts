import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../../../services/api-services.service';
import { PopoverController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device';
// import { DataPopoverComponent } from '../../components/data-popover/data-popover.component'
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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute,
    private apiService: ApiServicesService,
    private popover: PopoverController,
    private uniqueDeviceID: UniqueDeviceID) { }

  defaultState: string;

  latitude: number;
  longitude: number;
  zoom: number;
  minZoom:number;
  CovidData: any;
  covidDataByStates: any = [];
  totalStateInfo:any=[];
  totalConfirmedCases: number;
  newlyConfirmedCases: number;
  totalDeaths: number;
  newDeaths: number;
  totalRecoveredCases: number;
  newlyRecoveredCases: number;

  CAAB: string;
  CABC: string;
  CAMB: string;
  CANB: string;
  CANL: string;
  CANS: string;

  CANT: string;
  CANU: string;
  CAON: string;
  CAPE: string;

  CAQC: string;

  CASK: string;
  CAYT: string;
  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder=window.location.pathname.split('covid-19/')[1];
    if (this.folder === "canada") {
      this.defaultState = "CA";
      this.zoom = 4
    } else {
      this.defaultState = "global";
      this.zoom = 3
    }
    this.minZoom=this.zoom-1;
    this.getCovidData();

    this.uniqueDeviceID.get()
  .then((uuid: any) => console.log(uuid))
  .catch((error: any) => console.log(111,error));
  
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
  private getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position); 
        this.getTrackNearMeData();
        this.zoom = 12;
        this.minZoom=3;
        this.markers.push(   {
          lat: this.latitude,
          lng: this.longitude,
          // label: '542',
          draggable: false,
          content: 'Me',
          isShown: false,
          icon: './assets/icon/myMaps.png'
        })
      });
    }
  }
  getTrackNearMeData(){
    this.apiService.getTrackNearMeData(this.latitude,this.longitude).subscribe((data: any) => {
      if(data.status){
        let TrackedData=data.result;
        TrackedData.forEach(user => {
          this.markers.push(
            {
              lat: user.geometry.coordinates[0],
              lng: user.geometry.coordinates[1],
              // label: '542',
              draggable: false,
              content: user.name,
              isShown: false,
              icon: './assets/icon/map.png'
            })
        });
      }
      console.log(data);
    })
  }

  mapMouseOver(state) {
    // console.log(state,this.CAAB)
    // this.CAAB=state;
    // this.popover.create({
    //   component: DataPopoverComponent,
    //   translucent: true
    // }).then((popoverElement)=>{
    //   popoverElement.present();
    // });
  }
  getCovidData() {
    this.apiService.getCovidData(this.defaultState).subscribe((data: any) => {
      if (data.satus) {
        this.CovidData = data.result;
        this.latitude = this.CovidData.location.lat;
        this.longitude = this.CovidData.location.long;

        this.totalConfirmedCases = this.CovidData.stats.totalConfirmedCases;

        this.newlyConfirmedCases = this.CovidData.stats.newlyConfirmedCases;
        this.totalDeaths = this.CovidData.stats.totalDeaths;
        this.newDeaths = this.CovidData.stats.newDeaths;
        this.totalRecoveredCases = this.CovidData.stats.totalRecoveredCases;
        this.newlyRecoveredCases = this.CovidData.stats.newlyRecoveredCases;
        this.covidDataByStates = this.CovidData.stats.breakdowns;

        this.covidDataByStates.forEach(stateData => {
          this.totalStateInfo.push({
            countryOrRegion: stateData.location.countryOrRegion,
            provinceOrState: stateData.location.provinceOrState,
            totalConfirmedCases: stateData.totalConfirmedCases,
            newlyConfirmedCases: stateData.newlyConfirmedCases,
            isoCode: stateData.location.isoCode,
            totalDeaths: stateData.totalDeaths,
            newDeaths: stateData.newDeaths,
            totalRecoveredCases: stateData.totalRecoveredCases,
            newlyRecoveredCases: stateData.newlyRecoveredCases})
          });
        console.log(this.markers);
        if(this.folder === "tracker"){
          this.getCurrentLocation();
        }else{
          this.setMarkerInMap();
        }

        // this.setSvgContent();
      }
    })
  }
  setMarkerInMap(){
    this.covidDataByStates.forEach(stateData => {
      this.markers.push({
        // countryOrRegion: stateData.location.countryOrRegion,
        // provinceOrState: stateData.location.provinceOrState,
        // totalConfirmedCases: stateData.totalConfirmedCases,
        // newlyConfirmedCases: stateData.newlyConfirmedCases,
        // isoCode: stateData.location.isoCode,
        // totalDeaths: stateData.totalDeaths,
        // newDeaths: stateData.newDeaths,
        // totalRecoveredCases: stateData.totalRecoveredCases,
        // newlyRecoveredCases: stateData.newlyRecoveredCases,


        lat: stateData.location.lat,
        lng: stateData.location.long,
        // label: '542',
        draggable: false,
        content: 'Cases - ' + stateData.totalConfirmedCases,
        isShown: false,
        icon: './assets/icon/map.png'
      })
    });
    
  }
  setSvgContent(){
    
    this.CAAB = this.markers.find(obj => obj.isoCode == "CA-AB").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-AB").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-AB").totalDeaths;
    this.CABC = this.markers.find(obj => obj.isoCode == "CA-BC").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-BC").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-BC").totalDeaths;
    console.log(this.markers.find(obj => obj.isoCode == "CA-AB"), this.markers.find(obj => obj.isoCode = "CA-BC"))
    this.CAYT = this.markers.find(obj => obj.provinceOrState == "Yukon").provinceOrState + ", " + this.markers.find(obj => obj.provinceOrState == "Yukon").content + ", Deaths " + this.markers.find(obj => obj.provinceOrState == "Yukon").totalDeaths;
    this.CASK = this.markers.find(obj => obj.isoCode == "CA-SK").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-SK").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-SK").totalDeaths;

    this.CAQC = this.markers.find(obj => obj.isoCode == "CA-QC").provinceOrState + ", " + this.markers.find(obj => obj.isoCode = "CA-QC").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-QC").totalDeaths;
    this.CAPE = this.markers.find(obj => obj.isoCode == "CA-PE").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-PE").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-PE").totalDeaths;

    this.CAON = this.markers.find(obj => obj.isoCode == "CA-ON").provinceOrState + ", " + this.markers.find(obj => obj.isoCode = "CA-ON").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-ON").totalDeaths;

    // this.CANU=this.markers.find(obj=>obj.isoCode=="CA-NU").provinceOrState+", "+this.markers.find(obj=>obj.isoCode=="CA-NU").content+", Deaths "+this.markers.find(obj=>obj.isoCode=="CA-NU").totalDeaths;

    this.CANT = this.markers.find(obj => obj.provinceOrState == "Northwest Territories").provinceOrState + ", " + this.markers.find(obj => obj.provinceOrState == "Northwest Territories").content + ", Deaths " + this.markers.find(obj => obj.provinceOrState == "Northwest Territories").totalDeaths;

    this.CANS = this.markers.find(obj => obj.isoCode == "CA-NS").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-NS").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-NS").totalDeaths;
    this.CANL = this.markers.find(obj => obj.isoCode == "CA-NL").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-NL").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-NL").totalDeaths;

    this.CANB = this.markers.find(obj => obj.isoCode == "CA-NB").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-NB").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-NB").totalDeaths;
    this.CAMB = this.markers.find(obj => obj.isoCode == "CA-MB").provinceOrState + ", " + this.markers.find(obj => obj.isoCode == "CA-MB").content + ", Deaths " + this.markers.find(obj => obj.isoCode == "CA-MB").totalDeaths;
  }
}
