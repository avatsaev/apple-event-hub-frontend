
import { NgModule } from "@angular/core";

import { homeRouting } from "./home.routing";
import { HomeComponent } from "./home.component";
import {CountdownComponent} from "../shared/countdown/countdown.component";
import {ChatComponent} from "../chat/chat.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    homeRouting,
    FormsModule,
    BrowserModule
  ],
  declarations: [
    HomeComponent,
    CountdownComponent,
    ChatComponent
  ]
})
export class HomeModule { }
