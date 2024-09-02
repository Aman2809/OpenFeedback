package com.feedback.app.controllers;

import com.feedback.app.entities.Question;
import com.feedback.app.payloads.ApiResponse;
import com.feedback.app.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/question")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // POST --> Create Questions
    @PostMapping("/create")
    public ResponseEntity<Question> createQuestions(@Valid @RequestBody Question question) {

        Question createdQuestion = questionService.saveQuestion(question);
        return new ResponseEntity<Question>(createdQuestion , HttpStatus.OK);
    }

    // PUT --> Update Questions
    @PutMapping("/update/{questionId}")
    public ResponseEntity<Question> updateQuestion(@Valid @RequestBody Question question ,@PathVariable Long questionId) {
        Question updatedQuestion = questionService.updateQuestion(question, questionId);
        return new ResponseEntity<Question>(updatedQuestion , HttpStatus.OK);
    }

    // GET --> GetById
    @GetMapping("{questionId}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long questionId) {
        Question question = questionService.getQuestionById(questionId);
        return new ResponseEntity<Question>(question, HttpStatus.OK);
    }

    // GET --> GetAll
    @GetMapping("/")
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<List<Question>>(questions , HttpStatus.OK);
    }

    // GET --> Get only active questions
    @GetMapping("/active")
    public ResponseEntity<List<Question>> getActiveQuestions() {
        List<Question> activeQuestions = questionService.getActiveQuestions();
        return new ResponseEntity<>(activeQuestions, HttpStatus.OK);
    }

    // PUT --> Toggle isActive status
    @PutMapping("/toggle/{questionId}")
    public ResponseEntity<Question> toggleQuestionActive(@PathVariable Long questionId) {
        Question toggledQuestion = questionService.toggleQuestionActive(questionId);
        return new ResponseEntity<>(toggledQuestion, HttpStatus.OK);
    }

    // DELETE --> Delete the questions
    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<ApiResponse> deleteQuestion(@PathVariable Long questionId) {
         questionService.deleteQuestion(questionId);

        ApiResponse response = new ApiResponse();
        response.setMessage("Question Deleted Successfully");
        response.setSuccess(true); // Set to true since the delete operation was successful

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
