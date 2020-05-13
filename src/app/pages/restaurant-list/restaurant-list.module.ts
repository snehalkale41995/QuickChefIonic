import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from "../../../pipes.module";
import { RestaurantListPage } from './restaurant-list';
import { RestaurantListPageRoutingModule } from './restaurant-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RestaurantListPageRoutingModule,
    PipesModule
  ],
  declarations: [RestaurantListPage],
})
export class RestaurantListModule {}
