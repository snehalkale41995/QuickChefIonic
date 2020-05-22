import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-food-category-card',
  templateUrl: './food-category-card.component.html',
  styleUrls: ['./food-category-card.component.scss'],
})
export class FoodCategoryCardComponent implements OnInit {

  @Input()  categoryData : {};
 
  constructor() {}

  ngOnInit() {}

}
