import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuestions(noOfQuestions: Number): Observable<Question[]>  {
    const params = new HttpParams().set("noOfQuestions", ""+noOfQuestions)
    return this.http.get<Question[]>("/api/quiz/questions", { params })
  }

}
