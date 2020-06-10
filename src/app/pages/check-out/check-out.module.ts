import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckOutPage } from './check-out.page';
import {ConfirmOrderComponent}  from '../../components/confirm-order/confirm-order.component';
import { StripePayComponent } from "../../components/stripe-pay/stripe-pay.component";

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
  declarations: [CheckOutPage, ConfirmOrderComponent, StripePayComponent],
  entryComponents : [ConfirmOrderComponent, StripePayComponent]
})
export class CheckOutPageModule {}
