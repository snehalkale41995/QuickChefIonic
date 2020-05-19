import { Component, OnInit } from '@angular/core';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  queryText = 'pune';
  segment = 'all';
  restaurantList ;

  constructor(public deliveryData: DeliveryData) { }

  ngOnInit() {
    this.getRestaurants()
  }
  
 async getRestaurants(){
    await this.deliveryData.getRestaurants(this.segment, this.queryText).subscribe((data: any) => {
      this.restaurantList = data
      console.log("dataaaa",data);
    });
  }
}
