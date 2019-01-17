package com.primesoft.certprep.ngquiz.services;


import com.primesoft.certprep.ngquiz.domain.Question;
import com.primesoft.certprep.ngquiz.reposotories.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizDao;

    @Transactional
    public List<Question> getQuizQuestions(int noOfQuestions){
        List<Question> questions = (List<Question>) quizDao.getQuizQuestions(noOfQuestions);
        List<Question> selectedQuestions = new ArrayList<Question>();
        Random random = new Random();
        while( selectedQuestions.size() < noOfQuestions ){
            int randN =  random.nextInt(questions.size());
            selectedQuestions.add(questions.remove(randN));
            System.out.println(selectedQuestions);
            System.out.println(questions);
        }

        return selectedQuestions;
    }
}
