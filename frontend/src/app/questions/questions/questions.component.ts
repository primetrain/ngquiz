import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../_shared/questions.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DialogService } from 'src/app/_shared/dialog.service';
import {Question} from "../_models/Question.model";

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

  constructor(private questionsService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService) { }

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
    this.dialogService
    .confirmDelete(question)
    .afterClosed()
    .subscribe(decision => {
          if(decision){
            this.questionsService
            .deleteQuestion(question._links.self.href.split("api")[1])
            .subscribe(response => {
              console.log(response);
              this.ngOnInit()
            }, error => {
              console.error(error)
            })
          }
    })
  }

  editQuestion (question: Question) {
    this.questionsService.selectedItem = question;
    this.router.navigate(['..', 'question', 'edit'],{relativeTo: this.route })
  }

  // returns question by the search on the question and answer
  searchQuestionsWithText(search: string){
  //  console.log(search)
    this.filteredQuestions = [...this.questions.filter(val => val.name.indexOf(search) > -1 || val.answer.indexOf(search) > -1)];
  }

  startQuiz(){
    this.dialogService
    .getNumberOfQuestion()
    .afterClosed()
    .subscribe(response =>{
      if(response){
        let navigationExtras: NavigationExtras = {
          queryParams: { 'numberOfQuestions': response }
        }
        this.router.navigate(["/myquiz"], navigationExtras)
      }
    }, error => {
      console.log(error)
    })
  }

}
