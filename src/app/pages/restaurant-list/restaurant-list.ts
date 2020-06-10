import { Component } from "@angular/core";
import { DeliveryData } from "../../providers/delivery-data";
import { LoadingController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "page-restaurant-list",
  templateUrl: "restaurant-list.html",
  styleUrls: ["./restaurant-list.scss"],
})
export class RestaurantListPage {
  meals: any[] = [];
  cafeList;
  restaurant;
  categoryInfo;

  constructor(
    public deliveryData: DeliveryData,
    private route: ActivatedRoute,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getMealList();
  }

  async getMealList() {
    const categoryId = this.route.snapshot.paramMap.get("categoryId");

    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 3000,
    });
    await loading.present();

    this.deliveryData.getFoodSegments().subscribe((data: any) => {
     // this.categoryInfo = data;
     let categoryDetails = data.filter(function (e) {
      return e.id === parseInt(categoryId);
    });
    this.categoryInfo = categoryDetails? categoryDetails[0] : {};
    });

    this.deliveryData
      .getRestaurants("", "", categoryId)
      .subscribe((data: any) => {
        this.cafeList = [data[0]];
        loading.dismiss();
      });
  }
}
