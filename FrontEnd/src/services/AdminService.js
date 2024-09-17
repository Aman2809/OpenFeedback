import { myAxios } from "./axios";



// Fetch All Questions
 export const fetchAllQuestions=async()=>{
    try {
        const response = await  myAxios.get('/question/');
        return response.data;
    } catch (error) {
        throw error;
    }
 };

 // Fetch All Feedback
 export const fetchAllFeedback=async()=>{
    try {
        const response = await  myAxios.get('/feedback/');
        return response.data;
    } catch (error) {
        throw error;
    }
 };