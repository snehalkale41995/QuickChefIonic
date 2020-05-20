import { Component } from '@angular/core';
import { DeliveryData } from '../../providers/delivery-data';
import {LoadingController } from "@ionic/angular";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
  styleUrls: ['./restaurant-list.scss'],
})
export class RestaurantListPage {
  meals: any[] = [];
  cafeList ; restaurant;

  constructor(public deliveryData: DeliveryData, 
              private route: ActivatedRoute, 
              public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getMealList();
  }

  async getMealList() {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    console.log("categoryId", categoryId)
    let  loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();
    
  //   await this.deliveryData.getMealList().subscribe((mealList: any[]) => {
  //     this.meals = mealList;
  //   });
  //   loading.dismiss(); 
  // }
 
  

 
  this.deliveryData.load().subscribe((data: any) => {
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
   
    this.deliveryData.getImageByCategory(categoryId).subscribe((data: any) => {
         console.log("data", data)
    })
  
  }
}
