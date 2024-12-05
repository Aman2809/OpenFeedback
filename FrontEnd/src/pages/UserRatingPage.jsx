import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchUsersByRatingForQuestion } from "../services/AdminService";

const UserRatingPage = () => {
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("questionId");
  const rating = searchParams.get("rating");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchUsersByRatingForQuestion(questionId, rating);
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (questionId && rating) fetchUsers();
  }, [questionId, rating]);

  if (loading)
    return <p className="text-center text-lg font-semibold mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-500 mt-10">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Users for Question {questionId} with Rating {rating}
        </h1>
        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <span className="font-semibold">DeviceID:</span>{" "}
                    {user.deviceId}
                  </p>
                  <p>
                    <span className="font-semibold">DeviceCountry:</span>{" "}
                    {user.country}
                  </p>
                  <p>
                    <span className="font-semibold">DeviceOs:</span>{" "}
                    {user.deviceOs}
                  </p>
                  <p>
                    <span className="font-semibold">DeviceOsVersion:</span>{" "}
                    {user.deviceOsVersion}
                  </p>
                  <p>
                    <span className="font-semibold">DisplayWidth:</span>{" "}
                    {user.displayWidth}
                  </p>
                  <p>
                    <span className="font-semibold">DisplayHeight:</span>{" "}
                    {user.displayHeight}
                  </p>
                  <p>
                    <span className="font-semibold">DeviceRam:</span>{" "}
                    {user.deviceRam}
                  </p>
                  <p>
                    <span className="font-semibold">DeviceStorage:</span>{" "}
                    {user.deviceStorage}
                  </p>
                  <p>
                    <span className="font-semibold">DeviceProcessorModel:</span>{" "}
                    {user.deviceProcessorModel}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-gray-600">
            No users found for this rating.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserRatingPage;
