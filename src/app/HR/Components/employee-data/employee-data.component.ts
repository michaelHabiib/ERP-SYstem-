import { Component, OnInit } from '@angular/core';
import { EmployeeActionService } from '../../Services/employee-action.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeResourceServiceService } from '../../Services/employee-resource-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


export interface Employee {
  id : string
  firstname: string,
  midname: string,
  lastname: string,
  email: string,
  hireType: string,
  phonenumber: string,
  hiredate: Date,
  jobid: Number,
  managerid : Number,
  departmentid : Number,
  gender: string,
  education: string,
  schoolName: string,
  documentType: string,
  docNo : Number,
  streetAddress: string,
  postalCode : string,
  city: string,
  state: string,
  country: string,
  name: string,
  managerFirstname: string,
  managerLastname: string,
  jobtitle:string
  branchsName: string,
  vacationHours: number,
  sickLeaveHours: number
}
@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeeDataComponent implements OnInit  {
  jopsId !: any [] 
  DepartmentsID !: any []
  BranchsId !: any [] 

  columnsToDisplay = ['firstname', 'midname', 'lastname'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Employee | null;
  ELEMENT_DATA!: Employee[] 
  filteredData: Employee[] = [];
  allEmployeeData : any [] = []
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>(this.filteredData);
  EmployeeData: { [key: number]: FormGroup } = {};



  constructor(private _EmployeeActionService : EmployeeActionService,
    private _EmployeeResourceServiceService : EmployeeResourceServiceService,
    private formBuilder: FormBuilder){}

    GetAllEmployeeData(){
      this.allEmployeeData = this._EmployeeActionService.employData
      this.dataSource.data = this.allEmployeeData
      console.log(this.dataSource.data);
      
      this.loopOnData()
    }

    loopOnData(){
      for(let i = 0; i < this.dataSource.data.length; i++){
        this.EmployeeData[i] = this.formBuilder.group({
          id: [this.dataSource.data[i].id, [Validators.required,]],
          firstname: [this.dataSource.data[i].firstname, [Validators.required,]],
          midname: [this.dataSource.data[i].midname, [Validators.minLength(1),Validators.maxLength(30)] ],
          lastname: [this.dataSource.data[i].lastname, [Validators.required,Validators.minLength(1),Validators.maxLength(30)]],
          email: [this.dataSource.data[i].email, [Validators.required, Validators.email, Validators.maxLength(35)]],
          hireType: [this.dataSource.data[i].hireType, Validators.required],
          phonenumber: [this.dataSource.data[i].phonenumber, [Validators.required, Validators.maxLength(20)]],
          hiredate: [this.dataSource.data[i].hiredate, Validators.required],
          jobid: [this.dataSource.data[i].jobid, [Validators.required]],
          managerid: [this.dataSource.data[i].managerid,],
          departmentid: [this.dataSource.data[i].departmentid, ],
          gender: [this.dataSource.data[i].gender, [Validators.required]],
          education: [this.dataSource.data[i].education,],
          schoolName: [this.dataSource.data[i].schoolName, [Validators.maxLength(30)]],
          documentType: [this.dataSource.data[i].documentType, ],
          docNo: [this.dataSource.data[i].docNo, [Validators.required, Validators.maxLength(50)]],
          streetAddress: [this.dataSource.data[i].streetAddress, [Validators.maxLength(40)]],
          postalCode: [this.dataSource.data[i].postalCode, [Validators.maxLength(12)]],
          city: [this.dataSource.data[i].city, [Validators.maxLength(30)]],
          state: [this.dataSource.data[i].state, [Validators.maxLength(25)]],
          country: [this.dataSource.data[i].country, [Validators.maxLength(30)]],
          vacationHours: [this.dataSource.data[i].vacationHours,  [Validators.required,Validators.pattern("^[0-9]*$")]],
          sickLeaveHours: [this.dataSource.data[i].sickLeaveHours,  [Validators.required,Validators.pattern("^[0-9]*$")]],
          branchsName: [this.dataSource.data[i].branchsName, [Validators.required]],
        });
      }
      console.log(this.EmployeeData);
    }
    updateUser(Employee : any){

    }
    DeleteUser(Employee : any){
      console.log(Employee.value.id);
    }


    GetAllJopID(){
      this._EmployeeResourceServiceService.GetAllJopId().subscribe({
        next : (res) => {
          this.jopsId = res
          console.log(res);
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    GetAllDepartmentID(){
      this._EmployeeResourceServiceService.GetAllDepartmentId().subscribe({
        next : (res) => {
          this.DepartmentsID = res
          console.log(res);
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    GetAllBranchID(){
      this._EmployeeResourceServiceService.GetAllBranchId().subscribe({
        next : (res) => {
          this.BranchsId = res
          console.log(res);
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    ngOnInit(): void {
      this.GetAllJopID()
      this.GetAllDepartmentID()
      this.GetAllBranchID()
      this.GetAllEmployeeData()
    }
    
}
