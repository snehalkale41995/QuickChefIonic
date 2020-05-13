import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryData } from '../../providers/delivery-data';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html',
  styleUrls: ['./hotel-detail.scss'],
})
export class HotelDetailPage {
  hotel: any;
  cafeList : any;
  constructor(
    private dataProvider: DeliveryData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: DeliveryData,
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const hotelId = this.route.snapshot.paramMap.get('hotelId');
     
      if (data && data.restaurantList) {
        for (const item of data.restaurantList) {
          if (item && item.$key === hotelId) {
            this.hotel = item;
            break;
          }
        }
      }
      console.log("hotellll", this.hotel)
    });
  }

}
