import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import hotelsData from "../data/hotels.json";
import { generateRecommendations } from "../utils/recommendations";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [recommendedHotels, setRecommendedHotels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStar, setSelectedStar] = useState("All Stars");

  const updateRecommendations = () => {
    setRecommendedHotels(generateRecommendations(filteredHotels, hotelsData));
  };

  useEffect(() => {
    setHotels(hotelsData);
    setFilteredHotels(hotelsData);
    updateRecommendations();
    window.addEventListener("recommendationsUpdated", updateRecommendations);
    return () => window.removeEventListener("recommendationsUpdated", updateRecommendations);
  }, []);

  useEffect(() => {
    updateRecommendations();
  }, [filteredHotels]);

  useEffect(() => {
    if (hotels.length > 0) {
      filterHotels();
    }
  }, [searchText, selectedCity, selectedStar]);

  useEffect(() => {
    if (hotels.length > 0) {
      filterHotels();
      updateRecommendations();
    }
  }, [location]);

  const filterHotels = () => {
    let filtered = [...hotels];

    if (searchText.trim()) {
      filtered = filtered.filter(hotel =>
        hotel.hotel_name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter(
        hotel => hotel.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedStar !== "All Stars") {
      filtered = filtered.filter(
        hotel => Math.round(hotel.star_rating) === Number(selectedStar)
      );
    }

    setFilteredHotels(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-2">
      <div className="lg:w-[15%] lg:sticky lg:top-20 h-fit bg-white shadow p-4 rounded mb-6 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <input
          type="text"
          placeholder="Search hotels"
          className="w-full p-2 mb-4 border rounded"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="All Cities">All Cities</option>
          {Array.from(new Set(hotels.map(h => h.city))).map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>
        <select
          value={selectedStar}
          onChange={(e) => setSelectedStar(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="All Stars">All Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div className="flex-1 lg:w-[80%] flex flex-col lg:flex-row gap-3 justify-evenly">
        <div className="w-full lg:w-[70%] p-3">
          <h1 className="text-3xl text-[#05203c] font-bold mb-4">Explore Hotels</h1>
          <div className="flex flex-wrap justify-evenly gap-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map(hotel => (
                <HotelCard key={hotel.hotel_id} hotel={hotel} />
              ))
            ) : (
              <p>No hotels match your criteria.</p>
            )}
          </div>
        </div>

        <div className="lg:w-[28%] p-6">
          <h2 className="text-xl font-semibold mb-3">Recommended for You</h2>
          {recommendedHotels.length > 0 ? (
            recommendedHotels.map(hotel => (
              <HotelCard key={hotel.hotel_id} hotel={hotel} />
            ))
          ) : (
            <p>No recommendations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
