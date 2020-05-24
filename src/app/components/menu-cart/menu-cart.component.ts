import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss'],
})
export class MenuCartComponent implements OnInit {
 
  @Input() menuList : []

  countBtnActn = 'add' ;
  constructor() {}

  ngOnInit() {}


   countAction(action, id){
    console.log("id", id)
    this.menuList.forEach((menu:any)=>{
    //  console.log("menu", menu.id)
      if(menu && menu.id == id){
        if(action==='add')
         menu.count = menu.count + 1;
         else
         menu.count = menu.count - 1;
      }
      })
  }

}
