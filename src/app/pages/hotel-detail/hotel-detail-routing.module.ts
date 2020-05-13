import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HotelDetailPage } from './hotel-detail';

const routes: Routes = [
  {
    path: '',
    component: HotelDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelDetailPageRoutingModule { }
