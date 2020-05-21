import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-special-menu-cart',
  templateUrl: './special-menu-cart.component.html',
  styleUrls: ['./special-menu-cart.component.scss'],
})
export class SpecialMenuCartComponent implements OnInit {

  @Input() menuList : any;
  @Input() slideOptions : any;
  constructor() { }

  ngOnInit() {}

}
