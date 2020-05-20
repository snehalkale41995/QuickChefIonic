import { Component, OnInit } from '@angular/core';
import { DeliveryData } from '../../providers/delivery-data';
import { LoadingController} from "@ionic/angular";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  isOffer = true;
  cityName = "pune";
  deviceLocation = "aundh";
  restaurantName = "";
  restaurantList ;

  constructor(public deliveryData: DeliveryData,  
              public loadingCtrl: LoadingController,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get('cityName').then((val) => {
       this.cityName = val;
    });
    this.getRestaurants()
  }
  
 async getRestaurants(){
  let loading = await this.loadingCtrl.create({
    message: "Please wait...",
    duration: 2000,
  });

  await loading.present();
   
  await this.deliveryData.getRestaurants(this.restaurantName, this.cityName).subscribe((data: any) => {
      this.restaurantList = data
      loading.dismiss();
    });
  }
  
}
