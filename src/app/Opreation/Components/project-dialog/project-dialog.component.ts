import { Component, OnInit } from '@angular/core';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  constructor(public OpreationActionHelpersService : OpreationActionHelpersService,
  public dialog: MatDialog ){}
  AllProjects : any [] = []
  projectsForm : any [] = []
  GroupsTypeToLoopOnit: any [] = []
  GroupsType : any [] = []
  loading :  boolean  =  false

  GetAllProjects(){
    this.loading = true
    this.OpreationActionHelpersService.GetALlProjects().subscribe({
      next : (res) =>{ 
        console.log(res);
        this.AllProjects = res
        this.looponData(this.AllProjects)
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }
  looponData(AllProjects :any []){
    this.projectsForm = [];
    for(let i = 0; i < AllProjects.length; i++){
      const projectFormGroup : FormGroup = new FormGroup({
        id : new FormControl(AllProjects[i].id,[Validators.required]),
        projectname : new FormControl(AllProjects[i].projectname,[Validators.required]),
        projectTypeEn : new FormControl(AllProjects[i].projectTypeEn,[Validators.required]),
        startdate : new FormControl(AllProjects[i].startdate,[Validators.required]),
        enddate : new FormControl(AllProjects[i].enddate,[Validators.required]),
        budget : new FormControl(AllProjects[i].budget,[Validators.required]),
        location : new FormControl(AllProjects[i].location,[Validators.required])
      })
      this.projectsForm.push(projectFormGroup)
    }
    this.loading = false
  }

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
  updateProject(projectForm : any){
    console.log(projectForm);
    const id = projectForm.value.id
    const modal = {
      projectname: projectForm.value.projectname,
      typeId:  projectForm.value.projectTypeEn,
      startdate: projectForm.value.startdate,
      enddate: projectForm.value.enddate,
      budget: projectForm.value.budget,
      location: projectForm.value.location,
    }
    console.log(modal);
    this.OpreationActionHelpersService.updateProject(id, modal).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddProjectComponent);
  }
  deleteProject(id : number){
    this.OpreationActionHelpersService.DeleteProject(id).subscribe({
      next : (res) =>{
        this.GetAllProjects()
        console.log(res);
      },
      error : (err) =>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.GetAllProjects()
    this.GetProjectTypes()
  }
}
