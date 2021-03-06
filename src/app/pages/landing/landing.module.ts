import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LandingPage } from './landing';
import { LandingPageRoutingModule } from './landing-routing.module';
import {ComponentsModule} from '../../components/components.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    LandingPage
  ],
  entryComponents: [
    
  ]
})
export class LandingModule { }
