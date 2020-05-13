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
import { MealDetailPageModule } from '../meal-detail/meal-detail.module'
import { MealDetailPage } from '../meal-detail/meal-detail.page';
@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    LandingModule,
    HotelDetailModule,
    MealDetailPageModule,
    RestaurantDetailModule,
    RestaurantListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
