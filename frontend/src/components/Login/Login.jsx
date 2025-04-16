import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Clear any previous errors
    setError('');

    // Here you would add authentication logic
    console.log('Login attempt with:', { email });

    // For demo purposes - you'd replace this with actual auth
    alert('Login functionality would be implemented here');
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <div className='login-header'>
          <h1 className='login-title'>MyStory</h1>
          <p className='login-subtitle'>Welcome back to your journey</p>
        </div>

        {error && <div className='login-error'>{error}</div>}

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='your-email@gmail.com'
              className='form-input'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='form-input'
            />
            <div className='forgot-password'>
              <a href='/forgot-password'>Forgot password?</a>
            </div>
          </div>

          <button type='submit' className='login-button'>
            Sign In
          </button>
        </form>

        <div className='login-footer'>
          <p>
            Don't have an account?{' '}
            <a onClick={() => navigate('/signup')}>Start your story</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
