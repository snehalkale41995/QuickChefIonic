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
    this.deliveryData.getImageByCategory(categoryId).subscribe((data: any) => {
         this.categoryImg = data;
    })

    this.deliveryData.getRestaurants("", "" , categoryId).subscribe((data: any) => {
      console.log("data", data)
        this.cafeList = data;
        loading.dismiss(); 
      })
  
  }
}
