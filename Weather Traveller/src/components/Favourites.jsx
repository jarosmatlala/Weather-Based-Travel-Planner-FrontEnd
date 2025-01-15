import React from 'react';
import { useLocation } from 'react-router-dom';
import './Favourites.css';

const Favourites = () => {
  const location = useLocation();
  const favourites = location.state?.favourites || [];

  return (
    <div className="Favourites">
      <h1>Favourite Locations</h1>
      <ul>
        {favourites.map((fav, index) => (
          <li key={index}>{fav}</li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
