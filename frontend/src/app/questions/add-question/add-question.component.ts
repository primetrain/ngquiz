import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionsService } from '../../_shared/questions.service';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/_shared/dialog.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

export class AddQuestionComponent implements OnInit {

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private questionService: QuestionsService,
              private dialogService: DialogService
              ) {
                 this.isEdit = false;
                }
  
  question = this.fb.group({
    name: ['', Validators.required ],
    answer: ['', Validators.required]
  })
  editurl = ''
  isEdit = false;
  formSubmitted = false;

  ngOnInit() {
    console.log(this.isEdit)
    if(this.questionService.selectedItem){
      this.isEdit = true
      this.editurl = this.questionService.selectedItem._links.self.href.split("api")[1]
      this.question.patchValue(this.questionService.selectedItem)
      this.questionService.selectedItem = null
    }
  }

  addQuestion () {
    this.questionService
    .addQuestion(this.question.value)
    .subscribe(
      response => {
        this.handleNavigation()
      },
      error => {
        console.error(error)
      }
    )
  }


  handleNavigation () {
    this.formSubmitted = true
    this.router.navigate(['../../', 'questions'], { relativeTo: this.route})  
  }

  onSubmit() {
    this.isEdit = false
    return this.editurl == "" ? this.addQuestion() : this.editQuestion()
  }

  editQuestion () {
    this.questionService
    .updateQuestion(this.question.value, this.editurl)
    .subscribe(
      response => {
       this.handleNavigation()
      },
      error => {
        console.error(error)
      }
    )
  }

  canDeactivate (): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.route, this.router)
    if(this.question.dirty && !this.formSubmitted){
      return this.dialogService
      .saveDataConfirmation(["Are you sure you want leave ?", "Leaving this page removes all changes?"])
      .afterClosed()
    }
    return true
  }

 
}
