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

  async ionViewWillEnter() {
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000,
    });
    await loading.present();
   // const hotelId = this.route.snapshot.paramMap.get("hotelId");

    this.storage.get("selectedRestaurantId").then((val) => {
      this.hotelId = val;

      this.dataProvider.getMenuListByRestaurant(this.hotelId).subscribe((data) => {
        this.menuList = data;
        this.dataProvider.getCartDetails().subscribe((data: any) => {
          this.menuList.forEach(menu => {
            data.CartItems.forEach(cart => {
                if(menu.Id == cart.MenuItemId){
                  menu.Count = cart.Count ;
                }
            });
          });
      });
        // this.order.restaurantDetails = this.hotel;
      //  loading.dismiss();
      });
      this.dataProvider.getRestaurantDetails(this.hotelId).subscribe((data: any) => {
        this.hotel = data;
        loading.dismiss();
      });
    });
  }
}
