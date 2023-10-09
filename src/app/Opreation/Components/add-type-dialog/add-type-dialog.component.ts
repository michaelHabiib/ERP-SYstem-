import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { TypesDialogComponent } from '../types-dialog/types-dialog.component';
@Component({
  selector: 'app-add-type-dialog',
  templateUrl: './add-type-dialog.component.html',
  styleUrls: ['./add-type-dialog.component.css']
})
export class AddTypeDialogComponent {
  constructor(public _OpreationActionHelpersService : OpreationActionHelpersService,
    private _snackBar : MatSnackBar,public dialog: MatDialogRef<AddTypeDialogComponent>,
    public dialog2: MatDialogRef<TypesDialogComponent>){

  }

  addNewTypeForm = new FormGroup({
    groupType :  new FormControl('', Validators.required),
    typeAr :  new FormControl('', Validators.required),
    typeEn :  new FormControl('',Validators.required)
  })
  openSnackBar(message: string) {
    this._snackBar.open(message, '',{
      duration: 4000, // 5 seconds
      panelClass: 'custom-snackbar',
      verticalPosition: 'bottom', 
      horizontalPosition: 'center'
    });
  }

  addNewType(){
    console.log(this.addNewTypeForm);
    const modal = {
      groupType :  this.addNewTypeForm.value.groupType,
      typeAr :  this.addNewTypeForm.value.typeAr,
      typeEn :  this.addNewTypeForm.value.typeEn,
    }
    this._OpreationActionHelpersService.AddNewType(modal).subscribe({
      next : (res) => {
        // console.log(res);
        this.openSnackBar('Type Added Successfully')
         this.dialog.close();
         this.dialog2.close()


      },
      error : (err) => {
        console.log(err);
      }
    })
    
  }

}
