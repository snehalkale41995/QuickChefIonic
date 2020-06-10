import { Component, OnInit } from '@angular/core';
import {
  AlertController
} from "@ionic/angular";
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stripe-pay',
  templateUrl: './stripe-pay.component.html',
  styleUrls: ['./stripe-pay.component.scss'],
})

export class StripePayComponent implements OnInit {

  stripe = { cardNumber : '4242424242424242', cvv: '220', date: '2020-05-20T00:00:00+05:30'};
  myDate  ;
  constructor( public alertCtrl: AlertController, public modalCtrl : ModalController) { }

  ngOnInit() {}

  onStripe(form: NgForm){
    if (form.valid) {
    console.log("this.stripe", this.stripe)
    this.modalCtrl.dismiss(this.stripe);
    }
    else{
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'All the fields are required.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
