import { Component, OnInit } from '@angular/core';
import { DeliveryData } from "../../providers/delivery-data";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ModalController } from '@ionic/angular';
import {ConfirmOrderComponent}  from '../../components/confirm-order/confirm-order.component'
import { OrderData } from '../../providers/order-data';
import { CanLoad, Router } from "@angular/router";
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {

  addressNote ;
  defaultHrefLink = `/app/tabs/restaurants/order-details`;
  textFocus =  false;
  couponNote ;  
  order : any;
  couponList : any;
  totalAmount ; discountAmount; couponName = "";

  constructor( private dataProvider: DeliveryData,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private orderProvider: OrderData,
    public modalCtrl : ModalController,
    private router: Router) { }

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

    let coupon = this.couponList.filter(function (e:any) {
      return e.Name === event.detail.value;
    });
    this.couponName = event.detail.value
    this.order.total = this.totalAmount
    this.order.discount = this.discountAmount

    let  discount = (this.order.total * coupon[0].Discount)/100
    let total = this.order.total - discount
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
      this.order = data;
      this.totalAmount = data.total;
      this.discountAmount = data.discount;
      // this.order.restaurantDetails = this.hotel;
      loading.dismiss();
    });
    this.dataProvider.getCoupons().subscribe((data: any) => {
      this.couponList = data;
    //  this.order = data;
      // this.order.restaurantDetails = this.hotel;
      loading.dismiss();
    });
  }
   
  async openModal(){
  let  orderHeader, orderDetails;
   let OrderInfo = {
    OrderTotalOriginal : this.totalAmount,
    OrderTotal : this.order.total,
    CouponCode : this.couponName,
    CouponCodeDiscount : this.order.discount,
    OrderDate : new Date(),
    PickUpTime : new Date()
   }

  await  this.orderProvider.saveTotalOrderHeader(OrderInfo);

  await this.storage.get("orderHeader").then((val) => {
    orderHeader = val;
    
})

await this.storage.get("orderDetails").then((val) => {
  orderDetails = val;
})

  this.dataProvider.addOrderHeader(orderHeader).subscribe((data: any) => {
      let orderId = data.Id
      this.dataProvider.addOrderDetails(orderDetails, orderId).subscribe((data: any) => {
       this.dataProvider.deleteUserCart().subscribe((data: any) => {
     //   this.router.navigate(["/app", "tabs", "restaurants", "track-order"]);
     });
    });
  });

  
 
  const modal = await this.modalCtrl.create({
    component: ConfirmOrderComponent,
    cssClass: 'my-custom-modal-css',
    backdropDismiss: false
  });
  await modal.present();

  }
}
