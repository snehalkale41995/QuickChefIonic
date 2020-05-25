import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckOutPage } from './check-out.page';
import {ConfirmOrderComponent}  from '../../components/confirm-order/confirm-order.component'

const routes: Routes = [
  {
    path: '',
    component: CheckOutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CheckOutPage, ConfirmOrderComponent],
  entryComponents : [ConfirmOrderComponent]
})
export class CheckOutPageModule {}
