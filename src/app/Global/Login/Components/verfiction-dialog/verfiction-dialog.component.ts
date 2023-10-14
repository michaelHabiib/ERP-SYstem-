import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegsterAndLoginService } from '../../Services/regster-and-login.service';
@Component({
  selector: 'app-verfiction-dialog',
  templateUrl: './verfiction-dialog.component.html',
  styleUrls: ['./verfiction-dialog.component.css']
})
export class VerfictionDialogComponent implements OnInit {
  @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
  @ViewChild('input5') input5!: ElementRef<HTMLInputElement>;
  @ViewChild('input6') input6!: ElementRef<HTMLInputElement>;
  status! : boolean 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public RegsterAndLoginService : RegsterAndLoginService) {}
  ngOnInit(): void {
    console.log(this.data);
    this.status = this.data.username[1]
    console.log(this.status);
    
  }
  onInputChange(nextInput: HTMLInputElement): void {
    if (nextInput) {
      nextInput.focus();
    }
  }
  // onPaste(event: ClipboardEvent): void {
  //   event.preventDefault();
  //   const pastedText = event.clipboardData?.getData('text');
  //   if (pastedText && pastedText.length === 6) {
  //     const digits = pastedText.split('');
  //     this.input1.value = digits[0];
  //     this.input2.value = digits[1];
  //     this.input3.value = digits[2];
  //     this.input4.value = digits[3];
  //     this.input5.value = digits[4];
  //     this.input6.nativeElement.value = digits[5];
  //     setTimeout(() => {
  //       this.input2.focus();
  //     }, 0);
  //   }
  // }
  verfctionCode(): void{
    const inputValues = [
      this.input1.nativeElement.value,
      this.input2.nativeElement.value,
      this.input3.nativeElement.value,
      this.input4.nativeElement.value,
      this.input5.nativeElement.value,
      this.input6.nativeElement.value
    ];
    const code = inputValues.join('');
    let modal = {
      username : this.data.username,
      code : code
    }
    this.RegsterAndLoginService.verfctionCode(modal).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
}
