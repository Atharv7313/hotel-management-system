import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";

const Visited = () => {
  const [visitedHotels, setVisitedHotels] = useState([]);

  useEffect(() => {
    const drafts = JSON.parse(localStorage.getItem("draftBookings")) || [];
    const completed = JSON.parse(localStorage.getItem("completedBookings")) || [];

    const combined = [...drafts, ...completed];
    const uniqueHotels = combined.reduce((acc, hotel) => {
      if (!acc.some(h => h.hotel_id === hotel.hotel_id)) {
        acc.push(hotel);
      }
      return acc;
    }, []);

    setVisitedHotels(uniqueHotels);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Visited Hotels</h2>
      {visitedHotels.length === 0 ? (
        <p>No visited hotels yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visitedHotels.map((hotel) => (
            <HotelCard key={hotel.hotel_id} hotel={hotel} visitOnly={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Visited;
