import { NgModule } from '@angular/core';
import {RestaurantCardComponent} from '../components/restaurant-card/restaurant-card.component'
import {FoodCategoryCardComponent} from '../components/food-category-card/food-category-card.component'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from "../../pipes.module";

@NgModule({
    imports: [
        FormsModule,
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        PipesModule
    ],
    declarations: [RestaurantCardComponent, FoodCategoryCardComponent],
    exports : [RestaurantCardComponent, FoodCategoryCardComponent]
  })

  export class ComponentsModule{}