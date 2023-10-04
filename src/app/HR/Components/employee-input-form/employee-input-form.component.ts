import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EmployeeActionService } from '../../Services/employee-action.service';
import { EmployeeResourceServiceService } from '../../Services/employee-resource-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-input-form',
  templateUrl: './employee-input-form.component.html',
  styleUrls: ['./employee-input-form.component.css']
})
export class EmployeeInputFormComponent implements OnInit {

  jopsId : any []  = []
  DepartmentsID : any []  = []
  BranchsId : any []  = []
constructor(private _EmployeeActionService : EmployeeActionService,
  private _EmployeeResourceServiceService : EmployeeResourceServiceService,
  private _snackBar : MatSnackBar,
  private router : Router){

}
  AddEmployeeForm : FormGroup = new FormGroup({
  FirstName: new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(30)]),
  middleName: new FormControl('', [Validators.minLength(1),Validators.maxLength(30)]),
  lastName: new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(30)]),
  Email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(35)]),
  Gender: new FormControl('', [Validators.required]),
  Phone: new FormControl('',[Validators.required, Validators.maxLength(20)]),
  DocumentType: new FormControl('', ),
  DocumentNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  EductionDegree: new FormControl('', ),
  SchoolName: new FormControl('', [Validators.maxLength(30)]),
  HireDate: new FormControl( new Date(), [Validators.required]),
  HireType: new FormControl('', [Validators.required]),
  managerID: new FormControl('', ),
  jopID: new FormControl('',[Validators.required]),
  DepartmentID: new FormControl('',),
  BranchID: new FormControl('',),
  Address: new FormControl('', [Validators.maxLength(40)]),
  PostalCode: new FormControl('', [Validators.maxLength(12)]),
  city: new FormControl('', [Validators.maxLength(30)]),
  state: new FormControl('', [Validators.maxLength(25)]),
  country: new FormControl('', [Validators.maxLength(30)]),
  VacationHours: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
  SickLeaveHours: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
});
AddnewEmployee () {
  console.log(this.AddEmployeeForm);
const modal = 
  {
    "firstname": this.AddEmployeeForm.controls['FirstName'].value,
    "midname":  this.AddEmployeeForm.controls['middleName'].value,
    "lastname": this.AddEmployeeForm.controls['lastName'].value,
    "email": this.AddEmployeeForm.controls['Email'].value,
    "hireType":this.AddEmployeeForm.controls['HireType'].value,
    "phonenumber": this.AddEmployeeForm.controls['Phone'].value,
    "hiredate": this.AddEmployeeForm.controls['HireDate'].value,
    "jobid": this.AddEmployeeForm.controls['jopID'].value,
    "managerid":this.AddEmployeeForm.controls['managerID'].value,
    "departmentid":  this.AddEmployeeForm.controls['DepartmentID'].value,
    "gender": this.AddEmployeeForm.controls['Gender'].value,
    "education": this.AddEmployeeForm.controls['EductionDegree'].value,
    "schoolName":this.AddEmployeeForm.controls['SchoolName'].value,
    "documentType": this.AddEmployeeForm.controls['DocumentType'].value,
    "docNo":  this.AddEmployeeForm.controls['DocumentNumber'].value,
    "branchId":  this.AddEmployeeForm.controls['BranchID'].value,
    "streetAddress": this.AddEmployeeForm.controls['Address'].value,
    "postalCode": this.AddEmployeeForm.controls['PostalCode'].value,
    "city": this.AddEmployeeForm.controls['city'].value,
    "state":this.AddEmployeeForm.controls['state'].value,
    "country": this.AddEmployeeForm.controls['country'].value,
    "vacationHours": this.AddEmployeeForm.controls['VacationHours'].value,
    "sickLeaveHours": this.AddEmployeeForm.controls['SickLeaveHours'].value,
    "createdBy": 0,
  }
console.log(modal);
this._EmployeeActionService.addNewEmployee(modal).subscribe({
  next : (res) => {
    console.log(res);
    this.openSnackBar('Employee Added Successfully')
    this.router.navigate(['/EmployeeData']);
  },
  error : (err) => {
    console.log(err);
  }
})
}
openSnackBar(message: string) {
  this._snackBar.open(message, '',{
    duration: 4000, // 5 seconds
    panelClass: 'custom-snackbar',
    verticalPosition: 'bottom', 
    horizontalPosition: 'center'
  });
}
FirstNameErrorNessage(){
  if (this.AddEmployeeForm.controls['FirstName'].hasError('required')) {
    return 'Employee First Name is Required';
  }else if (this.AddEmployeeForm.controls['FirstName'].hasError('maxlength')){
    return 'max Number of Chracters is 30';
  }else{
    return '';
  }
}
middletNameErrorNessage(){
  if  (this.AddEmployeeForm.controls['middleName'].hasError('maxlength')) {
    return 'max Number of Chracters is 30';
  }else{
    return '';
  }
}
jopIDErrorNessage(){
  if  (this.AddEmployeeForm.controls['jopID'].hasError('required')) {
    return 'Jop ID is Required';
  }else{
    return '';
  }
}
lastNameErrorNessage(){
  if (this.AddEmployeeForm.controls['lastName'].hasError('required')) {
    return 'Employee last Name is Required';
  }else if (this.AddEmployeeForm.controls['lastName'].hasError('maxlength')){
    return 'max Number of Chracters is 30';
  }else{
    return '';
  }
}
mailErrorMessage(){
  if (this.AddEmployeeForm.controls['Email'].hasError('required')) {
    return 'Employee mail is Required';
  }else if(this.AddEmployeeForm.controls['Email'].hasError('email')){
    return  'Enter a valid email' ;
  }else if(this.AddEmployeeForm.controls['Phone'].hasError('maxlength')) {
    return 'max Number of Character is 20';
  }else{
    return ''
  }
}
GenderErrorNessage(){
  if (this.AddEmployeeForm.controls['Gender'].hasError('required')) {
    return 'Employee Gender is Required';
  }else{
    return '';
  }
}
phoneErrorNessage(){
  if (this.AddEmployeeForm.controls['Phone'].hasError('required')) {
    return 'You must enter a value';
  }else if(this.AddEmployeeForm.controls['Phone'].hasError('maxlength')) {
    return 'max Number of Character is 20';
  }else{
    return ''
  }
}
DocumentNumberErrorNessage(){
  if (this.AddEmployeeForm.controls['DocumentNumber'].hasError('required')) {
    return 'You must enter a value';
  }else if(this.AddEmployeeForm.controls['DocumentNumber'].hasError('maxlength')) {
    return 'max Number of Character is 50';
  }else{
    return ''
  }
}
HireDateErrorNessage(){
  if (this.AddEmployeeForm.controls['HireDate'].hasError('required')) {
    return 'You must enter a value';
  }else{
    return '';
  }
}
HireTypeErrorNessage(){
  if (this.AddEmployeeForm.controls['HireType'].hasError('required')) {
    return 'Document Type is Required';
  }else{
    return '';
  }
}
SchoolNameErrorNessage(){
  if (this.AddEmployeeForm.controls['SchoolName'].hasError('maxlength')) {
    return 'max Number of Chracter is 30';
  }else{
    return '';
  }
}
AddressErrorMessage(){
  if (this.AddEmployeeForm.controls['Address'].hasError('maxlength')) {
    return 'max Number of Chracter is 40';
  }else{
    return '';
  } 
}
postalCodeErrorMessage(){
  if (this.AddEmployeeForm.controls['PostalCode'].hasError('maxlength')) {
    return 'max Number of Chracter is 12';
  }else{
    return '';
  } 
}
cityErrorMessage(){
  if (this.AddEmployeeForm.controls['city'].hasError('maxlength')) {
    return 'max Number of Chracter is 30';
  }else{
    return '';
  } 
}
stateErrorMessage(){
  if (this.AddEmployeeForm.controls['state'].hasError('maxlength')) {
    return 'max Number of Chracter is 25';
  }else{
    return '';
  } 
}
countryErrorMessage(){
  if (this.AddEmployeeForm.controls['country'].hasError('maxlength')) {
    return 'max Number of Chracter is 30';
  }else{
    return '';
  } 
}
VacationHoursErrorMessage(){
  if (this.AddEmployeeForm.controls['VacationHours'].hasError('required')) {
    return 'Vaction Hours is Required';
  }else{
    return '';
  } 
}
SickLeaveHoursErrorMessage(){
  if (this.AddEmployeeForm.controls['SickLeaveHours'].hasError('required')) {
    return 'Sick Leave Hours  is Required';
  }else{
    return '';
  } 
}
CreatedByErrorMessage(){
  if (this.AddEmployeeForm.controls['CreatedBy'].hasError('required')) {
    return 'Created By is Required';
  }else{
    return '';
  } 
}
CreatedDateErrorMessage(){
  if (this.AddEmployeeForm.controls['CreatedDate'].hasError('required')) {
    return 'Created Date is Required';
  }else{
    return '';
  } 
}
GetAllJopID(){
  this._EmployeeResourceServiceService.GetAllJopId().subscribe({
    next : (res) => {
      this.jopsId = res
      // console.log(res);
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
      // console.log(res);
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
      // console.log(res);
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
  console.log(this.AddEmployeeForm);
  
}


}
