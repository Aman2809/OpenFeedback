import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, createQuestion, updateQuestion, deleteQuestion, toggleQuestionStatus } from '../services/AdminService'; 
import Navigation from '../components/Navigation';

const QuestionManage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null); // To track if a question is being edited

  // Fetch all questions on component mount
  useEffect(() => {
    fetchAllQuestions().then((data) => {
      setQuestions(data);
    }).catch((error) => {
      console.error('Error fetching questions:', error);
    });
  }, []);

  // Handle Create or Update Question
  const handleSaveQuestion = () => {
    if (editingQuestion) {
      // Use updateQuestion from AdminService to update the question
      updateQuestion(editingQuestion.questionId, { questionText: newQuestion, active: isActive }).then(() => {
        // Update the questions list with the modified question
        setQuestions(questions.map(q => 
          q.questionId === editingQuestion.questionId 
            ? { ...q, questionText: newQuestion, active: isActive } 
            : q
        ));
        // Reset form and editing state
        setEditingQuestion(null);
      }).catch((error) => console.error('Error updating question:', error));
    } else {
      // Create question
      createQuestion({ questionText: newQuestion, active: isActive }).then((newQ) => {
        setQuestions([...questions, newQ]);
      }).catch((error) => console.error('Error creating question:', error));
    }
    // Reset form fields
    setNewQuestion('');
    setIsActive(false);
  };

  // Toggle Active/Inactive Status
  const handleToggleStatus = (id) => {
    toggleQuestionStatus(id).then(() => {
      setQuestions(questions.map(q => q.questionId === id ? { ...q, active: !q.active } : q));
    }).catch((error) => console.error('Error toggling question status:', error));
  };

  // Delete Question
  const handleDelete = (id) => {
    deleteQuestion(id).then(() => {
      setQuestions(questions.filter(q => q.questionId !== id));
    }).catch((error) => console.error('Error deleting question:', error));
  };

  // Edit Question
  const handleEdit = (question) => {
    setNewQuestion(question.questionText);
    setIsActive(question.active);
    setEditingQuestion(question); // Set the question to be edited
  };

  return (
    <div className="flex">
      <Navigation />

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Manage Questions</h1>

        {/* Form for Create or Edit */}
        <div className="mb-6">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter question text"
            className="border p-2 rounded-md w-full"
          />
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mr-2"
            />
            Active
          </label>
          <button
            onClick={handleSaveQuestion}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
          >
            {editingQuestion ? 'Update Question' : 'Create Question'}
          </button>
        </div>

        {/* Questions List */}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Question Text</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.questionId}>
                <td className="border px-4 py-2">{question.questionText}</td>
                <td className="border px-4 py-2">{question.active ? 'Active' : 'Inactive'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleToggleStatus(question.questionId)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => handleEdit(question)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(question.questionId)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionManage;
