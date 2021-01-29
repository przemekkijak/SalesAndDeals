import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


import { AppComponent } from './app.component';

// components
import { LeftMenuComponent } from './_components/left-menu/left-menu.component';
import { LoginBoxComponent } from './_components/login-box/login-box.component';
import {LoginComponent} from './_components/login/login.component';
import { ShopsComponent } from './_components/shops/shops.component';
import { HomeComponent } from './_components/home/home.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';

// helpers
import {AuthGuard} from './_helpers/auth.guard';
import {authInterceptorsProviders} from './_helpers/auth.interceptor';

// modules
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'; 


@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    LoginBoxComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ShopsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatTableModule,
    MatRippleModule,
    MatSelectModule,
    ReactiveFormsModule

  ],
  providers: [authInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
