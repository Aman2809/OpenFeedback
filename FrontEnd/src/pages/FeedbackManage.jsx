import React, { useState, useEffect } from 'react';
import { fetchAllFeedback, deleteFeedback } from '../services/AdminService'; 
import Navigation from '../components/Navigation';
import { Menu } from 'lucide-react';


const FeedbackManage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [filter, setFilter] = useState({ startDate: '', endDate: '', rating: '' });
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    fetchAllFeedback()
      .then((data) => {
        console.log(data);
        setFeedbacks(data);
        setFilteredFeedbacks(data);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
        alert('Failed to fetch feedbacks.');
      });
  }, []);

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this feedback?')) {
  //     deleteFeedback(id)
  //       .then(() => {
  //         setFeedbacks(feedbacks.filter(fb => fb.feedbackId !== id));
  //         setFilteredFeedbacks(filteredFeedbacks.filter(fb => fb.feedbackId !== id));
  //       })
  //       .catch((error) => {
  //         console.error('Error deleting feedback:', error);
  //         alert('Failed to delete feedback.');
  //       });
  //   }
  // };

  const computeAverageRating = (responses) => {
    if (responses.length === 0) return 'N/A';
    const total = responses.reduce((sum, res) => sum + res.emojiValue, 0);
    return (total / responses.length).toFixed(2);
  };

  const handleFilter = () => {
    let filtered = [...feedbacks];
    
    if (filter.startDate && filter.endDate) {
      filtered = filtered.filter(fb => {
        const feedbackDate = new Date(fb.createdAt);
        return feedbackDate >= new Date(filter.startDate) && feedbackDate <= new Date(filter.endDate);
      });
    }
    
    if (filter.rating) {
      filtered = filtered.filter(fb => {
        const avg = computeAverageRating(fb.responses);
        return avg !== 'N/A' && parseFloat(avg) >= parseFloat(filter.rating);
      });
    }
    
    setFilteredFeedbacks(filtered);
  };

  const handleReset = () => {
    setFilter({ startDate: '', endDate: '', rating: '' });
    setFilteredFeedbacks(feedbacks);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:hidden fixed top-0 left-0 p-4 z-50">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="text-gray-500 bg-white rounded-full p-2 shadow-md"
        >
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out z-30 md:relative md:flex`}
      >
        <div className="bg-white h-full w-64 shadow-lg overflow-y-auto md:shadow-none">
          <Navigation />
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          Feedback Management
        </h1>

        <div className="mb-6  flex flex-wrap gap-4">
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="number"
            placeholder="Average Rating (1-5)"
            value={filter.rating}
            onChange={(e) => setFilter({ ...filter, rating: e.target.value })}
            className="border p-2 rounded-md"
            min="1"
            max="5"
          />
          <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Filter
          </button>
          <button onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            Reset
          </button>
        </div>


        {/* Desktop Table View */}
        <style>
          {`
            @media (min-width: 768px) {
              .desktop-table {
                display: block !important;
              }
              .mobile-cards {
                display: none !important;
              }
            }
            @media (max-width: 767px) {
              .desktop-table {
                display: none !important;
              }
              .mobile-cards {
                display: block !important;
              }
            }
          `}
        </style>


       <div className="desktop-table overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="bg-[#009879] text-white">
              <tr>
                <th className="px-4 py-3">Feedback ID</th>
                <th className="px-4 py-3">Session ID</th>
                <th className="px-4 py-3">Submitted At</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Average Rating</th>
                <th className="px-4 py-3">Responses</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback, index) => (
                <tr key={feedback.feedbackId} className={`border-b ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-4 py-2">{feedback.feedbackId}</td>
                  <td className="px-4 py-2">{feedback.sessionId}</td>
                  <td className="px-4 py-2">{new Date(feedback.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2">Null</td>
                  <td className="px-4 py-2">{computeAverageRating(feedback.responses)}</td>
                  <td className="px-4 py-2">{feedback.responses.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="mobile-cards space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback.feedbackId} className="bg-white rounded-lg shadow-md p-4">
              <p><strong>Feedback ID:</strong> {feedback.feedbackId}</p>
              <p><strong>Session ID:</strong> {feedback.sessionId}</p>
              <p><strong>Submitted At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
              <p><strong>User:</strong> Null</p>
              <p><strong>Average Rating:</strong> {computeAverageRating(feedback.responses)}</p>
              <p><strong>Responses:</strong> {feedback.responses.length}</p>
            </div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <p className="text-center py-4">No feedbacks found.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackManage;

