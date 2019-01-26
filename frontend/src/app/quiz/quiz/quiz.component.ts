import { Component, OnInit } from "@angular/core";
import { QuestionsService } from "../../_shared/questions.service";
import {Question} from "../../questions/_models/Question.model";

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
        // Creating queue of randomized questions

        for (let question of this.shuffle(response["_embedded"]["questions"])) {
          this.quiz.push({
            question: question,
            givenAnswer: null,
            correct: null
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  // Registers question answer
  checkQuestionAnswer(answer) {
    if (answer !== "" && answer !== null) {
      let questionResult = this.quiz[this.quizQuestionIndex];

      questionResult.givenAnswer = answer;

      questionResult.correct = questionResult.question.answer === answer;
    }
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

  // Randomizing the array - based on Math random
  private shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  get questionsInfo(): QuizStatistics {
    let stat: QuizStatistics = {
      answered: 0,
      correct: 0
    };

    for (let item of this.quiz) {
      if (item.givenAnswer !== null && item.givenAnswer !== "") {
        stat.answered++;
      }

      if (item.correct) {
        stat.correct++;
      }
    }

    return stat;
  }
}

class QuizItem {
  question: Question;
  givenAnswer: string;
  correct: any;
}

class QuizStatistics {
  answered: number;
  correct: number;
}
