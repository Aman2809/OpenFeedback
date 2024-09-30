package com.feedback.app.repositories;

import com.feedback.app.entities.FeedbackResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackResponseRepository extends JpaRepository<FeedbackResponse,Long> {

    // Fetch all feedback responses for a specific question
    @Query("SELECT fr FROM FeedbackResponse fr WHERE fr.question.questionId = :questionId")
    List<FeedbackResponse> findByQuestionId(@Param("questionId") Long questionId);
}
