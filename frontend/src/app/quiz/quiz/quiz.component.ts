import { Component, OnInit } from "@angular/core";
import { QuestionsService } from "../../_shared/questions.service";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  quiz: QuizItem[] = [];
  quizQuestionIndex: number = 0;
  showResults: boolean = false;
  constructor(private questionsService: QuestionsService) {}
  ngOnInit() {
    this.questionsService.allQuestion.subscribe(
      response => {
        // TBD: Creating queue of randomized questions
        console.log(response);
        for (let question of response["_embedded"]["questions"]) {
          this.quiz.push({
            question: question
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  // Goes to next question
  toNextQuestion() {
    if (!(this.quizQuestionIndex + 1 > this.quiz.length - 1)) {
      this.quizQuestionIndex++;
    }
  }
  // Goes to previous question
  toPreviousQuestion() {
    if (!(this.quizQuestionIndex - 1 < 0)) {
      this.quizQuestionIndex--;
    }
  }
}

class QuizItem {
  question: Question;
}
