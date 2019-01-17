package com.primesoft.certprep.ngquiz.reposotories;


import com.primesoft.certprep.ngquiz.domain.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuizRepository {

    @Autowired
    private QuestionRepository questionRepository;

    public Iterable<Question>  getQuizQuestions (int noOfQuestions) {

        return questionRepository.findAll();
    }

}
