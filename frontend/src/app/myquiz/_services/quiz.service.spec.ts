import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {QuizService} from "./quiz.service";
import {HttpParams} from "@angular/common/http";
import {Question} from "../../questions/_models/Question.model";

describe('QuizService', () => {

  let service: QuizService,
    httpMock: HttpTestingController;

  const testQuestions: Question[] = [
    {
      name: 'testName',
      answer: 'someAnsw'
    },
    {
      name: 'testName1',
      answer: 'someAnsw1'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuizService
      ]
    }).compileComponents();

    service = TestBed.get(QuizService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('getQuestions should invoke endpoint for loading questions with some amount', done => {
    service.getQuestions(2).subscribe(res => {
      expect(res).toEqual(testQuestions);
      done();
    }, err => done.fail(err));

    const request = httpMock.expectOne('/api/quiz/questions?noOfQuestions=2');

    expect(request.request.method).toEqual('GET');

    request.flush(testQuestions);

    httpMock.verify();
  });
});
