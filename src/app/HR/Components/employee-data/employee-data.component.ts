import { Component, Injectable, OnInit } from '@angular/core';
import { EmployeeActionService } from '../../Services/employee-action.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeResourceServiceService } from '../../Services/employee-resource-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';


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
  loading: Boolean = false
  searchTerm: string = '';
  filteredData: any[] = [];
  mizo! : Employee []
  pageSizeOptions = [5, 30, 25, 100];
  pageEvent!: PageEvent | void;
  datasource!: null ;
  pageIndex!:number;
  pageSize:number = 10
  pageNo!:number 
  length:number = 100

  allEmployeeData : any [] = []
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  EmployeeDataa: { [key: number]: FormGroup } = {};



  constructor(private _EmployeeActionService : EmployeeActionService,
    private _EmployeeResourceServiceService : EmployeeResourceServiceService,
    private formBuilder: FormBuilder){}

    getServerData(event:PageEvent){
      const pageNo : number  = event?.pageIndex
      const PageSize  : number = event?.pageSize
      this.GetAllEmployeeData(pageNo,PageSize)
    }
    filterJopTittle(jopTittle : string){
      if (jopTittle === 'All') {
        this.filteredData = this.mizo;        
        this.dataSource.data = this.filteredData
        this.loopOnData()
      } else {        
        this.filteredData = this.mizo.filter(item => item.jobtitle == jopTittle );
        this.dataSource.data = this.filteredData
        this.loopOnData()
      }
    }
    GetAllEmployeeData(PageNo: number,PageSize: number){
      this.dataSource.data = []
      this.EmployeeDataa = [] 
      this.allEmployeeData= []
      this.loading = true
      this._EmployeeActionService.GetAllEmployees(PageNo,PageSize).subscribe({
        next : (res) => {
          this.dataSource.data = res
          this.mizo = this.dataSource.data
          this.loopOnData()
          this.loading = false
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    loopOnData(){
      if(this.dataSource.data.length){
        this.allEmployeeData = []
        console.log(this.allEmployeeData);
        
        for(let i = 0; i < this.dataSource.data.length; i++){
          this.EmployeeDataa[i] = this.formBuilder.group({
            id: [this.dataSource.data[i].id, [Validators.required,]],
            firstname: [this.dataSource.data[i].firstname, [Validators.required,Validators.minLength(1),Validators.maxLength(30)]],
            midname: [this.dataSource.data[i].midname, [Validators.minLength(1),Validators.maxLength(30)] ],
            lastname: [this.dataSource.data[i].lastname, [Validators.required,Validators.minLength(1),Validators.maxLength(30)]],
            email: [this.dataSource.data[i].email, [Validators.required, Validators.email, Validators.maxLength(35)]],
            hireType: [this.dataSource.data[i].hireType, Validators.required],
            phonenumber: [this.dataSource.data[i].phonenumber, [Validators.required, Validators.maxLength(20)]],
            hiredate: [this.dataSource.data[i].hiredate, Validators.required],
            jobid: [this.dataSource.data[i].jobid, [Validators.required]],
            managerid: [this.dataSource.data[i].managerid,[Validators.required]],
            departmentid: [this.dataSource.data[i].departmentid,[Validators.required]],
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
            jobtitle: [this.dataSource.data[i].jobtitle, [Validators.required]],
          });
          this.allEmployeeData.push(this.EmployeeDataa[i])
        }
      }     
    }
    updateUser(Employee : any){
      this.loading = true
      const id =  Employee.value.id
      const modal ={
        "id": Employee.value.id,
        "firstname":  Employee.value.firstname,
        "midname":  Employee.value.midname,
        "lastname":   Employee.value.lastname,
        "email":   Employee.value.email,
        "hireType":   Employee.value.hireType,
        "phonenumber":   Employee.value.phonenumber,
        "hiredate":   Employee.value.hiredate,
        "jobid":   Employee.value.jobid,
        "managerid":  Employee.value.managerid,
        "departmentid":   Employee.value.departmentid,
        "gender":   Employee.value.gender,
        "education":   Employee.value.education,
        "schoolName":   Employee.value.schoolName,
        "documentType":   Employee.value.documentType,
        "docNo":   Employee.value.docNo,
        "branchId":   0,
        "streetAddress":  Employee.value.streetAddress,
        "postalCode":  Employee.value.postalCode,
        "city":   Employee.value.city,
        "state":   Employee.value.state,
        "country":   Employee.value.country,
        "vacationHours":   Employee.value.vacationHours,
        "sickLeaveHours":   Employee.value.sickLeaveHours,
        "createdBy": 0,
        "modifiedBy": 0,
        // "modifiedDate": "2023-10-01T20:01:18.100Z"
      }
      // console.log(modal);
      this._EmployeeActionService.UpdateEmployee(id, modal).subscribe({
        next : (res) => {
          console.log(res);
          this.GetAllEmployeeData(1,10)
        }, error : (err) => {
          console.log(err);
          
        }
      })
      
      

    }
    DeleteUser(Employee : any){
      const id = Employee.value.id
      this.loading = true
      this._EmployeeActionService.DeleteEmployee(id).subscribe({
        next  : (res) => {
          this.GetAllEmployeeData(1,10)
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    GetAllJopID(){
      this._EmployeeResourceServiceService.GetAllJopId().subscribe({
        next : (res) => {
          this.jopsId = res          
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
        },
        error : (err) => {
          console.log(err);
        }
      })
    }
    GetAllBranchID(){
      this._EmployeeResourceServiceService.GetAllBranchId().subscribe({
        next : (res) => {
          // console.log(res);
          
          this.BranchsId = res
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
      this.GetAllEmployeeData(1,10)
    }
    
}
