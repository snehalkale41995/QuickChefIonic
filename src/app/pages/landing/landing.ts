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
import { Storage } from "@ionic/storage";

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
  cityName = "pune";
  deviceLocation = "aundh";
  restaurantName = "";
  segment = "all";
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
    private geolocation: Geolocation,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.updateLanding();
    this.getCurrentCoordinates();
    this.ios = this.config.get("mode") === "ios";
  }

  async updateLanding() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 2000,
    });
    await loading.present();

    await this.deliveryData.getFoodSegments().subscribe((data: any) => {
      this.foodTypeList = data;
    });

    await this.deliveryData
      .getRestaurants(this.restaurantName, this.cityName, "")
      .subscribe((data: any) => {
        console.log("data", data)
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
            let currentLocation = {
              cityName : this.cityName,
              deviceLocation : this.deviceLocation
            }
            this.storage.set("cityName", this.cityName);
            this.storage.set("currentLocation", currentLocation)
          });
      })
      .catch((error) => {
        let currentLocation = {
          cityName : this.cityName,
          deviceLocation : this.deviceLocation
        }
        this.storage.set("cityName", this.cityName);
        this.storage.set("currentLocation", currentLocation)
        console.log("Error getting location", error);
      });
  }


  hotelDetailsNav(restaurantId){
    this.router.navigate(["/app", "tabs", "restaurants", "hotel-details"]);
    this.storage.set("selectedRestaurantId", restaurantId);
  }
}
