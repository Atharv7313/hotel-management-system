import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import hotels from '../data/hotels.json';
import { logVisit } from "../utils/userActivity"; // ✅ Import this
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import hotels from '../data/hotels.json';
import { logVisit } from "../utils/userActivity"; // ✅ import

function HotelDetails() {
  const { id } = useParams();
  const hotel = hotels.find(h => String(h.hotel_id) === id); // ✅ important fix if hotel_id is string
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (hotel) {
      logVisit(hotel.hotel_id); // ✅ log the visit here
      const similar = hotels.filter(h =>
        h.city === hotel.city && h.hotel_id !== hotel.hotel_id
      );
      setRecommendations(similar);
    }
  }, [hotel]);


  useEffect(() => {
    const similar = hotels.filter(h => h.location === hotel.location && h.id !== hotel.id);
    setRecommendations(similar);
  }, [hotel]);

  if (!hotel) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700">🏨 StayEasy</h1>
          <Link to="/" className="text-sm text-blue-500 underline">Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-xl shadow-md">
        <img
          src={`https://source.unsplash.com/800x400/?resort,${hotel.location}`}
          alt="Hotel"
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{hotel.name}</h2>
        <p className="text-gray-600">📍 {hotel.location}</p>
        <p className="text-yellow-500 font-semibold mb-4">⭐ {hotel.rating}</p>

        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded">Draft Booking</button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">Complete Booking</button>
        </div>

        <h3 className="text-lg font-semibold mt-6">You may also like:</h3>
        <ul className="mt-2 list-disc ml-6">
          {recommendations.map(h => (
            <li key={h.id} className="text-blue-600 underline">
              <Link to={`/hotel/${h.id}`}>{h.name} ({h.location})</Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-white shadow p-4 text-center text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} StayEasy. All rights reserved.
      </footer>
    </div>
  );
}

export default HotelDetails;
