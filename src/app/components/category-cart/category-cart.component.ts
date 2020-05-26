import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-category-cart',
  templateUrl: './category-cart.component.html',
  styleUrls: ['./category-cart.component.scss'],
})
export class CategoryCartComponent implements OnInit {

  @Input()  restaurantDetails : {};
  @Input()  showRider : any;
  
  constructor() {
   
   }

  ngOnInit() {
    
  }

}
