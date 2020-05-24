import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { LandingPage } from '../landing/landing';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'landing',
        children: [
          {
            path: '',
            component: LandingPage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)
          }
        ]
      },
      {
        path: 'restaurants',
        children: [
          {
            path: 'restaurant-list/:categoryId',
            loadChildren: () => import('../restaurant-list/restaurant-list.module').then(m => m.RestaurantListModule)
          },
          {
            path: 'hotel-details/:hotelId',
            loadChildren: () => import('../hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)
          },
          {
            path: 'order-details/:hotelId',
            loadChildren: () => import('../my-order/my-order.module').then(m => m.MyOrderPageModule)
          },
          {
            path: 'check-out',
            loadChildren: () => import('../check-out/check-out.module').then(m => m.CheckOutPageModule)
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../about/about.module').then(m => m.AboutModule)
          }
        ]
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () => import('../offers/offers.module').then(m => m.OffersPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/landing',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

