 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './_components/notes/notes.component';
import { LoginComponent } from './_components/login/login.component';
import { ShopsComponent } from './_components/shops/shops.component';
import {ScrapersComponent} from './_components/scrapers/scrapers.component';
import {AuthGuard} from './_helpers/auth.guard';
import { TodoScrapersComponent } from './_components/scrapers/my-scrapers/todo-scrapers/todo-scrapers.component';
import { WaitExecutionScrapersComponent } from './_components/scrapers/my-scrapers/wait-execution-scrapers/wait-execution-scrapers.component';
import { SuccessScrapersComponent } from './_components/scrapers/my-scrapers/success-scrapers/success-scrapers.component';
import { FailingsComponent } from './_components/scrapers/failings/failings.component';
import { NoofferComponent } from './_components/scrapers/nooffer/nooffer.component';
import { ScrapersAdminComponent } from './_components/scrapers/scrapers-admin/scrapers-admin.component';
import { MyScrapersComponent } from './_components/scrapers/my-scrapers/my-scrapers.component';


const routes: Routes = [
  {
    path: 'scrapers', 
    component: ScrapersComponent, 
    canActivate: [AuthGuard],
    children: [
    {path: 'failings', component: FailingsComponent},
    {path: 'nooffer', component: NoofferComponent},
    {path: 'admin', component: ScrapersAdminComponent},
    {path: 'myscrapers', component: MyScrapersComponent, children: [
      {path: 'todo', component: TodoScrapersComponent},
      {path: 'executed', component: WaitExecutionScrapersComponent},
      {path: 'success', component: SuccessScrapersComponent},
    ]}
  ]},
  
  {path: 'shops', 
  component: ShopsComponent, 
  canActivate: [AuthGuard]},

  {path: 'notes', 
  component: NotesComponent, 
  canActivate: [AuthGuard]},



  {path: 'login', component: LoginComponent},
  {path: '**', component: ScrapersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
