 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './_components/notes/notes.component';
import { LoginComponent } from './_components/login/login.component';
import { ShopsComponent } from './_components/shops/shops.component';
import {ScrapersComponent} from './_components/scrapers/scrapers.component';

import {AuthGuard} from './_helpers/auth.guard';


const routes: Routes = [
  {path: 'scrapers', component: ScrapersComponent, canActivate: [AuthGuard]},
  {path: 'shops', component: ShopsComponent, canActivate: [AuthGuard]},
  {path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},



  {path: 'login', component: LoginComponent},
  {path: '**', component: ScrapersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
