import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Favourites.css';

const Favourites = () => {
  const userEmail = useSelector((state) => state.user.user.email);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (userEmail) {
      fetchFavourites(userEmail);
    }
  }, [userEmail]);

  const fetchFavourites = async (email) => {
    try {
      const response = await fetch(`https://weather-based-travel-planner-backend.onrender.com/api/favourites/favourites/${email}`);
      const data = await response.json();

      if (response.ok) {
        setFavourites(data.favourites);
      } else {
        console.error('Error fetching favourites:', data.message);
      }
    } catch (error) {
      console.error('Error fetching favourites:', error);
    }
  };

  const handleDelete = async (index) => {
    const locationToDelete = favourites[index];
    try {
      const response = await fetch(`https://weather-based-travel-planner-backend.onrender.com/api/favourites/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, cityName: locationToDelete }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedFavourites = favourites.filter((_, i) => i !== index);
        setFavourites(updatedFavourites);
      } else {
        console.error('Error deleting location:', data.message);
      }
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  if (!userEmail) {
    return <p>User is not logged in</p>;
  }

  return (
    <div className="Favourites">
      <h1>Favourite Locations</h1>
      {favourites.length === 0 ? (
        <p>No favourite locations added yet.</p>
      ) : (
        <ul>
          {favourites.map((fav, index) => (
            <li key={index}>
              {fav}
              <button onClick={() => handleDelete(index)} className="deleteButton">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
