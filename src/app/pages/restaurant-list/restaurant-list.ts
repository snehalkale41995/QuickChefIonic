import { Component } from '@angular/core';
import { DeliveryData } from '../../providers/delivery-data';
import {LoadingController } from "@ionic/angular";

@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
  styleUrls: ['./restaurant-list.scss'],
})
export class RestaurantListPage {
  meals: any[] = [];

  constructor(public deliveryData: DeliveryData,  public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getMealList();
  }

  async getMealList() {

    let  loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();
    
    await this.deliveryData.getMealList().subscribe((mealList: any[]) => {
      console.log("mealList", mealList)
      this.meals = mealList;
    });
    loading.dismiss(); 
  }

}
