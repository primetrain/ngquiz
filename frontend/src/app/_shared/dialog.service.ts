import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';
import {Question} from "../questions/_models/Question.model";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  getNumberOfQuestion(){
    return this.dialog.open(ConfirmDialogComponent, {
      width: '40%',
      height: '40%',
      position: { top: "10%" }
    })
  }

  showResults(results: any){
    return this.dialog.open(ResultDialogComponent, {
      width: '25%',
      height: '33%',
      position: { top: '10%' },
      data: results
    })
  }

  confirmDelete(data: Question){
    return this.dialog.open(ConfirmDeleteComponent, {
      width: '25%',
      height: '33%',
      position: { top: '10%' },
      data
    })
  }

  saveDataConfirmation(data){
    return this.dialog.open(CustomDialogComponent, {
      width: '25%',
      height: '25%',
      position: { top: '18%' },
      data
    })
  }

}
