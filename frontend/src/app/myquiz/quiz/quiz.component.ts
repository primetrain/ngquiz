import { Component, OnInit } from '@angular/core';
import * as $ from 'node_modules/jquery/dist/jquery.min';
import { QuizService } from '../_services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[]

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.quizService
    .getQuestions(parseInt(window.prompt("Number Of Questions ?")))
    .subscribe(
      res => {
        this.questions = res
      },
      err => {
        console.error(err)
      }
    )
  }
  
  nextHandler(event: HTMLElementEventMap) {
    this.handleAnimation(
                  event["target"]["parentElement"],
                  event["target"]["parentElement"]["nextElementSibling"],
                  "slideOutLeft", "slideInRight")
  }
  
  previousHandler(event : HTMLElementEventMap) {
    this.handleAnimation(
                event["target"]["parentElement"],
                event["target"]["parentElement"]["previousElementSibling"],
                "slideOutRight", "slideInLeft", false)
  }
  
  getResults () { 
    this.router.navigate(["/admin/"])
  }
  
  handleAnimation (current, next, currentclass, nextclass, forward = true) {
    $(current).addClass(currentclass)
    setTimeout(() => {
      $(current).hide()
      $(current).removeClass(currentclass)
      $(next).show()
      $(next).addClass(nextclass)
      setTimeout( () => {
        $(next).removeClass(nextclass)
        if(forward){
           $("#progressbar li").eq($("fieldset").index(next)).addClass("active");
        }else{
          $("#progressbar li").eq($("fieldset").index($(current))).removeClass("active")
        }
      }, 300)
    }, 200)
  }
}
