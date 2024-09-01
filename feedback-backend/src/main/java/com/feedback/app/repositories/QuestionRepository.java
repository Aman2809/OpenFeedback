package com.feedback.app.repositories;

import com.feedback.app.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    // Custom query to fetch only active questions
    List<Question> findByIsActiveTrue();

}
