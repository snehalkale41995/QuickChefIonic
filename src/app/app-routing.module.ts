import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialPagePage } from './pages/initial-page/initial-page.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/initial-page',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
  },
  { path: 'initial-page',
   loadChildren: () => import('./pages/initial-page/initial-page.module').then(m => m.InitialPagePageModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
