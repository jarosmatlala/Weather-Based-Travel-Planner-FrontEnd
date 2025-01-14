import { useNavigate } from "react-router-dom";
import './Registration.css';
import image from "../assets/sunny-weather.jpg"
import { useState } from "react";



const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
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
        if (!formData.name) {
            errors.name = "Name and Surname are required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Registration successful:", data);
                    navigate('/LogIn');
                } else {
                    setErrors({ general: data.message });
                    console.error("Registration error:", data);
                }
            } catch (error) {
                setErrors({ general: "Error during registration" });
                console.error("Error during registration:", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="left-section" >
                <h2>Your Best Weather-Led Travel Partner</h2>
                <div className="illustrations">
                    <img src={image} ></img>
                </div>
            </div>
            <div className="right-section">
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

                    <p>Email Address</p>
                    <input
                        className='input'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <p>Password</p>
                    <input
                        className='input'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    {errors.general && <p className="error">{errors.general}</p>}

                    <div className='btnReg'>
                        <button className='btn' onClick={handleSubmit}>Register</button>
                    </div>
                    <p>Already have an account <a href="/LogIn">Sign In</a>     </p>
                </div>
            </div>
        </div>

    );
};

export default Registration;
