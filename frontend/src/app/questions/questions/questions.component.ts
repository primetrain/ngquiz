import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../_shared/questions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  // Original list of questions
  questions: Question[];

  // Filtered questions
  filteredQuestions: Question[];

  constructor(private questionsService: QuestionsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.questionsService
    .allQuestion
    .subscribe(
      response => {
        this.questions = response["_embedded"]["questions"];
        this.filteredQuestions = [...this.questions];
      },
      error => {
        console.error(error)
      }
    )
  }

  addQuestion () {
    this.router.navigate(['..', 'question', 'add'], { relativeTo: this.route})
  }

  deleteQuestion (question: Question ) {
    if(confirm(`Are you sure you want to delete the following entry? \n Question: ${question.name} \n Answer: ${question.answer }`)){
      this.questionsService
      .deleteQuestion(question._links.self.href.split("api")[1])
      .subscribe(response => {
        console.log(response);
        this.ngOnInit()
      }, error => {
        console.error(error)
      })
    }
  }

  editQuestion (question: Question) {
    this.questionsService.selectedItem = question;
    this.router.navigate(['..', 'question', 'edit'],{relativeTo: this.route })
  }

  // returns question by the search on the question and answer
  searchQuestionsWithText(search: string){
    this.filteredQuestions = [...this.questions.filter(val => val.name.indexOf(search) > -1 || val.answer.indexOf(search) > -1)];
  }

}
