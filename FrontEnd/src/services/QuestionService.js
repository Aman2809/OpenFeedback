import { myAxios } from "./axios";



// Fetch Active Questions
 export const fetchActiveQuestions=async()=>{
    try {
        const response = await  myAxios.get('/question/active');
        return response.data;
    } catch (error) {
        throw error;
    }
 };

 export const submitFeedback = async (feedback) => {
    // Implement API call for feedback submission
    try{
        const response = await myAxios.post('/feedback/create', feedback);
        return response.data;
    }catch(error){
        throw error;
    }
  };