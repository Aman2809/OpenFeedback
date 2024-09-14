import React from 'react';
import FeedbackForm from '../components/FeedbackForm';

function PublicFeedback() {
  return (
    <div className="container w-[70vw]  px-4 py-8">
      <h1 className="text-3xl mt-7 ml-32 font-bold font-serif mb-4">Tell us how you really feel! </h1>
      <p className='text-lg mb-6 ml-32 '>We want to know your vibe! Pick the emoji that matches your mood and help us make your next visit even better. Let's finish with a smile! </p>
      <FeedbackForm />
    </div>
  );
}

export default PublicFeedback;