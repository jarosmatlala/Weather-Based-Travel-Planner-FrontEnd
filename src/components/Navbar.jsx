import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const hideNavbarRoutes = ['/login', '/', '/registration'];
  const hideWeeklyForecastButton = '/WeatherScr';

  const shouldHideLinks = hideNavbarRoutes.includes(location.pathname);
  const shouldHideWeeklyForecast = location.pathname === hideWeeklyForecastButton;

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    navigate('/registration'); 
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Travel Delight</h1>
      {!shouldHideLinks && (
        <ul className="nav-links">
          <li><Link to="/WeatherScr">Home</Link></li>
          {!shouldHideWeeklyForecast && <li><Link to="/Weekly">Weekly Forecast</Link></li>}
          <li><Link to="/favourites">Favorites</Link></li>
        </ul>
      )}
      {auth && <div  className='logout-button-container'><button onClick={handleLogout} className="logout-btn">Logout</button></div>}
    </nav>
  );
};

export default Navbar;
