export function generateRecommendations(filteredHotels, allHotels) {
  if (!filteredHotels || !Array.isArray(filteredHotels)) return [];
  if (!allHotels || !Array.isArray(allHotels)) return [];

  const visits = JSON.parse(localStorage.getItem("visits") || "{}");
  const completed = JSON.parse(localStorage.getItem("completedBookings") || "[]");
  const drafts = JSON.parse(localStorage.getItem("draftBookings") || "[]");

  const activityIds = new Set([
    ...Object.keys(visits).map(Number),
    ...completed.map(h => h.hotel_id),
    ...drafts.map(h => h.hotel_id)
  ]);

  const currentCity = filteredHotels.length > 0 ? filteredHotels[0].city : null;

  const scoredHotels = filteredHotels.map(hotel => {
    let score = 0;

    if (activityIds.has(hotel.hotel_id)) return { ...hotel, score: -1 };

    if (currentCity && hotel.city === currentCity) {
      score += 5;
    }

    if (hotel.rating_average >= 8.5) {
      score += 3;
    }

    if (hotel.number_of_reviews > 20) {
      score += 2;
    }

    if (completed.length > 0) {
      const avgPrice = completed.reduce((sum, b) => sum + b.rates_from, 0) / completed.length;
      if (Math.abs(hotel.rates_from - avgPrice) <= avgPrice * 0.2) {
        score += 2;
      }
    }

    return { ...hotel, score };
  });

  return scoredHotels
    .filter(hotel => hotel.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score, ...hotel }) => hotel);
}
