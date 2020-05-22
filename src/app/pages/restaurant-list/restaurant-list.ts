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
  cafeList ;
  restaurant ;
  categoryImg ;
  categoryName ;
 

  constructor(public deliveryData: DeliveryData, 
              private route: ActivatedRoute, 
              public loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.getMealList();
  }

  async getMealList() {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
   
    let  loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    this.deliveryData.getImageByCategory(categoryId).subscribe((data: any) => {
         this.categoryImg = data.categoryThumb;
         this.categoryName = data.categoryName;
    })

    this.deliveryData.getRestaurants("", "" , categoryId).subscribe((data: any) => {
        this.cafeList = data;
        loading.dismiss(); 
      })
  
  }
}
