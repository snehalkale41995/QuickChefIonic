import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryData } from '../../providers/delivery-data';
import { ActionSheetController } from '@ionic/angular';
import {LoadingController } from "@ionic/angular";

@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html',
  styleUrls: ['./hotel-detail.scss'],
})
export class HotelDetailPage {
  hotel: any;
  menuList : any;
  defaultHref = 'app/tabs/landing'
  ratings : any;
  slideOpts = {
    slidesPerView: 3,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }  

  constructor(
    private dataProvider: DeliveryData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: DeliveryData,
    public loadingCtrl: LoadingController
  ) {}

 async ionViewWillEnter() {
    let  loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 3000
    });
     await loading.present();
        const hotelId = this.route.snapshot.paramMap.get('hotelId');

        this.dataProvider.getMenuListByRestaurant(hotelId).subscribe((data)=>{
            this.menuList = data;
        })
        this.dataProvider.getRestaurantDetails(hotelId).subscribe((data : any)=>{
           this.hotel = data;
           loading.dismiss();
        })
   }

}
