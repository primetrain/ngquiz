import { Component, OnInit } from '@angular/core';
import { QuizService } from '../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { of } from 'rxjs';
import { DialogService } from 'src/app/_shared/dialog.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[]

  quizForm = this.fb.group({
    answers: this.fb.array([])
  })

  get answers() {
    return this.quizForm.get('answers') as FormArray;
  }

  addAnswersFields(number) {
    while (number > 0) {
      this.answers.push(this.fb.control(''))
      number--;
    }
  }
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialogService: DialogService) { }

  ngOnInit() {
    console.log(this.route)
    this.route
    .queryParams
    .subscribe(response => {
      if(response){
        this.getNumberOfQuestions(response["numberOfQuestions"])
      }
    })
  }

  showDialog(){
    this.dialogService
    .getNumberOfQuestion()
    .afterClosed()
    .subscribe(response => {
      if(response){
        this.getNumberOfQuestions(response)
      }
    })
  }

  getNumberOfQuestions(value) {
    if (value === null) {
      this.router.navigate(['/admin/questions'])
      return;
    }
    try {
      if (isNaN(parseInt(value))) {
        throw "Enter Valid Number"
      }
      this.getData(parseInt(value))
    } catch (exception) {
      of(alert(exception)).subscribe(res => {
        this.router.navigate(["/admin/questions"])
      }, err => {
        console.log(err)
      })
    }
  }

  getData(noOfQuestions: Number) {
    this.quizService
      .getQuestions(noOfQuestions)
      .subscribe(
        res => {
          this.questions = res
          this.addAnswersFields(res.length)
        },
        err => {
          if (err.status == 500) {
            this.showDialog()
          }
        }
      )
  }

  getResults() {
    let answers = this.quizForm.value.answers
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer.toLowerCase().trim() == this.questions[index]["answer"]) correct++
    })
    this.answers.controls = []
    // console.log(this.answers)
    this.dialogService
    .showResults({ total: this.questions.length, correct: correct })
    .afterClosed()
      .subscribe(value => {
        if (value) {
          this.showDialog()
        } else {
          this.router.navigate(["/admin/questions"])
        }
      }, error => {
        console.log(error)
      })

  }
}
