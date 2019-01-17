import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuizRoutingModule
  ],
  declarations: [QuizComponent],
  providers: []
})
export class QuizModule { }
