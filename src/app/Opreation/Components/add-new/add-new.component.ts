import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { OpereationServicesService } from '../../Services/opereation-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { TypesDialogComponent } from '../types-dialog/types-dialog.component';
@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  
  constructor(public _OpreationActionHelpersService : OpreationActionHelpersService,
              public _OpereationServicesService : OpereationServicesService,
              public dialog: MatDialog){

  }
  
  AddNewUnitForm = new FormGroup({
    projectId : new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    UnitNO : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    Block : new FormControl('',Validators.pattern("^[0-9]*$")),
    DesignNo : new FormControl('',Validators.maxLength(25)),
    TypeID : new FormControl(3,[Validators.required,Validators.pattern("^[0-9]*$")]),
    FloorNo : new FormControl('',Validators.pattern("^[0-9]*$")),
    landNo : new FormControl('', Validators.maxLength(25)),
    LotSize : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    ConstructionDimension : new FormControl('',Validators.maxLength(25)),
    bedrooms :  new FormControl('',Validators.pattern("^[0-9]*$")),
    bathrooms : new FormControl('',Validators.pattern("^[0-9]*$")),
    budget : new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    startdate :  new FormControl('', Validators.required),
    enddate :  new FormControl('', Validators.required),
    description :  new FormControl('',Validators.maxLength(225))
  })
  openDialogProject() {
    const dialogRef = this.dialog.open(ProjectDialogComponent);
  }
  openDialogType() {
    const dialogRef = this.dialog.open(TypesDialogComponent);
  }

  addNewUnit(){
    const modal : {} = {
      "projectId" : this.AddNewUnitForm.controls.projectId.value,
      "UnitNO" : this.AddNewUnitForm.controls.UnitNO.value,
      "Block" : this.AddNewUnitForm.controls.Block.value,
      "DesignNo" : this.AddNewUnitForm.controls.DesignNo.value,
      "TypeID" : this.AddNewUnitForm.controls.TypeID.value,
      "FloorNo" : this.AddNewUnitForm.controls.FloorNo.value,
      "landNo" : this.AddNewUnitForm.controls.landNo.value,
      "LotSize" : this.AddNewUnitForm.controls.LotSize.value,
      "ConstructionDimension" : this.AddNewUnitForm.controls.ConstructionDimension.value,
      "bedrooms" : this.AddNewUnitForm.controls.bedrooms.value,
      "bathrooms" : this.AddNewUnitForm.controls.bathrooms.value,
      "budget" : this.AddNewUnitForm.controls.budget.value,
      "startdate" : this.AddNewUnitForm.controls.startdate.value,
      "enddate" :this.AddNewUnitForm.controls.enddate.value,
      "description" :  this.AddNewUnitForm.controls.description.value
    }
    
    this._OpereationServicesService.AddNewUnit(modal).subscribe({
      next : (res) => {
        this.AddNewUnitForm.reset()
      },
      error : (err) =>{
        console.log(err);
      }
    })
    
  }
  projectIdErrorNessage(){
    if (this.AddNewUnitForm.controls['projectId'].hasError('required')) {
      return 'Please Select Project';
    }else{
      return '';
    }
  }
  UnitNOErrorNessage(){
    if (this.AddNewUnitForm.controls['UnitNO'].hasError('required')) {
      return 'Unit number Is Required ';
    }else{
      return '';
    }
  }
  DesignNoErrorNessage(){
    if (this.AddNewUnitForm.controls['DesignNo'].hasError('required')) {
      return 'Design Number is Required';
    } else if(this.AddNewUnitForm.controls['DesignNo'].hasError('maxLength')){
      return 'Maximum Chracteris 25';
    } else{
      return '';
    }
  }
  TypeIDErrorNessage(){
    if (this.AddNewUnitForm.controls['TypeID'].hasError('required')) {
      return 'Type Is Required';
    }else{
      return '';
    }
  }
  landNoErrorNessage(){
    if (this.AddNewUnitForm.controls['landNo'].hasError('maxLength')) {
      return 'maximum Number of Charcter is 25';
    }else{
      return '';
    }
  }
  LotSizeErrorNessage(){
    if (this.AddNewUnitForm.controls['LotSize'].hasError('required')) {
      return 'lot Size is Required';
    }else{
      return '';
    }
  }
  ConstructionDimensionErrorNessage(){
    if (this.AddNewUnitForm.controls['ConstructionDimension'].hasError('maxLength')) {
      return 'maximum Number of Charcter is 25';
    }else{
      return '';
    }
  }
  budgetErrorNessage(){
    if (this.AddNewUnitForm.controls['budget'].hasError('required')) {
      return 'budget is Required';
    }else{
      return '';
    }
  }
  startdateErrorNessage(){
    if (this.AddNewUnitForm.controls['startdate'].hasError('required')) {
      return 'Start Date is Required';
    }else{
      return '';
    }
  }
  enddateErrorNessage(){
    if (this.AddNewUnitForm.controls['enddate'].hasError('required')) {
      return 'End Date is Required';
    }else{
      return '';
    }
  }
  descriptionErrorNessage(){
    if (this.AddNewUnitForm.controls['description'].hasError('required')) {
      return 'Unit Description is Required';
    }else{
      return '';
    }
  }

  ngOnInit(): void {
  }

}
