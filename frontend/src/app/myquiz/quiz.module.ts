import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './_services/quiz.service';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuizRoutingModule
  ],
  providers: [QuizService]
})
export class QuizModule { }
