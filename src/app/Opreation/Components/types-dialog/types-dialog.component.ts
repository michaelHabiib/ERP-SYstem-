import { Component, OnInit } from '@angular/core';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddTypeDialogComponent } from '../add-type-dialog/add-type-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-types-dialog',
  templateUrl: './types-dialog.component.html',
  styleUrls: ['./types-dialog.component.css']
})
export class TypesDialogComponent implements OnInit {
  GroupsType : any [] = []
  GroupsTypeToLoopOnit: any [] = []
  UpdateUnitForm! : FormGroup
  loading : Boolean = false

  constructor(public OpreationActionHelpersService : OpreationActionHelpersService,
    public dialog: MatDialog,public dialogRef : MatDialogRef<TypesDialogComponent> ){}
  unitForm : FormGroup = new FormGroup({
    groupType : new FormControl('',[Validators.required,Validators.maxLength(25)]),
    typeEn : new FormControl('',[Validators.required]),
    typeAr : new FormControl('',[Validators.required])
  })
  GetTypesByGroupTypeUnit ( ) {
    this.loading = true
    this.OpreationActionHelpersService.GetTypesByGroupType('unit').subscribe({
      next : (res) => {
        // console.log(res);
         this.GroupsTypeToLoopOnit = res
        this.GetTypesByGroupTypeProject()
        // this.looponData(GroupsTypeToLoopOnit)
      },
      error : (err) => {
        console.log(err);
      }
    })
  } 
  GetTypesByGroupTypeProject ( ) {
    this.OpreationActionHelpersService.GetTypesByGroupType('project').subscribe({
      next : (res) => {
        // console.log(res);
        for(let i =0; i < res.length; i++){
          this.GroupsTypeToLoopOnit.push(res[i])
        }
        this.looponData(this.GroupsTypeToLoopOnit)
      },
      error : (err) => {
        console.log(err);
      }
    })
  } 
  looponData(GroupsTypeToLoopOnit :any []){
    this.GroupsType = [];
    for(let i = 0; i < GroupsTypeToLoopOnit.length; i++){
      const groupTypeFormGroup : FormGroup = new FormGroup({
        id : new FormControl(GroupsTypeToLoopOnit[i].id),
        groupType : new FormControl(GroupsTypeToLoopOnit[i].groupType,[Validators.required,Validators.maxLength(25)]),
        typeEn : new FormControl(GroupsTypeToLoopOnit[i].typeEn,[Validators.required]),
        typeAr : new FormControl(GroupsTypeToLoopOnit[i].typeAr,[Validators.required])
      })
      this.GroupsType.push(groupTypeFormGroup)
    }
    this.loading = false
  }
  DeleteType(id : number){
    this.OpreationActionHelpersService.DeleteType(id).subscribe({
      next : (res)=> {
        console.log(res);
        this.GetTypesByGroupTypeUnit()
      },
      error : (err) =>{
        console.log(err);
        
      }
    })
    
  }
  updateType(form : FormGroup){
    const modal = {
      id: form.value.id,
      groupType: form.value.groupType,
      typeAr: form.value.typeAr,
      typeEn: form.value.typeEn,
    }
    this.OpreationActionHelpersService.updateType(modal).subscribe({
      next : (res) => {
        this.dialogRef.close()
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddTypeDialogComponent);
  }
  ngOnInit(): void {
    this.GetTypesByGroupTypeUnit()
  }

}
