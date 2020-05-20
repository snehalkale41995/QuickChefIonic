import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  IonList,
  IonRouterOutlet,
  LoadingController,
  ModalController,
  ToastController,
  Config,
} from "@ionic/angular";

import { DeliveryData } from "../../providers/delivery-data";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "page-landing",
  templateUrl: "landing.html",
  styleUrls: ["./landing.scss"],
})
export class LandingPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild("landingList", { static: true }) landingList: IonList;
  latitude: any = 1; //latitude
  longitude: any = 1; //longitude
  ios: boolean;
  isOffer = false;
  dayIndex = 0;
  cityName = "mumbai";
  deviceLocation = "aundh";
  segment = "all";
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  imageUrl: any = "../../../assets/icon/favicon.png";
  restaurantList: any = [];
  foodTypeList: any = [];

  constructor(
    public alertCtrl: AlertController,
    public deliveryData: DeliveryData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.updateLanding();
    this.getCurrentCoordinates();
    this.ios = this.config.get("mode") === "ios";
  }

  async updateLanding() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 1000,
    });
    await loading.present();
    //   await this.deliveryData.getRestaurantList(this.segment).subscribe((data: any) => {
    //      this.restaurantList = data;
    //    //  console.log("this.restaurantList", this.restaurantList)
    // });

    await this.deliveryData.getFoodSegments().subscribe((data: any) => {
      this.foodTypeList = data;
    });

    await this.deliveryData
      .getRestaurants(this.segment, this.cityName)
      .subscribe((data: any) => {
        this.restaurantList = data;
        loading.dismiss();
      });
    }

  async getCurrentCoordinates() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.deliveryData
          .getDeviceLocation(this.latitude, this.longitude)
          .subscribe((data: any) => {
            this.cityName = data.cityName;
            this.deviceLocation = data.title;
            console.log("data", data);
          });
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }
}
