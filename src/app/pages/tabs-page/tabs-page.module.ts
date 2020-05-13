import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { LandingModule } from '../landing/landing.module';
import { HotelDetailModule } from '../hotel-detail/hotel-detail.module';
import { RestaurantDetailModule } from '../restaurant-detail/restaurant-detail.module';
import { RestaurantListModule } from '../restaurant-list/restaurant-list.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    LandingModule,
    HotelDetailModule,
    RestaurantDetailModule,
    RestaurantListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
