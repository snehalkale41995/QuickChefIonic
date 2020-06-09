import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserData } from "../../providers/user-data";
import { UserOptions } from "../../interfaces/user-options";
import { AlertController, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  styleUrls: ["./signup.scss"],
})
export class SignupPage {
  signup: UserOptions = {
    phonenumber: "",
    password: "",
    name: "",
    email: "",
    username: "",
  };
  submitted = false;
  currentLocation;

  constructor(
    public router: Router,
    public userData: UserData,
    public storage: Storage,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.storage.get("currentLocation").then((location) => {
      this.currentLocation = location;
    });
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.signup.email)){
        this.userData
        .signup(this.currentLocation, this.signup)
        .subscribe((data: any) => {
          if (data && data.length) {
            this.presentAlert(data[0].description);
          } else {
            this.presentToast();
            this.router.navigateByUrl("/login");
          }
        });
      }
     else{
       let description = "Please enter valid email"
      this.presentAlert(description);
     }
    
    }
  }

  async presentAlert(description) {
    const alert = await this.alertCtrl.create({
      cssClass: "my-custom-class",
      header: "Invalid Details",
      // subHeader: 'Subtitle',
      message: description,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      header: "Registration successful",
      message: "Please Login",
      duration: 2000,
    });
    toast.present();
  }
}
