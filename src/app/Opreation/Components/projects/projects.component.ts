import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OpereationServicesService } from '../../Services/opereation-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(public _OpereationServicesService : OpereationServicesService,
    public dialog: MatDialog){


  }
  AllProjects : any = []
  @Input() parent!: FormGroup;

  ngOnInit(): void {
    this.GetAllProjects()
  }
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
  openDialog() {
    const dialogRef = this.dialog.open(ProjectDialogComponent);
  }
}
