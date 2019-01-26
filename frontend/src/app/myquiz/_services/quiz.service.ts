import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from "../../questions/_models/Question.model";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuestions(noOfQuestions: number): Observable<Question[]>  {
    const params = new HttpParams().set('noOfQuestions', '' + noOfQuestions);;
    return this.http.get<Question[]>('/api/quiz/questions', {params});
  }

}
