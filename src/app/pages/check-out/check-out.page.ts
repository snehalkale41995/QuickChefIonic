import { Component, OnInit } from '@angular/core';
import { DeliveryData } from "../../providers/delivery-data";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {

  addressNote ;
  defaultHrefLink = `/app/tabs/restaurants/hotel-details`;
  textFocus =  false;
  couponNote ;  
  order : any;

  constructor( private dataProvider: DeliveryData,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public modalCtrl : ModalController) { }

  ngOnInit() {
    this.storage.get("currentLocation").then((value)=>{
      this.addressNote = value.deviceLocation  + ", " +value.cityName
    })
    this.getOrderDetails()
  }

  changeAddress(){
    this.textFocus = true;
  }

  async getOrderDetails(){
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000,
    });
    await loading.present();
    this.dataProvider.getOrderDetails().subscribe((data: any) => {
      console.log("this.order", data);
      this.order = data;
      // this.order.restaurantDetails = this.hotel;
      loading.dismiss();
    });
  }
   
  async openModal(){
   
  
  }
}
