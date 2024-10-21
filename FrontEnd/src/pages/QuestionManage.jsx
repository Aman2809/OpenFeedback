import React, { useState, useEffect } from 'react';
import { fetchAllQuestions, createQuestion, updateQuestion, deleteQuestion, toggleQuestionStatus } from '../services/AdminService';
import Navigation from '../components/Navigation';
import { Menu } from 'lucide-react';

const QuestionManage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    fetchAllQuestions()
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleSaveQuestion = () => {
    if (editingQuestion) {
      updateQuestion(editingQuestion.questionId, { questionText: newQuestion, active: isActive })
        .then(() => {
          setQuestions(
            questions.map((q) =>
              q.questionId === editingQuestion.questionId
                ? { ...q, questionText: newQuestion, active: isActive }
                : q
            )
          );
          setEditingQuestion(null);
        })
        .catch((error) => console.error('Error updating question:', error));
    } else {
      createQuestion({ questionText: newQuestion, active: isActive })
        .then((newQ) => {
          setQuestions([...questions, newQ]);
        })
        .catch((error) => console.error('Error creating question:', error));
    }
    setNewQuestion('');
    setIsActive(false);
  };

  const handleToggleStatus = (id) => {
    toggleQuestionStatus(id)
      .then(() => {
        setQuestions(
          questions.map((q) =>
            q.questionId === id ? { ...q, active: !q.active } : q
          )
        );
      })
      .catch((error) => console.error('Error toggling question status:', error));
  };

  const handleDelete = (id) => {
    deleteQuestion(id)
      .then(() => {
        setQuestions(questions.filter((q) => q.questionId !== id));
      })
      .catch((error) => console.error('Error deleting question:', error));
  };

  const handleEdit = (question) => {
    setNewQuestion(question.questionText);
    setIsActive(question.active);
    setEditingQuestion(question);
  };

  return (
    <div className="flex">
  {/* Mobile Navigation Toggle */}
  <div className="md:hidden fixed top-0 left-0 p-4 z-50">
    <button
      onClick={() => setIsNavOpen(!isNavOpen)}
      className="text-gray-500 bg-white rounded-full p-2 shadow-md"
    >
      <Menu size={24} />
    </button>
  </div>

  {/* Sliding Navigation for mobile */}
  <div
    className={`fixed inset-y-0 left-0 transform ${
      isNavOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 transition duration-200 ease-in-out z-30 md:relative md:flex`}
  >
    <div className="bg-white h-full w-64 shadow-lg overflow-y-auto md:shadow-none">
      <Navigation />
    </div>
  </div>

  {/* Main content */}
  <div className="flex-1 p-4 sm:p-6 bg-gray-100">
    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left sm:mb-6">
      Manage Questions
    </h1>

    {/* Form for Create or Edit */}
    <div className="mb-6">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Enter question text"
        className="border p-2 rounded-md w-full sm:w-1/2"
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
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md sm:w-1/4"
      >
        {editingQuestion ? 'Update Question' : 'Create Question'}
      </button>
    </div>

    {/* Questions List */}
    <div className="overflow-y-auto max-h-72">
      <table className="w-full min-w-full bg-white rounded-lg shadow-md">
        <thead className="sticky top-0 bg-[#009879] text-white">
          <tr>
            <th className="px-4 py-3">Question Text</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr
              key={question.questionId}
              className={`border-b ${
                index % 2 === 1 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <td className="px-4 py-2">{question.questionText}</td>
              <td className="px-4 py-2">
                {question.active ? 'Active' : 'Inactive'}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleToggleStatus(question.questionId)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2 mb-1 sm:mb-0"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleEdit(question)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md mr-2 mb-1 sm:mb-0"
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
</div>

  );
};

export default QuestionManage;