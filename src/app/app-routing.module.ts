import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDataComponent } from './HR/Components/employee-data/employee-data.component';
import { EmployeeInputFormComponent } from './HR/Components/employee-input-form/employee-input-form.component';
import { DashboardComponent } from './HR/Components/dashboard/dashboard.component';
import { HomePageComponent } from './HR/Components/home-page/home-page.component';
import { AddNewComponent } from './Opreation/Components/add-new/add-new.component';
import { UnitDataComponent } from './Opreation/Components/unit-data/unit-data.component';
import { RegstrationComponent } from './Global/Login/Components/regstration/regstration.component';
import { LoginComponent } from './Global/Login/Components/login/login.component';
import { MainNavbarComponent } from './Global/masterPage/Components/main-navbar/main-navbar.component';
import { MasterPageContainerComponent } from './Global/masterPage/Components/master-page-container/master-page-container.component';

const routes: Routes = [
  {path: 'EmployeeData', component:EmployeeDataComponent},
  {path: '', component:MasterPageContainerComponent},
  {path: 'newEmployeeForm',component:EmployeeInputFormComponent},
  {path: 'opreationForm',component:AddNewComponent},
  {path: 'opreationData',component:UnitDataComponent},
  {path: 'regstir',component:RegstrationComponent},
  {path: 'login',component:LoginComponent},
  {path: 'dashboard',component:DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
