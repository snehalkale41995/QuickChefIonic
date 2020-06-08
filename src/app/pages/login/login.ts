import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import {
  AlertController,
  ToastController
} from "@ionic/angular";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '', name : '', email : '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
     // this.userData.login(this.login.username);
       this.userData.login(this.login.username, this.login.password).subscribe((data: any) => {
      
        if(data==undefined){
          this.router.navigateByUrl('/app/tabs/landing');
        }
       else if(!data.length){
        this.presentAlert()
       }
      });
    }
    else{
      this.presentAlert()
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Invalid Details',
     // subHeader: 'Subtitle',
      message: 'Please Enter Valid Username or Password',
      buttons: ['OK']
    });
    await alert.present();
  }

}
