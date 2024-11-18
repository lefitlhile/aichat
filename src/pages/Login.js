import React, { useState } from 'react';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        // Redirect to home page or dashboard after successful login
        window.location.href = '/dashboard';  // Change this to your desired route
      } else {
        setError(data.errors.map((err) => err.msg).join(', '));
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-header">Log In</h2>
      <p className="form-subheader">Please enter your credentials to log in.</p>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <div style={footerStyles.div}>
        <span style={footerStyles.text}>Don't have an account? </span>
        <a href="/signup" style={footerStyles.link}>Sign Up</a>
        <div>
     
    </div>
      </div>
    </div>
  );
};

const footerStyles = {
  div: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: 'Cabin, sans-serif',
    fontSize: '20px',
    lineHeight: '24.5px',
    width: '300px',
    height: '14px',
  },
  text: {
    color: '#000',
    marginRight: '5px',
  },
  link: {
    color: '#FFA500',
    textDecoration: 'none',
  },
};


export default LoginPage;
