import React, { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";

const DraftBookings = () => {
  const [draftHotels, setDraftHotels] = useState([]);

  const loadDrafts = () => {
    const storedDrafts = JSON.parse(localStorage.getItem("draftBookings")) || [];
    setDraftHotels(storedDrafts);
  };

  useEffect(() => {
    loadDrafts();

    window.addEventListener("draftsUpdated", loadDrafts);

    return () => {
      window.removeEventListener("draftsUpdated", loadDrafts);
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Draft Bookings</h2>

      {draftHotels.length === 0 ? (
        <p>No draft bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {draftHotels.map((hotel) => (
            <HotelCard key={hotel.hotel_id} hotel={hotel} showLimitedButtons={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftBookings;
