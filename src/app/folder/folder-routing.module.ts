import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FindNearComponent} from './components/find-near/find-near.component';
const routes: Routes = [
  {
    path: '',
    redirectTo:'canada',
    pathMatch:"full"
  },
  {
    path:'canada',
    component:HomeComponent
  },
  {
    path:'global',
    component:HomeComponent
  },
  {
    path:'findNear',
    component:FindNearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
