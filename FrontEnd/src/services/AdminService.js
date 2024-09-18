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
