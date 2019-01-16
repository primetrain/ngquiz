import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionsService } from '../_shared/questions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder,
               private questionService: QuestionsService) { }
  
  question = this.fb.group({
    name: ['', Validators.required ],
    answer: ['', Validators.required]
  })
  editurl = ''
  formSubmitted = false;

  ngOnInit() {
    if(this.questionService.selectedItem){
      this.question.patchValue(this.questionService.selectedItem)
      this.editurl = this.questionService.selectedItem._links.self.href.split("api")[1]
      this.questionService.selectedItem = null
    }
  }

  addQuestion () {
    this.questionService
    .addQuestion(this.question.value)
    .subscribe(
      response => {
        this.formSubmitted = true
        this.router.navigate(['../'], { relativeTo: this.route})

      },
      error => {
        console.error(error)
      }
    )
  }

  onSubmit() {
    console.log(this.editurl)
    return this.editurl == "" ? this.addQuestion() : this.editQuestion()
  }

  editQuestion () {
    this.questionService
    .updateQuestion(this.question.value, this.editurl)
    .subscribe(
      response => {
        this.formSubmitted = true
        this.router.navigate(['../'], { relativeTo: this.route})
      },
      error => {
        console.error(error)
      }
    )
  }

  canDeactivate (): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.route, this.router)
    if(this.question.dirty && !this.formSubmitted){
      return confirm("Are you sure you want leave ?\nLeaving this page removes all changes?")
    }
    return true
  }

 
}
