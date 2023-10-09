import { Component, OnInit } from '@angular/core';
import { OpereationServicesService } from '../../Services/opereation-services.service';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypesDialogComponent } from '../types-dialog/types-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-unit-data',
  templateUrl: './unit-data.component.html',
  styleUrls: ['./unit-data.component.css']
})
export class UnitDataComponent implements OnInit {
  AllUnits : any [] = []
  unit! : any
  UpdateOpreationUnit: any [] = []
  AllProjects! : any []
  constructor(public _OpreationActionHelpersService : OpreationActionHelpersService,
    public _OpereationServicesService : OpereationServicesService,
    public dialog: MatDialog){}

 
  GetAllProjects(){
      this._OpereationServicesService.GetAllProjects().subscribe({
        next : (res) =>{ 
          // console.log(res);
          this.AllProjects = res
        },
        error : (err) =>{
          console.log(err);
        }
      })
    }
  selectedValue(event : MatSelectChange){
    // console.log(event.value);
    const projectName = event.value
    console.log(projectName);
    
    this.GetAllUnits(1,10,projectName)
  }

  
  GetAllUnits(PageNo : number, pageSize : number, pageName : string){
    this._OpereationServicesService.GetAllUnit(PageNo,pageSize,pageName).subscribe({
      next : (res) =>{
        console.log(res);
        
        this.AllUnits = res
        this.looponData(this.AllUnits)
      },
      error : (err) => {
        console.log(err);
        
      }
    })
  }
  looponData(AllUnits : any){
    this.UpdateOpreationUnit = [];
    for(let i = 0; i < AllUnits.length; i++){
      const unitFormGroup : FormGroup = new FormGroup({
        id: new FormControl (AllUnits[i].id, [Validators.required]),
        projectId: new FormControl(AllUnits[i].projectId,[Validators.required,Validators.pattern("^[0-9]*$")]),
        projectname: new FormControl(AllUnits[i].projectname,[Validators.required]),
        unitNo : new FormControl(AllUnits[i].unitNo,[Validators.required,Validators.pattern("^[0-9]*$")]),
        block : new FormControl(AllUnits[i].block,Validators.pattern("^[0-9]*$")),
        designNo : new FormControl(AllUnits[i].designNo,Validators.maxLength(25)),
        typeId : new FormControl(AllUnits[i].typeId,[Validators.required,Validators.pattern("^[0-9]*$")]),
        floorNo : new FormControl(AllUnits[i].floorNo,Validators.pattern("^[0-9]*$")),
        landNo : new FormControl(AllUnits[i].landNo, Validators.maxLength(25)),
        lotSize : new FormControl(AllUnits[i].lotSize,[Validators.required,Validators.pattern("^[0-9]*$")]),
        constructionDimension : new FormControl(AllUnits[i].constructionDimension,Validators.maxLength(25)),
        bedrooms :  new FormControl(AllUnits[i].bedrooms,Validators.pattern("^[0-9]*$")),
        bathrooms : new FormControl(AllUnits[i].bathrooms,Validators.pattern("^[0-9]*$")),
        budget : new FormControl(AllUnits[i].budget, [Validators.required,Validators.pattern("^[0-9]*$")]),
        startdate :  new FormControl(AllUnits[i].startdate, Validators.required),
        enddate :  new FormControl(AllUnits[i].enddate, Validators.required),
        description :  new FormControl(AllUnits[i].description,Validators.maxLength(225)),
        createdBy : new FormControl(0,Validators.required),
        modifiedBy : new FormControl(0,Validators.required),
      })
      this.UpdateOpreationUnit[i] = unitFormGroup
    }
  }
  UpdateUnit(unit : FormGroup){
    const id = unit.value.id
    const modal = {
      "id": unit.value.id,
      "projectId": unit.value.projectId,
      "unitNo": unit.value.unitNo,
      "block": unit.value.block,
      "designNo": unit.value.designNo,
      "typeId": unit.value.typeId,
      "floorNo": unit.value.floorNo,
      "landNo": unit.value.landNo,
      "lotSize": unit.value.lotSize,
      "constructionDimension": unit.value.constructionDimension,
      "bedrooms": unit.value.bedrooms,
      "bathrooms": unit.value.bathrooms,
      "budget": unit.value.budget,
      "startdate": unit.value.startdate,
      "enddate": unit.value.enddate,
      "description": unit.value.description,
      "createdBy":  unit.value.createdBy,

    }

    this._OpereationServicesService.UpdateUnit(modal,id).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  DeleteUnit(unit : FormGroup){
    const id = unit.value.id
    this._OpereationServicesService.DeleteUnit(id).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  openDialogProject() {
    const dialogRef = this.dialog.open(ProjectDialogComponent);
  }
  openDialogType() {
    const dialogRef = this.dialog.open(TypesDialogComponent);
  }



ngOnInit(): void {
  this.GetAllProjects()
}
}
