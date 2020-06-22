import { Component, OnInit } from "@angular/core";
import { DeliveryData } from "../../providers/delivery-data";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ModalController, AlertController, ToastController } from "@ionic/angular";
import { ConfirmOrderComponent } from "../../components/confirm-order/confirm-order.component";
import { StripePayComponent } from "../../components/stripe-pay/stripe-pay.component";
import { OrderData } from "../../providers/order-data";
import { CanLoad, Router } from "@angular/router";
import { Stripe} from '@ionic-native/stripe/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {AppConfig} from '../../appConstants/AppConfig';
@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.page.html",
  styleUrls: ["./check-out.page.scss"],
})
export class CheckOutPage implements OnInit {
  addressNote;
  defaultHrefLink = `/app/tabs/restaurants/order-details`;
  textFocus = false;
  couponNote;
  order: any;
  couponList: any;
  LoggedInId;
  totalAmount;
  discountAmount;
  couponName = "";
  cardDetails;
  payValue = "cod"
  userInfo ;
  stripe_key = AppConfig.publishable_key;

  constructor(
    private dataProvider: DeliveryData,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    private orderProvider: OrderData,
    public modalCtrl: ModalController,
    public alertCntrl: AlertController,
    private router: Router,
    public stripe : Stripe,
    public toastController : ToastController,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.storage.get("currentLocation").then((value) => {
      this.addressNote = value.deviceLocation + ", " + value.cityName;
    });
    this.storage.get("loggedInUserId").then((userId) => {
      this.LoggedInId = userId;
    });
    this.storage.get("loggedInUserInfo").then((userInfo) => {
      this.userInfo = userInfo;
    });
    this.getCartDetails();
  }

  changeAddress() {
    this.textFocus = true;
  }

   async checkPayValue(event){
      this.payValue = event.detail.value

     if(this.payValue == "stripe"){
      const payModal = await this.modalCtrl.create({
        component: StripePayComponent,
        cssClass: "my-pay-modal-css",
       // backdropDismiss: false,
      });
      await payModal.present();

      payModal.onDidDismiss().then(data=>{
        this.cardDetails = data.data
        })
     }
   }


  checkValue(event) {
    let coupon = this.couponList.filter(function (e: any) {
      return e.Name === event.detail.value;
    });
    this.couponName = event.detail.value;
    this.order.total = this.totalAmount;
    this.order.discount = this.discountAmount;

    let discount = (this.order.total * coupon[0].Discount) / 100;
    let total = this.order.total - discount;
    this.order.total = total.toFixed(2);
    this.order.discount = discount.toFixed(2);
  }

  async getCartDetails() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
     // duration: 3000,
    });
    await loading.present();
    this.storage.get("loggedInUserId").then((userId) => {
      this.dataProvider.getCartDetails(userId).subscribe((data: any) => {
        this.order = data;
        this.totalAmount = data.total;
        this.discountAmount = data.discount;
        // this.order.restaurantDetails = this.hotel;
        loading.dismiss();
      });
    });

    this.dataProvider.getCoupons().subscribe((data: any) => {
      this.couponList = data;
      //  this.order = data;
      // this.order.restaurantDetails = this.hotel;
      loading.dismiss();
    });
  }

  async checkOut() {

    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
     // duration: 3000,
    });
    await loading.present();

    if(this.LoggedInId){
        let dt = new Date();
         dt.setHours( dt.getHours() + 1 );
      let orderHeader, orderDetails;
      let OrderInfo = {
        OrderTotalOriginal: this.totalAmount,
        OrderTotal: this.order.total,
        CouponCode: this.couponName,
        CouponCodeDiscount: this.order.discount,
        OrderDate: new Date(),
        PickUpTime: dt,
      };
  
      await this.orderProvider.saveTotalOrderHeader(OrderInfo);
  
      await this.storage.get("orderHeader").then((val) => {
        orderHeader = val;
      });
  
      await this.storage.get("orderDetails").then((val) => {
        orderDetails = val;
      });
     

      
     

      if(this.payValue === "cod"){
        this.payCod(orderHeader, orderDetails, loading)
      }
      else{
        this.payWithStripe(orderHeader, orderDetails, loading)
      }
    }
    else{
      this.presentAlert()
    }
  }

 async payCod(orderHeader, orderDetails, loading){
   
    this.dataProvider.addOrderHeader(orderHeader).subscribe((data: any) => {
      if(data && data.Id){
        let orderId = data.Id;
        this.dataProvider
          .addOrderDetails(orderDetails, orderId)
          .subscribe((data: any) => {
            this.storage.get("loggedInUserId").then((userId) => {
              this.dataProvider.deleteUserCart(userId).subscribe((data: any) => {
                this.dataProvider.sendOrderConfirmEmail(this.userInfo, orderHeader, orderDetails, orderId, this.addressNote).subscribe((data: any) => {
                  this.openConfirmOrderModal()
                  loading.dismiss()
                  this.dataProvider.sendMessage(this.userInfo, orderHeader).subscribe((data: any) => {}); 
                 }); 
              });
            });
          });
      }
      else{
        this.presentToast();
      }
    });
  }

 async openConfirmOrderModal(){
    const modal = await this.modalCtrl.create({
      component: ConfirmOrderComponent,
      cssClass: "my-custom-modal-css",
      backdropDismiss: false,
    });
     await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertCntrl.create({
      cssClass: "my-custom-class",
      message: "Please Login First !",
      buttons: ["OK"],
    });
    await alert.present();
  }

  payWithStripe(orderHeader, orderDetails, loading) {
    this.stripe.setPublishableKey(this.stripe_key);

    this.cardDetails = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    }
    this.stripe.createCardToken(this.cardDetails)
      .then(token => {
       let data = {
        tokenId : token.id,
        amount : parseInt(this.order.total)+1000,
        currency : 'INR'
       }
     
       this.dataProvider.makePayment(data).subscribe((data: any) => {
       
        if(data.data){
          orderHeader.TransactionId = data.data;
          orderHeader.PaymentStatus = "Approved"
          this.payCod(orderHeader, orderDetails, loading)
        }
        else{
          this.presentToast();
        }
      });
      })
      .catch(error => console.error(error));
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Something went Wrong !',
      duration: 1000
    });
    toast.present();
  }

  sendWhatsappMsg(){
    this.socialSharing.shareViaWhatsAppToReceiver('918500456787', "hey there", '', '').then((response) => {
      // Success!
     }).catch((error) => {
    //  console.log("errore", error)
     });
  }

}
