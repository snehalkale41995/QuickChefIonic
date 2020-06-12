import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeliveryData } from "../../providers/delivery-data";
import { OrderData } from '../../providers/order-data'
import { LoadingController , AlertController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.page.html",
  styleUrls: ["./my-order.page.scss"],
})
export class MyOrderPage {
  hotel: any;
  LoggedInId ;
  order: any;
  hotelId;
  deliverNote : "";
  isLoaded = false;
  defaultHrefLink = `/app/tabs/restaurants/hotel-details`;
  constructor(
    private dataProvider: DeliveryData,
    private orderProvider: OrderData,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public alertpCtrl:  AlertController,
    public router: Router
  ) {}

  ionViewWillEnter() {
    this.getCartDetails();
    this.storage.get("loggedInUserId").then((userId)=>{
      this.LoggedInId = userId;
    })
  }

  doRefresh(event) {
    let compRef = this;
    setTimeout(() => {
      event.target.complete();
      compRef.getCartDetails()
    }, 2000);
  }

  async getCartDetails() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000,
    });
    await loading.present();
    this.hotelId = this.route.snapshot.paramMap.get("hotelId");

    this.storage.get("selectedRestaurantId").then((val) => {
      this.hotelId = val;

      this.dataProvider
        .getRestaurantDetails(this.hotelId)
        .subscribe((data: any) => {
          this.hotel = data;
          this.storage.get("loggedInUserId").then((userId)=>{
            console.log("userId", userId)
            if(userId){
              this.dataProvider.getCartDetails(userId).subscribe((data: any) => {
                this.order = data;
                // this.order.restaurantDetails = this.hotel;
                this.isLoaded = true;
                loading.dismiss();
              });
            }
            else{
              this.isLoaded = true;
              loading.dismiss();
            }
          });
        });

 
  });
  }

  checkOut(){
    console.log("this.LoggedInId", this.LoggedInId)
    if(this.LoggedInId){
      this.orderProvider.saveInstructionOrderHeader(this.deliverNote);
      this.orderProvider.saveMenuItemOrderDetails(this.order.CartItems)
      this.router.navigateByUrl('/app/tabs/restaurants/check-out');
    }
    else{
     this.presentAlert()
    }
    
  }

  async presentAlert() {
    const alert = await this.alertpCtrl.create({
      cssClass: 'my-custom-class',
    //  header: 'Invalid Details',
     // subHeader: 'Subtitle',
      message: 'Please Login First !',
      buttons: ['OK']
    });
    await alert.present();
  }
}
