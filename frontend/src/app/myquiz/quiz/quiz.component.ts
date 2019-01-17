import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery/dist/jquery.min';
import { QuizService } from '../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { of } from 'rxjs';


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
  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.getNumberOfQuestions("Number Of Questions ?")
  }

  getNumberOfQuestions(msg) {
    of(prompt(msg))
      .subscribe(
        value => {
          console.log(value)
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
        },
        error => {
          console.log(error)
        }
      )
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
            this.getNumberOfQuestions(err.error.message)
          }
        }
      )
  }

  nextHandler(event: HTMLElementEventMap) {
    this.handleAnimation(
      event["target"]["parentElement"],
      event["target"]["parentElement"]["nextElementSibling"],
      "slideOutLeft", "slideInRight")
  }

  previousHandler(event: HTMLElementEventMap) {
    this.handleAnimation(
      event["target"]["parentElement"],
      event["target"]["parentElement"]["previousElementSibling"],
      "slideOutRight", "slideInLeft", false)
  }

  getResults() {
    let answers = this.quizForm.value.answers
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer.toLowerCase().trim() == this.questions[index]["answer"]) correct++
    })
    this.answers.controls = []
    console.log(this.answers)
    of(confirm(`Your quiz results are below: \nTotal Questions: ${this.questions.length}\n Correctly Answered: ${correct}\n Do you want to play again?`))
      .subscribe(value => {
        if (value) {
          this.getNumberOfQuestions("Number Of Questions ?")
        } else {
          this.router.navigate(["/admin/questions"])
        }
      }, error => {
        console.log(error)
      })

  }

  handleAnimation(current, next, currentclass, nextclass, forward = true) {
    $(current).addClass(currentclass)
    setTimeout(() => {
      $(current).hide()
      $(current).removeClass(currentclass)
      $(next).show()
      $(next).addClass(nextclass)
      setTimeout(() => {
        $(next).removeClass(nextclass)
        if (forward) {
          $("#progressbar li").eq($("fieldset").index(next)).addClass("active");
        } else {
          $("#progressbar li").eq($("fieldset").index($(current))).removeClass("active")
        }
      }, 300)
    }, 200)
  }
}
