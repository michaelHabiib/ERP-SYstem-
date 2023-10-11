import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegsterAndLoginService } from '../../Services/regster-and-login.service';

@Component({
  selector: 'app-regstration',
  templateUrl: './regstration.component.html',
  styleUrls: ['./regstration.component.css']
})
export class RegstrationComponent implements OnInit {
  RolesData : any [] = []
  hide = true
  @Output() registrationSuccess = new EventEmitter<void>()
  constructor(public _RegsterAndLoginService :  RegsterAndLoginService){}

  regstrationForm = new FormGroup({
    username : new FormControl('', [Validators.required, Validators.maxLength(25)]),
    email : new FormControl('', [Validators.required,Validators.email]),
    password :  new FormControl('', [Validators.required]),
    rolepermissionsid :  new FormControl('',[Validators.required])
  })
  InsertUser(){
    // console.log(this.regstrationForm);
    const modal = {
      username : this.regstrationForm.value.username,
      email : this.regstrationForm.value.email,
      password :  this.regstrationForm.value.password,
      rolepermissionsid :  this.regstrationForm.value.rolepermissionsid
    }
   this._RegsterAndLoginService.UserInsert(modal).subscribe({
    next : (res) => {
      this.regstrationForm.reset()
      this.registrationSuccess.emit();

    },
    error : (err) => {
      console.log(err);
    }
   }) 
  }
  GetAllRoles(){
    this._RegsterAndLoginService.GetAllRoles().subscribe({
      next : (res) => {
        console.log(res);
        this.RolesData = res
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  
  ngOnInit(): void {
    this.GetAllRoles()
  }

}
