import {TestBed} from "@angular/core/testing";
import {QuestionsService} from "./questions.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Question} from '../questions/_models/Question.model'

describe('QuestionsService', () => {

  let service: QuestionsService,
    httpMock: HttpTestingController;

  const testQuestion: Question = {
    name: 'testName',
    answer: 'someAnsw'
  };

  const respSuccessDef = {
    success: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuestionsService
      ]
    }).compileComponents();

    service = TestBed.get(QuestionsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('allQuestion getter should invoke endpoint for loading all questions', done => {
    service.allQuestion.subscribe(res => {
      expect(res).toEqual([]);
      done();
    }, err => done.fail(err));

    const request = httpMock.expectOne('/api/questions');

    expect(request.request.method).toEqual('GET');

    request.flush([]);

    httpMock.verify();
  });

  it('addQuestion should send request to add question', done => {
    service.addQuestion(testQuestion).subscribe(res => {
      expect(res).toEqual(respSuccessDef);
      done();
    }, err => done.fail(err));

    const request = httpMock.expectOne('/api/questions');

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(testQuestion);

    request.flush(respSuccessDef);

    httpMock.verify();
  });

  it('deleteQuestion should send request to delete question', done => {
    service.deleteQuestion('/aaa').subscribe(res => {
      expect(res).toEqual(respSuccessDef);
      done();
    }, err => done.fail(err));

    const request = httpMock.expectOne('/api/aaa');

    expect(request.request.method).toEqual('DELETE');

    request.flush(respSuccessDef);

    httpMock.verify();
  });

  it('updateQuestion should send request to delete question', done => {
    service.updateQuestion(testQuestion, '/aa1').subscribe(res => {
      expect(res).toEqual(respSuccessDef);
      done();
    }, err => done.fail(err));

    const request = httpMock.expectOne('/api/aa1');

    expect(request.request.method).toEqual('PUT');
    expect(request.request.body).toEqual(testQuestion);

    request.flush(respSuccessDef);

    httpMock.verify();
  });

  it('should selected question', () => {

    expect(service.selectedItem).toBeUndefined();

    service.question = testQuestion;

    expect(service.selectedItem).toBe(testQuestion);
  });

  it('should get selected question', () => {
    expect(service.question).toBeUndefined();

    service.selectedItem = testQuestion;

    expect(service.question).toBe(testQuestion);
  })
});
