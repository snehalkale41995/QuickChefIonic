import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantDetailPage } from './restaurant-detail';
import { RestaurantDetailPageRoutingModule } from './restaurant-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RestaurantDetailPageRoutingModule
  ],
  declarations: [
    RestaurantDetailPage,
  ]
})
export class RestaurantDetailModule { }
