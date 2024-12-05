import React, { useState, useEffect } from 'react';
import {
  fetchAllQuestions,
  fetchAllFeedback,
  fetchActiveQuestions,
  fetchRatingsForQuestion,
  fetchRatingPercentagesForQuestion,
  fetchUsersByRatingForQuestion
} from '../services/AdminService';
import Navigation from '../components/Navigation';
import { Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [ratingsData, setRatingsData] = useState(null);
  const [percentagesData, setPercentagesData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleQuestionClick = (questionId) => {
    setSelectedQuestionId(questionId);
    console.log("Selected Question: ",questionId)
    setDropdownOpen(false);
  };


  // const handleRatingClick=(e,rating)=>{
  //   e.preventDefault();
  //   console.log("clicked rating: ",rating);
  // };
  

  const handleRatingClick = async (e, rating) => {
    e.preventDefault();
    // console.log("questionId is : ",selectedQuestionId)
    if (!selectedQuestionId) {
      console.error("No question selected!");
      return;
    }
    navigate(`/userrating?questionId=${selectedQuestionId}&rating=${rating}`);

  
    // try {
    //   const users = await fetchUsersByRatingForQuestion(selectedQuestionId, rating);
    //   console.log("Users with rating:", rating, users);

    //   // Handle users data (e.g., update state, show in modal, etc.)
    // } catch (error) {
    //   console.error("Error fetching users by rating:", error);
    // }
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBarStyle = (percentage) => {
    return {
      width: `${percentage}%`,
      backgroundColor: percentage > 0 ? '#01875f' : '#e0e0e0',
    };
  };

  return (
    <div className="flex">
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden fixed top-0 left-0 p-4 z-50">
        <button onClick={() => setIsNavOpen(!isNavOpen)} className="text-gray-500 bg-white rounded-full p-2 shadow-md">
          <Menu size={24} />
        </button>
      </div>

      {/* Sliding Navigation for mobile */}
      <div className={`fixed inset-y-0 left-0 transform ${isNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30 md:relative md:flex`}>
        <div className="bg-white h-full w-64 shadow-lg overflow-y-auto md:shadow-none">
          <Navigation />
        </div>
      </div>

      {/* Main content */}
      <div className=" flex-1 p-4 bg-gray-100">
        <h1 className='text-2xl text-center sm:text-left font-bold mb-5'>Dashboard</h1>
        <div className='md:flex flex-col md:flex-row md:justify-around gap-8'>
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

        {/* Ratings and Recent Feedback */}
        <div className='h-[55vh] '>
          <div>
            <h2 className='text-2xl p-3 font-semibold mb-1'>Select a Question to View Ratings</h2>
            <div className="relative">
              <button onClick={toggleDropdown} className="border rounded p-2 mx-5 bg-blue-500 text-white">
                {selectedQuestionId ? `Change Question` : "Select a Question"}
              </button>
              {dropdownOpen && (
                <ul className="absolute z-10 bg-white border rounded overflow-y-auto max-h-60 shadow-md w-full mt-1">
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

          {ratingsData && (
            <div className="mt-3 mx-4 flex md:max-w-[700px]">
              <div className="flex flex-col w-1/4">
                <div className="flex flex-col justify-center items-center">
                  <h3 className='text-5xl font-bold'>
                    {ratingsData.averageRating !== undefined
                      ? ratingsData.averageRating.toFixed(1)
                      : 'N/A'}
                  </h3>
                  <p className=" text-sm text-nowrap md:text-lg">Average Rating</p>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                  <h3 className='text-3xl font-bold'>
                    {percentagesData?.total || 0}
                  </h3>
                  <p className="  text-xs md:text-sm text-nowrap font-semibold">Total Responses</p>
                </div>
              </div>
              <div className="flex flex-col w-9/12 ml-4">
                <div className="flex flex-col">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center mb-2">
                      <div className="flex items-center w-16">
                        {/* <span className="font-semibold">{rating} Star</span> */}
                        <a href="/userrating" onClick={(e)=>handleRatingClick(e,rating)}><span className="font-semibold">{rating} Star</span></a>
                      </div>
                      <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={getBarStyle(percentagesData?.percentages[rating] || 0)}
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

{/* Desktop Table View */}
<style>
          {`
            @media (min-width: 768px) {
              .desktop-table {
                display: block !important;
              }
            }
            @media (max-width: 767px) {
              .desktop-table {
                display: none !important;
              }
            }
          `}
        </style>


      {/* Recent Feedback Section */}
      <div className='bg-gray-100 screen p-6 w-[25vw] desktop-table overflow-y-auto'>
        <div className="mt-5 p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Feedback</h2>
          <ul>
            {recentFeedback.map((feedback, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <p className="font-semibold">{feedback.user || "No User Data Available!"}</p>
                <p className="text-sm text-gray-500">{new Date(feedback.createdAt).toLocaleString()}</p>
                {/* <p>{feedback.comment || "No comment provided"}</p> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;
