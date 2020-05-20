import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import {OffersPageModule} from './pages/offers/offers.module'
import {LandingModule} from './pages/landing/landing.module'
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    OffersPageModule,
    LandingModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [InAppBrowser, SplashScreen, StatusBar, Geolocation],
  bootstrap: [AppComponent]
})
export class AppModule {}
