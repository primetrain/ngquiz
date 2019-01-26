import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../questions/_models/Question.model'

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  get allQuestion(): Observable<any> {
    return this.http.get('/api/questions')
  }

  selectedItem: Question;

  get question () {
    return this.selectedItem
  }

  set question (selectedItem: Question) {
     this.selectedItem = selectedItem
  }

  addQuestion(question: Question): Observable<any> {
    return this.http.post('/api/questions', question)
  }

  deleteQuestion(url: String) {
    return this.http.delete("/api" + url)
  }

  updateQuestion (question: Question, url: String) {
    return this.http.put("/api" + url, question)
  }

}
