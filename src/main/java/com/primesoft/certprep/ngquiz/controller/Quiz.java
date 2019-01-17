package com.primesoft.certprep.ngquiz.controller;


import com.primesoft.certprep.ngquiz.domain.Question;
import com.primesoft.certprep.ngquiz.services.QuizService;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class Quiz {

    @Autowired
    private QuizService quizService;


    @GetMapping("/questions")
    public List<Question> getRandomQuestions(@RequestParam("noOfQuestions") int noOfQuestions){
        return quizService.getQuizQuestions(noOfQuestions);
    }

}
