package com.feedback.app.repositories;

import com.feedback.app.entities.FeedbackResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackResponseRepository extends JpaRepository<FeedbackResponse,Long> {

}
