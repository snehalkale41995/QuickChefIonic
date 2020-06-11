import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import {
  AlertController,
  ToastController,
  LoadingController
} from "@ionic/angular";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { phonenumber : '', username: '', password: '', name : '', email : '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) { }

 async onLogin(form: NgForm) {
    this.submitted = true;
    let loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 2000,
    });
    await loading.present();

    if (form.valid) {
     // this.userData.login(this.login.username);
       this.userData.login(this.login.username, this.login.password).subscribe((data: any) => {
        loading.dismiss();
        if(data==undefined){
          this.presentToast()
          this.router.navigateByUrl('/');
        }
       else if(!data.length){
        this.presentAlert();
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Login successful',
      duration: 1000
    });
    toast.present();

  }

}
