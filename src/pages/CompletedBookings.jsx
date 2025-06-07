import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";

const CompletedBookings = () => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("completedBookings")) || [];
    setCompleted(data);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Completed Bookings</h2>

      {completed.length === 0 ? (
        <p>No completed bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {completed.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} visitOnly />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedBookings;
