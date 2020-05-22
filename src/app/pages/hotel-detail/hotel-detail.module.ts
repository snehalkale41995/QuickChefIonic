import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";
import { HotelDetailPage } from "./hotel-detail";
import { HotelDetailPageRoutingModule } from "./hotel-detail-routing.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HotelDetailPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [HotelDetailPage],
})
export class HotelDetailModule {}
