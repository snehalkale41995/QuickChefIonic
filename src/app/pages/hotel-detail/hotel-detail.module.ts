import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelDetailPage } from './hotel-detail';
import { HotelDetailPageRoutingModule } from './hotel-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HotelDetailPageRoutingModule
  ],
  declarations: [
    HotelDetailPage,
  ]
})
export class HotelDetailModule { }
