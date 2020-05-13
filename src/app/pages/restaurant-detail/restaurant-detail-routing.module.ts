import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantDetailPage } from './restaurant-detail';

const routes: Routes = [
  {
    path: '',
    component: RestaurantDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantDetailPageRoutingModule { }
