export function logVisit(hotelId) {
  const visits = JSON.parse(localStorage.getItem("visits") || "{}");
  visits[hotelId] = (visits[hotelId] || 0) + 1;
  localStorage.setItem("visits", JSON.stringify(visits));
}

export function getVisits() {
  return JSON.parse(localStorage.getItem("visits") || "{}");
}

export function getDraftBookings() {
  return JSON.parse(localStorage.getItem("draftBookings") || "[]");
}

export function getCompletedBookings() {
  return JSON.parse(localStorage.getItem("completedBookings") || "[]");
}
