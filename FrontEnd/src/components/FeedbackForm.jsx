import React, { useState, useEffect } from 'react';
import { myAxios } from '../services/axios';
import Angry from '../assets/emojis/Angry.svg';
import Sad from '../assets/emojis/Sad.svg';
import Neutral from '../assets/emojis/Neutral.svg';
import Happy from '../assets/emojis/Happy.svg';
import VeryHappy from '../assets/emojis/VeryHappy.svg';


const emojis = [
  { src: Angry, alt: 'Very Bad' },
  { src: Sad, alt: 'Bad' },
  { src: Neutral, alt: 'Neutral' },
  { src: Happy, alt: 'Good' },
  { src: VeryHappy, alt: 'Very Good' },
];



function FeedbackForm() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchActiveQuestions();
  }, []);

  const fetchActiveQuestions = async () => {
    try {
      const response = await myAxios.get('/question/active');
      setQuestions(response.data);
      const initialResponses = response.data.reduce((acc, question) => {
        acc[question.questionId] = null;
        return acc;
      }, {});
      setResponses(initialResponses);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleEmojiClick = (questionId, rating) => {
    setResponses(prev => ({ ...prev, [questionId]: rating }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting responses:', responses);
    // Implement the API call to submit feedback
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      {questions.map((question) => (
        <div key={question.questionId} className="mb-6">
          <p className="text-lg font-semibold mb-2">{question.questionText}</p>
          <div className="flex justify-between items-center">
            {emojis.map((emoji, index) => (
              <button
                key={`${question.questionId}-${index}`}
                type="button"
                onClick={() => handleEmojiClick(question.questionId, index + 1)}
              className={`focus:outline-none transition-transform duration-100 
                ${responses[question.questionId] === index + 1
                  ? 'transform scale-125 bg-blue-500 border-4 border-blue-500 rounded-full'
                  : 'hover:transform hover:scale-110'
                }`}
              >
                <img
                  src={emoji.src}
                  alt={emoji.alt}
                  className="w-9 h-9" // You can adjust size based on your design
                />
              </button>
            ))}
          </div>
        </div>
      ))}
      <button 
        type="submit" 
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Feedback
      </button>
    </form>
  );
}


export default FeedbackForm;