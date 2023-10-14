import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeInputFormComponent } from './HR/Components/employee-input-form/employee-input-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { EmployeeDataComponent } from './HR/Components/employee-data/employee-data.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { EmployeeDashboardComponent } from './HR/Components/employee-dashboard/employee-dashboard.component';
import { DashboardComponent } from './HR/Components/dashboard/dashboard.component'; 
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './HR/Components/home-page/home-page.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LandingComponent } from './HR/Components/landing/landing.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { AddNewComponent } from './Opreation/Components/add-new/add-new.component';
import { UnitDataComponent } from './Opreation/Components/unit-data/unit-data.component';
import { TypesDialogComponent } from './Opreation/Components/types-dialog/types-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TypesComponentsComponent } from './Opreation/Components/types-components/types-components.component';
import { AddTypeDialogComponent } from './Opreation/Components/add-type-dialog/add-type-dialog.component';
import { ProjectsComponent } from './Opreation/Components/projects/projects.component';
import { ProjectDialogComponent } from './Opreation/Components/project-dialog/project-dialog.component';
import { AddProjectComponent } from './Opreation/Components/add-project/add-project.component';
import { RegstrationComponent } from './Global/Login/Components/regstration/regstration.component';
import {MatDividerModule} from '@angular/material/divider';
import { LoginComponent } from './Global/Login/Components/login/login.component';
import { VerfictionDialogComponent } from './Global/Login/Components/verfiction-dialog/verfiction-dialog.component';
import { MainNavbarComponent } from './Global/masterPage/Components/main-navbar/main-navbar.component';
import { MasterPageContainerComponent } from './Global/masterPage/Components/master-page-container/master-page-container.component';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeInputFormComponent,
    EmployeeDataComponent,
    EmployeeDashboardComponent,
    DashboardComponent,
    HomePageComponent,
    LandingComponent,
    AddNewComponent,
    UnitDataComponent,
    TypesDialogComponent,
    TypesComponentsComponent,
    AddTypeDialogComponent,
    ProjectsComponent,
    ProjectDialogComponent,
    AddProjectComponent,
    RegstrationComponent,
    LoginComponent,
    VerfictionDialogComponent,
    MainNavbarComponent,
    MasterPageContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatTabsModule,
    MatStepperModule,
    MatSidenavModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
