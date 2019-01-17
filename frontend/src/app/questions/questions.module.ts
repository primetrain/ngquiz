import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { QuestionsRoutingModule } from "./questions-routing.module";
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionsService } from "../_shared/questions.service";
import { AddQuestionComponent } from "./add-question/add-question.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuestionsRoutingModule
  ],
  declarations: [QuestionsComponent, AddQuestionComponent],
  providers: [QuestionsService]
})
export class QuestionsModule {}
