import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss'],
})
export class MenuCartComponent implements OnInit {
 
  @Input() menuList : [];
  @Input() restaurantDetails : {};

  countBtnActn = 'add' ;
  constructor() {}

  ngOnInit() {}


   countAction(action, Id){
    console.log("id", Id)
    this.menuList.forEach((menu:any)=>{
      console.log("menu", menu)
      if(menu && parseInt(menu.Id) === parseInt(Id)){
        if(action==='add')
         menu.Count = menu.Count + 1;
         else
         menu.Count = menu.Count - 1;
      }
      })
  }

  saveCart(){
    console.log("this.restaurantDetails", this.restaurantDetails)
    console.log("this.menuList", this.menuList)

    // this.menuList.fill()

  }

}
