import React , { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Favourites.css';

const Favourites = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState(location.state?.favourites || []);
 
  const handleDelete = (index) => {
     const updatedFavourites = favourites.filter((_, i) => i !== index);
      setFavourites(updatedFavourites); 
  navigate('/favourites', { state: { favourites: updatedFavourites } }); };


  return (
    <div className="Favourites">
      <h1>Favourite Locations</h1>
      <ul>
        {favourites.map((fav, index) => (
          <li key={index}>
            {fav}
            <button onClick={() => handleDelete(index)} className="deleteButton">Delete</button>            </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
