import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { AuthContext } from '../App';
import './LogIn.css';
import image from "../assets/sunny-weather.jpg";

const LogIn = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setUser({ email: formData.email }));
          setAuth(formData.email);
          navigate('/WeatherScr');
        } else {
          setErrors({ general: data.message });
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrors({ general: 'Server error' });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={image} alt="weather" />
      </div>
      <div className="login-form">
        <h1>Welcome Back!</h1>
        <p className="subheading">Log in to access your Application.</p>
        <div>
          <p className="par">Email</p>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <p className="par">Password</p>
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          {errors.general && <p className="error">{errors.general}</p>}

          <div className="buttons">
            <button className="btn" onClick={handleSubmit}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
