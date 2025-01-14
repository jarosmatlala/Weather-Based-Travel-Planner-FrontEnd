import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../App';

const LogIn = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
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
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.username === formData.username);

        let errors = {};

        if (!formData.username) {
            errors.username = "Username is required";
        } else if (!user) {
            errors.username = "User not found";
        }

        if (!formData.password) {
            errors.password = "Password is required";
        } else if (user && formData.password !== user.password) {
            errors.password = "Wrong password";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setAuth(formData.username);
            localStorage.setItem('auth', formData.username);
            navigate('/WeatherScr');
        } else {
            console.log("Form did not validate");
        }
    };

    return (
        <div className="heading">
            <h1>Hello, Please Log In For Easy Access</h1>
            <div>
                <p>Username</p>
                <input
                    className='input'
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <p>Password</p>
                <input
                    className='input'
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                {errors.general && <p className='error'>{errors.general}</p>}

                <div className='buttons'>
                    <button className='btn' onClick={handleSubmit}>Log In</button>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
