 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './_components/notes/notes.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { ShopsComponent } from './_components/shops/shops.component';

import {AuthGuard} from './_helpers/auth.guard';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'shops', component: ShopsComponent, canActivate: [AuthGuard]},
  {path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},



  {path: 'login', component: LoginComponent},
  {path: '**', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
