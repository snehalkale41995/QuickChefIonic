import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DeliveryData } from "../../providers/delivery-data";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
@Component({
  selector: "app-my-order",
  templateUrl: "./my-order.page.html",
  styleUrls: ["./my-order.page.scss"],
})
export class MyOrderPage implements OnInit {
  hotel: any;
  order: any;
  hotelId;
  defaultHrefLink = `/app/tabs/restaurants/hotel-details`;
  constructor(
    private dataProvider: DeliveryData,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public storage: Storage
  ) {}

  ngOnInit() {
    this.getOrderDetails();
  }

  async getOrderDetails() {
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
        });

      this.dataProvider.getOrderDetails().subscribe((data: any) => {
        console.log("this.order", data);
        this.order = data;
        // this.order.restaurantDetails = this.hotel;
        loading.dismiss();
      });
    });
  }
}
