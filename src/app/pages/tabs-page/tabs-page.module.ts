import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { LandingModule } from '../landing/landing.module';
import { HotelDetailModule } from '../hotel-detail/hotel-detail.module';
import { RestaurantDetailModule } from '../restaurant-detail/restaurant-detail.module';
import { RestaurantListModule } from '../restaurant-list/restaurant-list.module';
import { MealDetailPageModule } from '../meal-detail/meal-detail.module'
import { OffersPageModule } from '../offers/offers.module'
@NgModule({
  imports: [
    TabsPageRoutingModule,
    CommonModule,
    IonicModule,
    LandingModule,
    HotelDetailModule,
    MealDetailPageModule,
    RestaurantDetailModule,
    RestaurantListModule,
    OffersPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
