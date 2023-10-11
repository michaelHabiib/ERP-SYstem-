import { Component, OnInit } from '@angular/core';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  constructor(public OpreationActionHelpersService : OpreationActionHelpersService,
  public dialog: MatDialog, private _snackBar : MatSnackBar ){}
  AllProjects : any [] = []
  projectsForm : any [] = []
  GroupsTypeToLoopOnit: any [] = []
  GroupsType : any [] = []
  loading :  boolean  =  false

  GetAllProjects(){
    this.loading = true
    this.OpreationActionHelpersService.GetALlProjects().subscribe({
      next : (res) =>{ 
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
          this.GroupsType = res
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  updateProject(projectForm : any){
    const id = projectForm.value.id
    const modal = {
      id : id,
      projectname: projectForm.value.projectname,
      typeId:  2,
      startdate: projectForm.value.startdate,
      enddate: projectForm.value.enddate,
      budget: projectForm.value.budget,
      location: projectForm.value.location,
    }
    this.OpreationActionHelpersService.updateProject(id, modal).subscribe({
      next : (res) => {
        this.openSnackBar('project Updated Successfully')
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddProjectComponent);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }
  deleteProject(id : number){
    this.OpreationActionHelpersService.DeleteProject(id).subscribe({
      next : (res) =>{
        this.GetAllProjects()
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
