import { Component, OnInit } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import {  LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.page.html',
  styleUrls: ['./initial-page.page.scss'],
})
export class InitialPagePage implements OnInit {

  constructor(private router: Router,  public loadingCtrl: LoadingController,) { }

  ngOnInit() {
    this.naviagteLanding()
  }

  async naviagteLanding (){
    let  loading = await this.loadingCtrl.create({
      duration: 2000
    });
    await loading.present();
    this.router.navigate(['/app', 'tabs', 'landing'])
    loading.dismiss();
  }
}
