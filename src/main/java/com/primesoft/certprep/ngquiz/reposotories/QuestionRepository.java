package com.primesoft.certprep.ngquiz.reposotories;

import com.primesoft.certprep.ngquiz.domain.Question;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "questions", path = "questions")
public interface QuestionRepository extends PagingAndSortingRepository<Question, Long> {
}
