import { Component, OnInit } from '@angular/core';
import { DeliveryData } from '../../providers/delivery-data';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  itemList ;
  constructor(public deliveryData: DeliveryData) { }
  
  ngOnInit() {
    this.getList()
  }

    async getList(){
      await this.deliveryData.getUserProfileList().subscribe((data: any) => {
        this.itemList = data ;
    });
    }
  
}
