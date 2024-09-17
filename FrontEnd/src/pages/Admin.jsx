import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, fetchAllFeedback } from '../services/AdminService'; // Assuming you have services to fetch data

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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Total Questions */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Questions</h2>
          <p className="text-4xl font-bold">{totalQuestions}</p>
        </div>

        {/* Active Questions */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Active Questions</h2>
          <p className="text-4xl font-bold">{activeQuestions}</p>
        </div>

        {/* Total Feedback */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Feedback</h2>
          <p className="text-4xl font-bold">{totalFeedback}</p>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Feedback</h2>
          <ul className="text-sm">
            {recentFeedback.length > 0 ? (
              recentFeedback.map((feedback, index) => (
                <li key={index} className="border-b py-2">
                  <span className="font-bold">User {feedback.userId}:</span> {feedback.comment}
                </li>
              ))
            ) : (
              <p>No recent feedback available.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Additional Admin functionalities (Question management, feedback review) */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Questions</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Create New Question
        </button>
      </div>
    </div>
  );
};

export default Admin;
