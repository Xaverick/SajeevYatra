import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        adhar: '',
        bloodGroup: '',
        location: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed to the next page
            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            if(response.ok){
                console.log('User registered successfully');
            }

            else{
                console.log('User registration failed');
            }
            // You can submit form data to server or perform further actions
        } else {
            // Set errors state to display validation errors to the user
            setErrors(validationErrors);
        }
    };

    const validate = (formData) => {
        let errors = {};

        for (const key in formData) {
            if (!formData[key].trim()) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        }

        if (Object.keys(errors).length === 0) {
            if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Email is invalid';
            }

            if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
                errors.mobile = 'Mobile number should be 10 digits';
            }
        }

        return errors;
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                    {errors.name && <span className="error">{errors.name}</span>}
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-row">
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" pattern="[0-9]{10}" required />
                    {errors.mobile && <span className="error">{errors.mobile}</span>}
                    <input type="text" name="adhar" value={formData.adhar} onChange={handleChange} placeholder="Adhar" required />
                    {errors.adhar && <span className="error">{errors.adhar}</span>}
                    <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="Blood Group" required />
                    {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}
                </div>
                <div className="form-row">
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                    {errors.location && <span className="error">{errors.location}</span>}
                </div>
                {Object.keys(errors).length === 0 ? (
                    <Link to='/user/dashboard'><button type="submit">Submit</button></Link>
                ) : (
                    <button type="submit">Submit</button>
                )}
            </form>
        </div>
    );
}

export default LoginForm;
