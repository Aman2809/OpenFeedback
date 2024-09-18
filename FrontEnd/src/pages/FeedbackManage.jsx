import React, { useState, useEffect } from 'react';
import { fetchAllFeedback, deleteFeedback } from '../services/AdminService'; 
import Navigation from '../components/Navigation';

const FeedbackManage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filter, setFilter] = useState({ date: '', rating: '', question: '' });

  useEffect(() => {
    // Fetch all feedback on component mount
    fetchAllFeedback().then((data) => {
        console.log(data)
      setFeedbacks(data);
      setFilteredFeedbacks(data);
    });
  }, []);

  // Delete Feedback
  const handleDelete = (id) => {
    deleteFeedback(id).then(() => {
      setFeedbacks(feedbacks.filter(fb => fb.feedbackId !== id));
      setFilteredFeedbacks(filteredFeedbacks.filter(fb => fb.feedbackId !== id));
    });
  };

  // Filter feedback
  const handleFilter = () => {
    let filtered = [...feedbacks];
    if (filter.date) {
      filtered = filtered.filter(fb => new Date(fb.dateSubmitted).toLocaleDateString() === new Date(filter.date).toLocaleDateString());
    }
    if (filter.rating) {
      filtered = filtered.filter(fb => fb.emojiRating === parseInt(filter.rating));
    }
    if (filter.question) {
      filtered = filtered.filter(fb => fb.questionText.toLowerCase().includes(filter.question.toLowerCase()));
    }
    setFilteredFeedbacks(filtered);
  };

  return (
    <div className="flex">
      <Navigation />
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Feedback Management</h1>

        {/* Filter Options */}
        <div className="mb-6 flex space-x-4">
          <input
            type="date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={filter.rating}
            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Question Text"
            value={filter.question}
            onChange={(e) => setFilter({ ...filter, question: e.target.value })}
            className="border p-2 rounded-md"
          />
          <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Filter
          </button>
        </div>

        {/* Feedback List */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Date Submitted</th>
              <th className="px-4 py-2">Question Text</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback.feedbackId}>
                <td className="border px-4 py-2">{new Date(feedback.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{feedback.questionText}</td>
                <td className="border px-4 py-2">{feedback.emojiRating}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(feedback.feedbackId)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                  {/* Additional actions like viewing feedback details can go here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackManage;
