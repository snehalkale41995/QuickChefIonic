import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {

  constructor( public modalCtrl : ModalController,) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
