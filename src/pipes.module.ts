import { NgModule } from "@angular/core";
import { LimitPipe } from "../src/app/providers/limitPipe";

@NgModule({
  declarations: [LimitPipe],
  exports: [LimitPipe]
})
export class PipesModule {}
