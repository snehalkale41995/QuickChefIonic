import { Component } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { DeliveryData } from "../../providers/delivery-data";
import { ActionSheetController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-hotel-detail",
  templateUrl: "hotel-detail.html",
  styleUrls: ["./hotel-detail.scss"],
})
export class HotelDetailPage {
  hotel: any;
  menuList: any;
  isData = false;
  defaultHref = "app/tabs/landing";
  ratings: any;
  hotelId : any;
  slideOpts = {
    slidesPerView: 3,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  constructor(
    private dataProvider: DeliveryData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public storage : Storage 
  ) {}

  doRefresh(event) {
   
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async ionViewWillEnter() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
     // duration: 3000,
    });
    await loading.present();
   // const hotelId = this.route.snapshot.paramMap.get("hotelId");

    this.storage.get("selectedRestaurantId").then((val) => {
      this.hotelId = val;
      this.dataProvider.getRestaurantDetails(this.hotelId).subscribe((data: any) => {
        this.hotel = data;
        this.dataProvider.getMenuListByRestaurant(this.hotelId).subscribe((data) => {
          this.menuList = data;
          if(data && data.length){
            this.isData = true;
          }
          else
          this.isData = false;
          this.storage.get("loggedInUserId").then((userId)=>{
          if(userId){
            this.dataProvider.getCartDetails(userId).subscribe((data: any) => {
              if(data){
                this.menuList.forEach(menu => {
                  data.CartItems.forEach(cart => {
                      if(menu.Id == cart.MenuItemId){
                        menu.Count = cart.Count ;
                      }
                  });
                });
              }
            });
          }
          loading.dismiss();
        });
        });
      });
    });
  }
}
