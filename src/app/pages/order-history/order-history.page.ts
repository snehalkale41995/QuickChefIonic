import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeliveryData } from "../../providers/delivery-data";
import { OrderData } from '../../providers/order-data'
import { LoadingController , AlertController} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage {
  hotel: any;
  LoggedInId ;
  order: any;
  hotelId;
  deliverNote : "";
  isLoaded = false;
//  defaultHrefLink = `/app/tabs/restaurants/hotel-details`;
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
    this.getOrderList();
    this.storage.get("loggedInUserId").then((userId)=>{
      this.LoggedInId = userId;
    })
  }

  doRefresh(event) {
    let compRef = this;
    setTimeout(() => {
      event.target.complete();
      compRef.getOrderList()
    }, 2000);
  }

  async getOrderList() {
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
            if(userId){
              this.dataProvider.getMyorders(userId, this.hotel).subscribe((data: any) => {
                this.order = data;
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
}
