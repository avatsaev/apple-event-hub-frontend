import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

import {AppRoutes} from './app.routing'
import { MaterializeModule } from "angular2-materialize";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
