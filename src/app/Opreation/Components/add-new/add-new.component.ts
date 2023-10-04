import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { OpereationServicesService } from '../../Services/opereation-services.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {
  AllProjects : any = []
  
  constructor(public _OpreationActionHelpersService : OpreationActionHelpersService,
              public _OpereationServicesService : OpereationServicesService){

  }
  
  AddNewUnitForm = new FormGroup({
    projectId : new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$")]),
    UnitNO : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
    Block : new FormControl('',Validators.pattern("^[0-9]*$")),
    DesignNo : new FormControl('',Validators.maxLength(25)),
    TypeID : new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
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

  GetAllProjects(){
    this._OpreationActionHelpersService.GetAllProjects().subscribe({
      next : (res) =>{ 
        console.log(res);
        this.AllProjects = res
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  addNewUnit(){
    console.log(this.AddNewUnitForm);
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
    console.log(modal);
    
    this._OpereationServicesService.AddNewUnit(modal).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) =>{
        console.log(err);
      }
    })
    
  }

  ngOnInit(): void {
    this.GetAllProjects()
  }

}
