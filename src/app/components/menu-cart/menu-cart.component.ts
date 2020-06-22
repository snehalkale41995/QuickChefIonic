import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DeliveryData } from '../../providers/delivery-data';
import { ToastController, LoadingController } from '@ionic/angular';
import { CanLoad, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss'],
})
export class MenuCartComponent implements OnInit {
 
  @Input() menuList : [];
  @Input() restaurantDetails : {};
  LoggedInId ;
  countBtnActn = 'add' ;
  isCount = false;
  loggedInUserId ;
  constructor(public storage: Storage, public alertController: AlertController,  public deliveryData: DeliveryData,
    public toastController: ToastController, private router: Router, public loadingCntrl : LoadingController) {
      this.storage.get("loggedInUserId").then((userId)=>{
        if(userId){
          this.loggedInUserId = userId
        }
      })
    }

  ngOnInit() {
    this.storage.get("loggedInUserId").then((userId)=>{
      this.LoggedInId = userId;
    })
  }


   async countAction(action, Id){
    
     await this.storage.get("loggedInUserId").then((userId)=>{
      if(userId){
      this.menuList.forEach((menu:any)=>{
        if(menu && parseInt(menu.Id) === parseInt(Id)){
          if(action==='add')
           menu.Count = menu.Count + 1;
           else
           menu.Count = menu.Count - 1;
        }
        })
    }
    else{
      this.presentUserAlert()
    }
  })
  }

 async saveCart(){
  //  routerLink="/app/tabs/restaurants/order-details"
 let menuItems = [];
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
        duration: 3000,
      });
     await this.storage.get("loggedInUserId").then((userId)=>{
       if(userId){
       
         loading.present();
        this.menuList.forEach((element : any) => {
          menuItems.push({
            ApplicationUserId: userId,
            MenuItemId: element.Id,
            Count: element.Count,
          });
        });

        this.deliveryData.addToCart(menuItems).subscribe((data: any) => {
          // this.categoryInfo = data;
          this.router.navigate(["/app", "tabs", "restaurants", "order-details"]);
          loading.dismiss();
          this.presentToast();
         });
        }
       else{
         this.presentUserAlert();
       }
 
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

  async presentUserAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
    //  header: 'Empty Cart',
     // subHeader: 'Subtitle',
      message: 'Please Login First.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('/login/1');
          }
        }
      ]
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
