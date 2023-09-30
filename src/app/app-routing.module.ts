import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDataComponent } from './HR/Components/employee-data/employee-data.component';
import { EmployeeInputFormComponent } from './HR/Components/employee-input-form/employee-input-form.component';
import { DashboardComponent } from './HR/Components/dashboard/dashboard.component';
import { HomePageComponent } from './HR/Components/home-page/home-page.component';

const routes: Routes = [
  {path: 'EmployeeData', component:EmployeeDataComponent},
  {path: '', component:HomePageComponent},
  {path: 'newEmployeeForm',component:EmployeeInputFormComponent},
  {path: 'dashboard',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
