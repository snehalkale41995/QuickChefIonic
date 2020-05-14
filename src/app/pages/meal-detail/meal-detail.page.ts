import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryData } from '../../providers/delivery-data';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.page.html',
  styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage {
  defaultHref = ''
  mealDetails: any;
  ingredientList : any;
  restaurantDetails : any;
  constructor(
    private dataProvider: DeliveryData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: DeliveryData,
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const mealId = this.route.snapshot.paramMap.get('mealId');
      const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
      if (data && data.restaurantList) {
        for (const item of data.restaurantList) {
          if (item && item.$key === restaurantId) {
          let mealList = item.menuList
        {
          for(const meal of mealList) {
          if (meal && meal.$key === mealId) {
            this.mealDetails = meal;
            this.restaurantDetails = item
            }
         }
      }
    }
  }
  }
   this.ingredientList = this.mealDetails.ingredients
    });
  }

}
