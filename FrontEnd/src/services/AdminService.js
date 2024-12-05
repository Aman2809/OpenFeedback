import { myAxios } from "./axios";

// Create Question
export const createQuestion = async (questionData) => {
  try {
    const response = await myAxios.post('/question/create', questionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch All Questions
export const fetchAllQuestions = async () => {
  try {
    const response = await myAxios.get('/question/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Active Questions
export const fetchActiveQuestions = async () => {
    try {
      const response = await myAxios.get('/question/active');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Fetch All Feedback
export const fetchAllFeedback = async () => {
  try {
    const response = await myAxios.get('/feedback/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Question
export const updateQuestion = async (questionId, updatedQuestionData) => {
  try {
    const response = await myAxios.put(`/question/update/${questionId}`, updatedQuestionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Question
export const deleteQuestion = async (questionId) => {
  try {
    const response = await myAxios.delete(`/question/delete/${questionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Toggle Question Active Status
export const toggleQuestionStatus = async (questionId) => {
  try {
    const response = await myAxios.put(`/question/toggle/${questionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Fetch Feedback by ID
export const fetchFeedbackById = async (feedbackId) => {
  try {
    const response = await myAxios.get(`/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch Feedback by Session ID
export const fetchFeedbackBySessionId = async (sessionId) => {
  try {
    const response = await myAxios.get(`/feedback/session/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Feedback
export const deleteFeedback = async (feedbackId) => {
  try {
    const response = await myAxios.delete(`/feedback/delete/${feedbackId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Fetch Ratings for a Specific Question
export const fetchRatingsForQuestion = async (questionId) => {
  try {
    const response = await myAxios.get(`/feedback/question/${questionId}/ratings`);
    // console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings for question:", error);
    throw error;
  }
};



export const fetchRatingPercentagesForQuestion = async (questionId) => {
  try {
    const response = await myAxios.get(`/feedback/ratings/${questionId}/percentages`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsersByRatingForQuestion = async (questionId, rating) => {
  try {
    const response = await myAxios.get(`/feedback/question/${questionId}/users/rating/${rating}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};





