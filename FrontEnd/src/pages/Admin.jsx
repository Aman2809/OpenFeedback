import React, { useState, useEffect } from 'react';
import {
  fetchAllQuestions,
  fetchAllFeedback,
  fetchActiveQuestions,
  fetchRatingsForQuestion,
  fetchRatingPercentagesForQuestion,
} from '../services/AdminService';
import Navigation from '../components/Navigation';

const Admin = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [ratingsData, setRatingsData] = useState(null);
  const [percentagesData, setPercentagesData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    fetchAllQuestions().then((data) => {
      setTotalQuestions(data.length);
      setQuestions(data);
    }).catch((error) => {
      console.error('Error fetching all questions:', error);
    });
  }, []);

  useEffect(() => {
    fetchActiveQuestions()
      .then((data) => {
        setActiveQuestions(data.length);
      })
      .catch((error) => {
        console.error('Error fetching active questions:', error);
      });
  }, []);

  useEffect(() => {
    fetchAllFeedback().then((data) => {
      setTotalFeedback(data.length);
      setRecentFeedback(data.slice(0, 5));
    }).catch((error) => {
      console.error('Error fetching all feedback:', error);
    });
  }, []);

  useEffect(() => {
    if (selectedQuestionId) {
      const fetchRatings = async () => {
        try {
          const ratings = await fetchRatingsForQuestion(selectedQuestionId);
          const percentages = await fetchRatingPercentagesForQuestion(selectedQuestionId);
          setRatingsData(ratings);
          setPercentagesData(percentages);
        } catch (error) {
          console.error('Error fetching ratings for question:', error);
        }
      };

      fetchRatings();
    }
  }, [selectedQuestionId]);

  const handleQuestionClick = async (questionId) => {
    console.log("Selected Question ID:", questionId); // Log selected question ID
    setSelectedQuestionId(questionId);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBarStyle = (percentage) => {
    // Dynamically set the width of the bar based on the percentage
    return {
      width: `${percentage}%`,
      backgroundColor: percentage > 0 ? '#01875f' : '#e0e0e0', // Green if filled, grey if not
    };
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <div className="flex-1 flex flex-col p-6 bg-gray-100">
        <h1 className='text-2xl font-bold mb-5'>Dashboard</h1>
        <div className='flex gap-8'>
          <div className="bg-black text-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Total Questions</h2>
            <p className="text-4xl font-bold">{totalQuestions}</p>
          </div>
          <div className="bg-green-200 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Active Questions</h2>
            <p className="text-4xl font-bold">{activeQuestions}</p>
          </div>
          <div className="bg-blue-200 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Total Feedback</h2>
            <p className="text-4xl font-bold">{totalFeedback}</p>
          </div>
        </div>

        <div className='h-[55vh] '>
          <div>
            <h2 className='text-2xl p-3 font-semibold mb-1'>Select a Question to View Ratings</h2>
            <div className="relative">
              <button onClick={toggleDropdown} className="border rounded p-2 mx-5 bg-blue-500 text-white">
                {selectedQuestionId ? `Question ID: ${selectedQuestionId}` : "Select a Question"}
              </button>
              {dropdownOpen && (
                <ul className="absolute z-10 bg-white border rounded shadow-md w-full mt-1">
                  {questions.map(question => (
                    <li
                      key={question.questionId}
                      onClick={() => handleQuestionClick(question.questionId)}
                      className="cursor-pointer hover:bg-gray-200 p-2"
                    >
                      {question.questionText}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* <h2 className='mx-5 mt-2'>Ratings for Selected Question ID: {selectedQuestionId}</h2> */}

          {ratingsData && (
            <div className="mt-3 mx-4 flex">
              <div className="flex flex-col w-1/4"> {/* Left Side: Average Rating */}
                <div className="flex flex-col justify-center items-center">
                  <h3 className='text-5xl font-bold'>
                    {ratingsData.averageRating !== undefined
                      ? ratingsData.averageRating.toFixed(1)
                      : 'N/A'}
                  </h3>
                  <p className="text-lg">Average Rating</p>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                  <h3 className='text-3xl font-bold'>
                    {percentagesData?.total || 0}
                  </h3>
                  <p className="text-sm font-semibold">Total Responses</p>
                </div>
              </div>

              <div className="flex flex-col w-9/12 ml-4"> {/* Right Side: Percentage Breakdown */}
                {/* <h3 className='font-bold'>Total Ratings: {percentagesData?.total || 0}</h3> */}
                <div className="flex flex-col">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center mb-2">
                      <div className="flex items-center w-16">
                        <span className="font-semibold">{rating} Star</span>
                      </div>
                      <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={getBarStyle(percentagesData?.percentages[rating] || 0)} // Default to 0 if undefined
                        ></div>
                      </div>
                      <span className="ml-2">
                        {(percentagesData?.percentages[rating] || 0).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Recent Feedback */}
      <div className='bg-gray-100 h-screen p-6 w-[25vw]'>
        <div className="mt-5 p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Feedback</h2>
          <ul>
            {recentFeedback.map((feedback, index) => (
              <li key={index} className="mb-2">
                {feedback.comment || "No comment provided"} - {feedback.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
