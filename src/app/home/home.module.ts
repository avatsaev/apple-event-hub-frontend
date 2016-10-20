
import { NgModule } from "@angular/core";

import { homeRouting } from "./home.routing";
import { HomeComponent } from "./home.component";
import {CountdownComponent} from "../shared/countdown/countdown.component";

@NgModule({
  imports: [
    homeRouting
  ],
  declarations: [
    HomeComponent,
    CountdownComponent
  ]
})
export class HomeModule { }
