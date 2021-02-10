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
import { ShopNotesComponent } from './_components/shop-notes/shop-notes.component';
import { NotesComponent } from './_components/notes/notes.component'; 
import {ScrapersComponent} from './_components/scrapers/scrapers.component';
import { MyScrapersComponent } from './_components/scrapers/my-scrapers/my-scrapers.component'; 
import {FailingsComponent} from './_components/scrapers/failings/failings.component';
import {NoofferComponent} from './_components/scrapers/nooffer/nooffer.component';
import { ShopActionsComponent } from './_components/shop-actions/shop-actions.component';
import { TodoScrapersComponent } from './_components/scrapers/my-scrapers/todo-scrapers/todo-scrapers.component';
import { WaitExecutionScrapersComponent } from './_components/scrapers/my-scrapers/wait-execution-scrapers/wait-execution-scrapers.component';
import { SuccessScrapersComponent } from './_components/scrapers/my-scrapers/success-scrapers/success-scrapers.component';
import { ScrapersAdminComponent } from './_components/scrapers/scrapers-admin/scrapers-admin.component'; 
import { HardCasesComponent } from './_components/scrapers/hard-cases/hard-cases.component'; 


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
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatIconModule} from '@angular/material/icon'; 
import { MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    LoginBoxComponent,
    LoginComponent,
    HomeComponent,
    ShopsComponent,
    ShopNotesComponent,
    NotesComponent,
    ScrapersComponent,
    MyScrapersComponent,
    FailingsComponent,
    NoofferComponent,
    TodoScrapersComponent,
    WaitExecutionScrapersComponent,
    SuccessScrapersComponent,
    ShopActionsComponent,
    ScrapersAdminComponent,
    HardCasesComponent
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
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [authInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
