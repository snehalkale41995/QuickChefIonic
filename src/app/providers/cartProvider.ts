import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class CartProvider {
  Cart: any[] = [];
  itemCart: any = {};
  itemInCart = [];

  constructor(public storage : Storage) {
     this.storage.get("Cart").then((value)=>{
        this.Cart = value;
    })
  }

  OnsaveLS(item: any) {
    this.storage.get("Cart").then((value)=>{
        this.Cart = value;
    })
    let totalPrice: number = 0;
    this.itemInCart = [];
    if (this.Cart == null) {
      this.itemCart.itemTotalPrice = totalPrice * item.itemQunatity;
      this.itemCart.item = item;
      this.itemInCart.push(this.itemCart);
      this.storage.set("Cart", this.itemInCart);
    } else {
      for (let i = 0; i <= this.Cart.length - 1; i++) {
        if (
          this.Cart[i].item.itemId == item.itemId &&
          this.Cart[i].item.price.pname == item.price.pname
        ) {
          this.Cart.splice(i, 1);
        }
      }
      this.itemCart.itemTotalPrice = totalPrice * item.itemQunatity;
      this.itemCart.item = item;
      this.Cart.push(this.itemCart);
      this.storage.set("Cart", this.Cart);
    }
  }
}
