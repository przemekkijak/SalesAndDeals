 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './_components/notes/notes.component';
import { LoginComponent } from './_components/login/login.component';
import { ShopsComponent } from './_components/shops/shops.component';
import {AuthGuard} from './_helpers/auth.guard';
import { MyScrapersComponent } from './_components/scrapers/my-scrapers/my-scrapers.component';


const routes: Routes = [

  { path: 'scrapers', loadChildren: () => import('./_modules/scrapers/scrapers.module').then(m => m.ScrapersModule) },

  {path: 'shops', 
  component: ShopsComponent, 
  canActivate: [AuthGuard]},

  {path: 'notes', 
  component: NotesComponent, 
  canActivate: [AuthGuard]},



  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
