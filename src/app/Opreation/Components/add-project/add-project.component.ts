import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTypeDialogComponent } from '../add-type-dialog/add-type-dialog.component';
import { TypesDialogComponent } from '../types-dialog/types-dialog.component';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  GroupsType : any [] = []
  constructor(public OpreationActionHelpersService : OpreationActionHelpersService,
    public dialog: MatDialogRef<AddProjectComponent>,
    public dialog2: MatDialogRef<ProjectDialogComponent>){  }

  addProjectForm = new FormGroup({
    projectname :  new FormControl('', Validators.required),
    typeId :  new FormControl('', Validators.required),
    location :  new FormControl('',Validators.required),
    budget :  new FormControl('',Validators.required),
    startdate :  new FormControl('',Validators.required),
    enddate :  new FormControl('',Validators.required),
  })
  addNewProject(projectForm : FormGroup){
    console.log(projectForm);
    const modal = {
      projectname: projectForm.value.projectname,
      typeId: projectForm.value.typeId,
      startdate: projectForm.value.startdate,
      enddate: projectForm.value.enddate,
      budget: projectForm.value.budget,
      location: projectForm.value.location,
    }
    console.log(modal);
    this.OpreationActionHelpersService.addNewProject(modal).subscribe({
      next :  (res) =>{
        console.log(res);
         this.dialog.close();
         this.dialog2.close()
      },
      error : (err) => {
        console.log(err);
      }
    })
    
  }
  // GetUnitsType ( ) {
  //   this.OpreationActionHelpersService.GetTypesByGroupType('unit').subscribe({
  //     next : (res) => {
  //       // console.log(res);
  //       this.GroupsType = res
  //       this.GetProjectTypes()
  //     },
  //     error : (err) => {
  //       console.log(err);
  //     }
  //   })
  // }
  GetProjectTypes ( ) {
    this.OpreationActionHelpersService.GetTypesByGroupType('project').subscribe({
      next : (res) => {
        // console.log(res);
          this.GroupsType = res

        console.log(this.GroupsType);
        
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.GetProjectTypes()
  }
}
