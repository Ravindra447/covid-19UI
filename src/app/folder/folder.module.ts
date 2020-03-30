import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA50lL8jt2R_R_8A-zamt9HNv6jZFwGj60',
      libraries: ['places']
    })
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {


}
