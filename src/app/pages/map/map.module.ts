import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from '../../components/components.module'
import { MapPage } from './map';
import { MapPageRoutingModule } from './map-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    MapPage,
  ]
})
export class MapModule { }
