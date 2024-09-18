import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, fetchAllFeedback, fetchActiveQuestions } from '../services/AdminService';
import Navigation from '../components/Navigation';

const Admin = () => {
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [recentFeedback, setRecentFeedback] = useState([]);

  useEffect(() => {
    // Fetch all questions
    fetchAllQuestions().then((data) => {
      setTotalQuestions(data.length);
    }).catch((error) => {
      console.error('Error fetching all questions:', error);
    });
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  useEffect(() => {
    // Fetch active questions
    fetchActiveQuestions()
      .then((data) => {
        setActiveQuestions(data.length);
      })
      .catch((error) => {
        console.error('Error fetching active questions:', error);
      });
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  useEffect(() => {
    // Fetch all feedback
    fetchAllFeedback().then((data) => {
      setTotalFeedback(data.length);
      setRecentFeedback(data.slice(0, 5)); // Show recent 5 feedback
    }).catch((error) => {
      console.error('Error fetching all feedback:', error);
    });
  }, []); // Empty dependency array ensures this runs only once after the component mounts


  return (
    <div className="flex min-h-screen">

      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 bg-gray-100">
        <h1 className='text-2xl font-bold mb-5'>Dashboard</h1>
        <div className='flex gap-8'>

          {/* Total Questions */}
          <div className="bg-black text-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Total Questions</h2>
            <p className="text-4xl font-bold">{totalQuestions}</p>
          </div>

          {/* Active Questions */}
          <div className="bg-green-200 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Active Questions</h2>
            <p className="text-4xl font-bold">{activeQuestions}</p>
          </div>

          {/* Total Feedback */}
          <div className="bg-blue-200 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Total Feedback</h2>
            <p className="text-4xl font-bold">{totalFeedback}</p>
          </div>
        </div>

        <div className='h-[55vh] bg-white'>
          <h1> This section is for 3 types of Graph </h1>
        </div>



      </div>

      <div>

      </div>
      {/* Recent Feedback */}
      <div className='bg-gray-100 h-screen p-6 w-[25vw]'>
        <div className=" mt-5 p-6">
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
