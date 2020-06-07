import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DeliveryData } from '../../providers/delivery-data';
import { ToastController, LoadingController } from '@ionic/angular';
import { CanLoad, Router } from "@angular/router";

@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss'],
})
export class MenuCartComponent implements OnInit {
 
  @Input() menuList : [];
  @Input() restaurantDetails : {};

  countBtnActn = 'add' ;
  isCount = false;
  constructor(public alertController: AlertController,  public deliveryData: DeliveryData,
    public toastController: ToastController, private router: Router, public loadingCntrl : LoadingController) {}

  ngOnInit() {}


   countAction(action, Id){
  
    this.menuList.forEach((menu:any)=>{
    
      if(menu && parseInt(menu.Id) === parseInt(Id)){
        if(action==='add')
         menu.Count = menu.Count + 1;
         else
         menu.Count = menu.Count - 1;
      }
      })
  }

 async saveCart(){
  //  routerLink="/app/tabs/restaurants/order-details"

    let menuCount = this.menuList.filter(function (e:any) {
      return e.Count > 0;
    });
     if(!menuCount.length){
     this.presentAlert()
     }
     
    // this.menuList.fill()

    if(menuCount.length){
      let loading = await this.loadingCntrl.create({
        message: "Please wait...",
        duration: 2000,
      });
      await loading.present();
      this.deliveryData.addToCart(this.menuList).subscribe((data: any) => {
        // this.categoryInfo = data;
        loading.dismiss();
        this.presentToast();
        this.router.navigate(["/app", "tabs", "restaurants", "order-details"]);
       });
    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Empty Cart',
     // subHeader: 'Subtitle',
      message: 'Please add Items.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Added to cart successfully',
      duration: 1000
    });
    toast.present();

  }

}
