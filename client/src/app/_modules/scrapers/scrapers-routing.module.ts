import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailingsComponent } from 'src/app/_components/scrapers/failings/failings.component';
import { HardCasesComponent } from 'src/app/_components/scrapers/hard-cases/hard-cases.component';
import { MyScrapersComponent } from 'src/app/_components/scrapers/my-scrapers/my-scrapers.component';
import { SuccessScrapersComponent } from 'src/app/_components/scrapers/my-scrapers/success-scrapers/success-scrapers.component';
import { TodoScrapersComponent } from 'src/app/_components/scrapers/my-scrapers/todo-scrapers/todo-scrapers.component';
import { WaitExecutionScrapersComponent } from 'src/app/_components/scrapers/my-scrapers/wait-execution-scrapers/wait-execution-scrapers.component';
import { NoofferComponent } from 'src/app/_components/scrapers/nooffer/nooffer.component';
import { ScrapersAdminComponent } from 'src/app/_components/scrapers/scrapers-admin/scrapers-admin.component';
import { AuthGuard } from 'src/app/_helpers/auth.guard';
import { ScrapersComponent } from 'src/app/_components/scrapers/scrapers.component';


const routes: Routes = [
  {
    path: '', 
    component: ScrapersComponent, 
    canActivate: [AuthGuard],
    children: [
    {path: 'failings', component: FailingsComponent},
    {path: 'nooffer', component: NoofferComponent},
    {path: 'hard', component: HardCasesComponent},
    {path: 'admin', component: ScrapersAdminComponent},
    {path: 'myscrapers', component: MyScrapersComponent, children: [
      {path: 'todo', component: MyScrapersComponent},
      {path: 'executed', component: WaitExecutionScrapersComponent},
      {path: 'success', component: SuccessScrapersComponent},
      {path: '', component: TodoScrapersComponent}
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrapersRoutingModule { }
