import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class OrderData {

  constructor(
    public storage: Storage
  ) { }


  saveInstructionOrderHeader(Instruction) {
    
    this.storage.get("loggedInUserId").then((userId)=>{
    let orderHeader = {
      UserId: userId,
      OrderDate: "",
      OrderTotalOriginal: 0,
      OrderTotal: 0,
      PickUpTime: "",
      CouponCode: "",
      CouponCodeDiscount: 0,
      Status: "Pending",
      PaymentStatus: "Pending",
      Comments: "",
      PickUpName: "Ramesh",
      PhoneNumber: 2147483646,
      TransactionId: "",
    };
   
    orderHeader.Comments = Instruction;

    this.storage.set("orderHeader", orderHeader);
  })
  }

  saveMenuItemOrderDetails(cartItems) {
    let orderDetails = [];
    cartItems.forEach((element) => {
      orderDetails.push({
        OrderId: 0,
        MenuItemId: element.MenuItemId,
        Count: element.Count,
        Name: element.Name,
        Description: "",
        Price: element.Price,
      });
    });
    this.storage.set("orderDetails", orderDetails)
  }

 async saveTotalOrderHeader(orderInfo){
    let orderHeader, orderDetails ;
   await this.storage.get("orderHeader").then((val) => {
      orderHeader = val;
  })



   orderHeader.CouponCode = orderInfo.CouponCode;
   orderHeader.CouponCodeDiscount = orderInfo.CouponCodeDiscount;
   orderHeader.OrderTotal = orderInfo.OrderTotal;
   orderHeader.OrderTotalOriginal = orderInfo.OrderTotalOriginal;
   orderHeader.OrderDate = new Date;
   orderHeader.PickUpTime = new Date;

   this.storage.set("orderHeader", orderHeader);

}

}
