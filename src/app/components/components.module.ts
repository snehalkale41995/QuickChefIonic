import { NgModule } from "@angular/core";
import { RestaurantCardComponent } from "../components/restaurant-card/restaurant-card.component";
import { FoodCategoryCardComponent } from "../components/food-category-card/food-category-card.component";
import { CategoryCartComponent } from "../components/category-cart/category-cart.component";
import { MenuCartComponent } from "../components/menu-cart/menu-cart.component";
import { SpecialMenuCartComponent } from "../components/special-menu-cart/special-menu-cart.component";
import {OrderHistoryComponent} from "../components/order-history/order-history.component"
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "../../pipes.module";

@NgModule({
  imports: [
    FormsModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    PipesModule,
  ],
  declarations: [
    RestaurantCardComponent,
    FoodCategoryCardComponent,
    CategoryCartComponent,
    MenuCartComponent,
    SpecialMenuCartComponent,
    OrderHistoryComponent
  ],
  exports: [
    RestaurantCardComponent,
    FoodCategoryCardComponent,
    CategoryCartComponent,
    MenuCartComponent,
    SpecialMenuCartComponent,
    OrderHistoryComponent
  ],
})
export class ComponentsModule {}
