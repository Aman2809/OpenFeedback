import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

function PublicFeedback() {
  return (
    <div className="container w-[90vw] sm:w-[70vw] px-4 py-8">


      <h1 className="text-2xl sm:ml-32 sm:text-3xl mt-7 font-bold font-serif mb-4">
        Please rate us!
      </h1>

      <p className="text-sm sm:ml-32 sm:text-lg font-serif mb-6">
        Every feedback matters to us! Tell us how you feel using our IDE.
      </p>

      <h2 className="text-lg sm:ml-32 font-bold mb-4">
        Rate your experience
      </h2>

      {/* Feedback form */}
      <FeedbackForm />
    </div>
  );
}

export default PublicFeedback;
