import { Component, OnInit } from '@angular/core';
import { DeliveryData } from "../../providers/delivery-data";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import {ConfirmOrderComponent}  from '../../components/confirm-order/confirm-order.component'

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
    this.getCartDetails()
  }

  changeAddress(){
    this.textFocus = true;
  }

  async getCartDetails(){
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000,
    });
    await loading.present();
    this.dataProvider.getCartDetails().subscribe((data: any) => {
      console.log("this.order", data);
      this.order = data;
      // this.order.restaurantDetails = this.hotel;
      loading.dismiss();
    });
  }
   
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ConfirmOrderComponent,
      cssClass: 'my-custom-modal-css'
    });
    await modal.present();
  }
}
