import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDataComponent } from './HR/Components/employee-data/employee-data.component';
import { EmployeeInputFormComponent } from './HR/Components/employee-input-form/employee-input-form.component';
import { DashboardComponent } from './HR/Components/dashboard/dashboard.component';
import { HomePageComponent } from './HR/Components/home-page/home-page.component';
import { AddNewComponent } from './Opreation/Components/add-new/add-new.component';
import { UnitDataComponent } from './Opreation/Components/unit-data/unit-data.component';

const routes: Routes = [
  {path: 'EmployeeData', component:EmployeeDataComponent},
  {path: '', component:HomePageComponent},
  {path: 'newEmployeeForm',component:EmployeeInputFormComponent},
  {path: 'opreationForm',component:AddNewComponent},
  {path: 'opreationData',component:UnitDataComponent},
  {path: 'dashboard',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
