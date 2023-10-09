import { Component, Input, OnInit } from '@angular/core';
import { OpreationActionHelpersService } from '../../Services/opreation-action-helpers.service';
import { FormGroup } from '@angular/forms';
import { TypesDialogComponent } from '../types-dialog/types-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-types-components',
  templateUrl: './types-components.component.html',
  styleUrls: ['./types-components.component.css']
})
export class TypesComponentsComponent implements OnInit {
  @Input() parent!: FormGroup;
  GroupsType : any [] = []

  constructor(public _OpreationActionHelpersService : OpreationActionHelpersService,
    public dialog: MatDialog){}


  GetUnitsType ( ) {
    this._OpreationActionHelpersService.GetTypesByGroupType('unit').subscribe({
      next : (res) => {
        this.GroupsType = res
      },
      error : (err) => {
        console.log(err);
      }
    })
  }


  ngOnInit(): void {
    this.GetUnitsType()

  }
}
