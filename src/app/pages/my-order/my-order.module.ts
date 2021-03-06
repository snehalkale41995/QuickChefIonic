import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyOrderPage } from './my-order.page';
import {ComponentsModule} from '../../components/components.module'

const routes: Routes = [
  {
    path: '',
    component: MyOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyOrderPage]
})
export class MyOrderPageModule {}
