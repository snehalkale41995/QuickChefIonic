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
            path: '',
            loadChildren: () => import('../restaurant-list/restaurant-list.module').then(m => m.RestaurantListModule)
          },
          {
            path: 'hotel-details/:hotelId',
            loadChildren: () => import('../hotel-detail/hotel-detail.module').then(m => m.HotelDetailModule)
          },
          {
            path: 'restaurant-details/:restaurantId',
            loadChildren: () => import('../restaurant-detail/restaurant-detail.module').then(m => m.RestaurantDetailModule)
          },
          {
            path: 'meal-details/:restaurantId/:mealId',
            loadChildren: () => import('../meal-detail/meal-detail.module').then(m => m.MealDetailPageModule)
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

