import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<ConfirmDialogComponent>) { }
  numberOfQuestions = this.formBuilder.control('', Validators.required)
  ngOnInit() { 
  }

  sendNumberOfQuestions(){
    this.dialog.close(this.numberOfQuestions.value)
  }

}
