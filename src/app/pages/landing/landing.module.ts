import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LandingPage } from './landing';
import { LandingPageRoutingModule } from './landing-routing.module';
import {FoodCategoryCardComponent} from '../../components/food-category-card/food-category-card.component'
import {RestaurantCardComponent} from '../../components/restaurant-card/restaurant-card.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule
  ],
  declarations: [
    LandingPage,
    FoodCategoryCardComponent,
    RestaurantCardComponent
  ],
  entryComponents: [
    
  ]
})
export class LandingModule { }
