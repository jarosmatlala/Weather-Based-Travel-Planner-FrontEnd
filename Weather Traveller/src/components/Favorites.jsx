import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    // Fetch the destinations from the backend API
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destination");
        const data = await response.json();
        if (response.ok) {
          setDestinations(data.destinations);
        } else {
          console.error("Error fetching destinations:", data.message);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleAddToFavorites = () => {
    if (selectedDestination) {
      // Here you would add the selected destination to the user's favorites
      // For now, we are just logging it
      console.log("Added to favorites:", selectedDestination);

      // Optionally navigate back to the weather screen
      navigate("/");
    }
  };

  return (
    <div className="favorites">
      <h2>Select Your Favorite Destination</h2>
      <select
        onChange={(e) => setSelectedDestination(e.target.value)}
        value={selectedDestination}
      >
        <option value="">Select a destination</option>
        {destinations.map((destination) => (
          <option key={destination._id} value={destination.name}>
            {destination.name} - {destination.country}
          </option>
        ))}
      </select>

      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default Favorites;
