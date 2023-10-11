import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegsterAndLoginService } from '../../Services/regster-and-login.service';
import { MatDialog } from '@angular/material/dialog';
import { VerfictionDialogComponent } from '../verfiction-dialog/verfiction-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() registrationSuccess = new EventEmitter<void>()
  hide = true
  constructor(public _RegsterAndLoginService :  RegsterAndLoginService,public dialog: MatDialog){}
  


  LogInForm = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.maxLength(25)]),
    password :  new FormControl('', [Validators.required]),
  })
  LogIn(){
    const modal = {
      username : this.LogInForm.value.username,
      password : this.LogInForm.value.password
    }
    this._RegsterAndLoginService.LogIn(modal).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) =>{
        console.log(err);
        this.openDialog(modal.username)

      }
    })
  }
  openDialog(username : any) {
    this.dialog.open(VerfictionDialogComponent, {
       data : {
        username
      }
    });
  }
}
