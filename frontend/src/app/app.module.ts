import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuestionsService } from './_shared/questions.service';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RootComponent } from './root/root.component';
import { LoginService } from './_shared/login.service';
import { MaterialModule } from './/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './_shared/confirm-dialog/confirm-dialog.component';
import { ResultDialogComponent } from './_shared/result-dialog/result-dialog.component';
import { ConfirmDeleteComponent } from './_shared/confirm-delete/confirm-delete.component';
import { CustomDialogComponent } from './_shared/custom-dialog/custom-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    ConfirmDialogComponent,
    ResultDialogComponent,
    ConfirmDeleteComponent,
    CustomDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    QuestionsService,
    LoginService
  ],
  bootstrap: [RootComponent],
  entryComponents: [ConfirmDialogComponent, ResultDialogComponent, ConfirmDeleteComponent, CustomDialogComponent]
})
export class AppModule {}
