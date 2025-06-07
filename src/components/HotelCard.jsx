import React, { useState } from 'react';

const HotelCard = ({ hotel, visitOnly = false }) => {
  const {
    photo1,
    hotel_name,
    city,
    country,
    star_rating,
    rates_from,
    url
  } = hotel;

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    rooms: 1
  });

  const handleVisit = () => {
    const visits = JSON.parse(localStorage.getItem('visits')) || {};
    visits[hotel.hotel_id] = (visits[hotel.hotel_id] || 0) + 1;
    localStorage.setItem('visits', JSON.stringify(visits));
    window.dispatchEvent(new Event("recommendationsUpdated"));
    window.open(url, '_blank');
  };

  const handleBookingSubmit = () => {
    const { name, email, phone, checkin, checkout } = formData;

    if (!name || !email || !phone || !checkin || !checkout) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const completedBookings = JSON.parse(localStorage.getItem('completedBookings')) || [];
    completedBookings.push({
      ...hotel,
      userDetails: formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('completedBookings', JSON.stringify(completedBookings));

    const updatedDrafts = (JSON.parse(localStorage.getItem('draftBookings')) || [])
      .filter(h => h.hotel_id !== hotel.hotel_id);
    localStorage.setItem('draftBookings', JSON.stringify(updatedDrafts));

    window.dispatchEvent(new Event("draftsUpdated"));
    window.dispatchEvent(new Event("recommendationsUpdated"));

    alert("🎉 Payment Successful! Your booking has been confirmed.");

    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkin: "",
      checkout: "",
      rooms: 1
    });
  };

  const handleBookClick = () => {
    const drafts = JSON.parse(localStorage.getItem("draftBookings")) || [];
    const exists = drafts.some(h => h.hotel_id === hotel.hotel_id);
    if (!exists) {
      drafts.push(hotel);
      localStorage.setItem("draftBookings", JSON.stringify(drafts));
      window.dispatchEvent(new Event("draftsUpdated"));
      window.dispatchEvent(new Event("recommendationsUpdated"));
    }
    setShowModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-[300px] m-4">
        <img
          src={photo1}
          alt={hotel_name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/default.jpg';
          }}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{hotel_name}</h2>
          <p className="text-gray-600">{city}, {country}</p>
          <p className="text-yellow-500 mt-1">⭐ {star_rating}</p>
          <p className="text-green-600 font-semibold mt-1">${rates_from} / night</p>

          <div className="mt-4 space-y-2">
            <button
              className="w-full bg-[#009999] text-white py-1 rounded hover:bg-[#ffa049]"
              onClick={handleVisit}
            >
              Visit
            </button>

            {!visitOnly && (
              <button
                className="w-full bg-[#05203c] text-white py-1 rounded hover:bg-[#154679]"
                onClick={handleBookClick}
              >
                Book
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Complete Your Booking</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border p-2 rounded"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Number of Rooms</label>
                <input
                  type="number"
                  min={1}
                  value={formData.rooms}
                  onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
                  className="w-full border p-2 rounded"
                  placeholder="e.g., 2"
                />
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={formData.checkin}
                    onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={formData.checkout}
                    onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingSubmit}
                className="px-4 py-2 bg-[#382254] text-white rounded hover:bg-green-600"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelCard;
