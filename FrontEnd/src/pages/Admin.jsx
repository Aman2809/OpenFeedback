import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, fetchAllFeedback } from '../services/AdminService'; // Assuming you have services to fetch data
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
      const activeQuestions = data.filter((q) => q.isActive).length;
      setActiveQuestions(activeQuestions);
    });

    // Fetch all feedback
    fetchAllFeedback().then((data) => {
      setTotalFeedback(data.length);
      setRecentFeedback(data.slice(0, 5)); // Show recent 5 feedback
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 p-6">
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

        {/* Recent Feedback */}
        <div className="bg-gray-200 shadow-md rounded-lg p-6">
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
