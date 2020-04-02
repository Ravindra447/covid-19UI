import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { AgmCoreModule } from '@agm/core';

import { HomeComponent } from './components/home/home.component';
import { DataPopoverComponent } from './components/data-popover/data-popover.component';
import { FindNearComponent } from './components/find-near/find-near.component';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA50lL8jt2R_R_8A-zamt9HNv6jZFwGj60',
      libraries: ['places']
    }),
    MatTooltipModule
  ],
  entryComponents:[],
  declarations: [HomeComponent,FindNearComponent],
  providers:[UniqueDeviceID]
})
export class FolderPageModule {


}
