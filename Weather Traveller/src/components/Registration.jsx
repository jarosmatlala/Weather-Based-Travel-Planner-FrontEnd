import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
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
        if (!formData.name) {
            errors.name = "Name and Surname are required";
        }
        if (!formData.username) {
            errors.username = "Username is required";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(formData);
            console.log("Users to be stored:", users);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/LogIn');
        }
    };

    return (
        <div className="Reg1">
            <h1>Register For A New Account</h1>
            <div>
                <p>Name And Surname</p>
                <input
                    className='input'
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}

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

                <p>Re-Enter Password</p>
                <input
                    className='input'
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                <div className='btnReg'>
                    <button className='btn' onClick={handleSubmit}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
