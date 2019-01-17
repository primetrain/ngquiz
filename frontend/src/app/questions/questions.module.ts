import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddQuestionComponent } from './add-question/add-question.component';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionsRoutingModule
  ],
  declarations: [QuestionsComponent, AddQuestionComponent],
  providers: []
})
export class QuestionsModule { }
