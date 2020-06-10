import { Component, OnInit } from "@angular/core";
import { DeliveryData } from "../../providers/delivery-data";
import {Storage} from '@ionic/storage'
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.page.html",
  styleUrls: ["./user-profile.page.scss"],
})
export class UserProfilePage implements OnInit {
  itemList; userData = {name : "ss", email : ""};
  constructor(public deliveryData: DeliveryData, private storage : Storage) {}

  ngOnInit() {
    this.getList();
  }
  

  async getList() {

    this.storage.get('loggedInUserInfo').then((value) => {
      if(value){
        this.userData.name = value.name;
        this.userData.email = value.email;
      }
       
    })


    await this.deliveryData.getUserProfileList().subscribe((data: any) => {
      this.itemList = data;
    });
  }
}
