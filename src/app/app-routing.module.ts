import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InitialPagePage } from "./pages/initial-page/initial-page.page";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app",
    pathMatch: "full",
  },
  {
    path: "app",
    loadChildren: () =>
      import("./pages/tabs-page/tabs-page.module").then((m) => m.TabsModule),
  },
  {
    path: "landing",
    loadChildren: () =>
      import("./pages/landing/landing.module").then((m) => m.LandingModule),
  },
  {
    path: "initial-page",
    loadChildren: () =>
      import("./pages/initial-page/initial-page.module").then(
        (m) => m.InitialPagePageModule
      ),
  },
  {
    path: "user-profile",
    loadChildren:
      "./pages/user-profile/user-profile.module#UserProfilePageModule",
  },
  {
    path: "map",
    loadChildren: () =>
      import("./pages/map/map.module").then((m) => m.MapModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then((m) => m.SignUpModule),
  },
  { path: 'order-history', loadChildren: './pages/order-history/order-history.module#OrderHistoryPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
