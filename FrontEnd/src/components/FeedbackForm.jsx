import React, { useState, useEffect } from 'react';
import { fetchActiveQuestions, submitFeedback } from '../services/QuestionService';
import Angry from '../assets/emojis/Angry.svg';
import Sad from '../assets/emojis/Sad.svg';
import Neutral from '../assets/emojis/Neutral.svg';
import Happy from '../assets/emojis/Happy.svg';
import VeryHappy from '../assets/emojis/VeryHappy.svg';
import Feedback from '../assets/Feedback.svg';  // Replace with your animated image

// Emoji sources
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
  const [isDialogVisible, setIsDialogVisible] = useState(false); // New state for dialog visibility

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await fetchActiveQuestions();
      setQuestions(data);
      const initialResponses = data.reduce((acc, question) => {
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

    const feedback = {
      responses: Object.entries(responses).map(([questionId, emojiValue]) => ({
        question: { questionId: parseInt(questionId, 10) },
        emojiValue,
      })),
    };

    try {
      await submitFeedback(feedback);
      console.log('Feedback submitted successfully');

      // Reset form by clearing the responses state
      const initialResponses = questions.reduce((acc, question) => {
        acc[question.questionId] = null;
        return acc;
      }, {});
      setResponses(initialResponses);

      // Show success dialog
      setIsDialogVisible(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-full sm:max-w-2xl mx-auto p-4">
        {questions.map((question) => (
          <div key={question.questionId} className="mb-6">
            <p className="text-md sm:text-lg font-semibold mb-2">{question.questionText}</p>
            <div className="flex justify-between items-center" style={{ minHeight: '70px' }}>
              {emojis.map((emoji, index) => (
                <button
                  key={`${question.questionId}-${index}`}
                  type="button"
                  onClick={() => handleEmojiClick(question.questionId, index + 1)}
                  className={`focus:outline-none transition-transform duration-100
                    ${responses[question.questionId] === index + 1
                      ? 'bg-blue-500 transform scale-125 border-[5px] border-blue-500 rounded-full'
                      : 'bg-gray-300 hover:transform hover:scale-110 border-[5px] border-gray-300 rounded-full'}`}
                  style={{ minHeight: '48px', minWidth: '48px' }}
                >
                  <img src={emoji.src} alt={emoji.alt} className="w-9 h-9" />
                </button>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          Submit Feedback
        </button>
      </form>

      {/* Dialog Box */}
      {isDialogVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm md:max-w-md mx-auto text-center">
            {/* Animated Image */}
            <img src={Feedback} alt="Success" className=" w-[30rem] h-[17rem] mx-auto mb-4" />

            {/* Heading */}
            <h2 className="text-2xl font-sans font-bold mb-2">Thanks for your feedback!</h2>

            {/* Paragraph */}
            <p className="font-semibold mb-6">By making your voice heard, you make us improve QuarksBytes</p>

            {/* Button to close the dialog */}
            <button
              onClick={handleCloseDialog}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackForm;
