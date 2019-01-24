import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    MatDialogModule
    ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
