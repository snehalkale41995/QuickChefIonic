import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryData } from '../../providers/delivery-data';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'page-restaurant-detail',
  templateUrl: 'restaurant-detail.html',
  styleUrls: ['./restaurant-detail.scss'],
})
export class RestaurantDetailPage {
  restaurant: any;
  cafeList : any;
  constructor(
    private dataProvider: DeliveryData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: DeliveryData,
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const categoryId = this.route.snapshot.paramMap.get('restaurantId');
      console.log("categoryId", categoryId)
      if(data && data.restaurantList){
        this.cafeList = data.restaurantList;
      }
      if (data && data.foodItemList) {
        for (const foodItem of data.foodItemList) {
          if (foodItem && foodItem.$key === categoryId) {
            this.restaurant = foodItem;
            break;
          }
        }
      }
    });
  }

}
