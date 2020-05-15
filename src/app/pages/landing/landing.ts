import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { DeliveryData } from '../../providers/delivery-data';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
  styleUrls: ['./landing.scss'],
})
export class LandingPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('landingList', { static: true }) landingList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  imageUrl: any = "../../../assets/icon/favicon.png";
  restaurantList : any = [];

  constructor(
    public alertCtrl: AlertController,
    public deliveryData: DeliveryData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config
  ) { }

  ngOnInit() {
    this.updateLanding();
    this.ios = this.config.get('mode') === 'ios';
  }

 async updateLanding() {
    // Close any open sliding items when the landing updates
    let  loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();
    await this.deliveryData.getRestaurantList(this.segment).subscribe((data: any) => {
       this.restaurantList = data;
     //  console.log("this.restaurantList", this.restaurantList)
  });

  await this.deliveryData.getFoodSegments().subscribe((data: any) => {
     console.log("dataaaa",data);
  //  console.log("this.restaurantList", this.restaurantList)
});

      loading.dismiss(); 
    if (this.landingList) {

      this.landingList.closeSlidingItems();
    }
  } 
}
