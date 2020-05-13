import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { DeliveryData } from '../../providers/delivery-data';
import { UserData } from '../../providers/user-data';

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
  excludeTracks: any = [];
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
    public user: UserData,
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
      duration: 3000
    });
    await loading.present();
    await this.deliveryData.getRestaurantList().subscribe((data: any) => {
     console.log("restaurants", data)
       this.restaurantList = data;
     //  console.log("this.restaurantList", this.restaurantList)
  });

      loading.dismiss(); 
    if (this.landingList) {

      this.landingList.closeSlidingItems();
    }

    this.deliveryData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  } 
}
