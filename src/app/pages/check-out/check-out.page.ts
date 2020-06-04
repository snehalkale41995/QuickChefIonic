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
  couponList : any;
  totalAmount ; discountAmount;

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

  checkValue(event){
    console.log("event", event.detail.value)

    let coupon = this.couponList.filter(function (e:any) {
      return e.Name === event.detail.value;
    });
    let discount = this.discountAmount;
    let total = this.totalAmount
   
    discount = (this.totalAmount * coupon[0].Discount)/100
    total = this.order.total - discount
    console.log("discount", discount)
    console.log("total", total)
    this.order.total = total.toFixed(2);
    this.order.discount = discount.toFixed(2)
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
      this.totalAmount = data.total;
      this.discountAmount = data.discount;
      // this.order.restaurantDetails = this.hotel;
      loading.dismiss();
    });
    this.dataProvider.getCoupons().subscribe((data: any) => {
      console.log("this.data", data);
      this.couponList = data;
    //  this.order = data;
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
