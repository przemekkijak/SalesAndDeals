import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrapersComponent } from './scrapers/scrapers.component';
import { FormsModule } from '@angular/forms';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { LoginBoxComponent } from './login-box/login-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrapersComponent,
    LeftMenuComponent,
    LoginBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
