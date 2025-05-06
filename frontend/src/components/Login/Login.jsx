// src/components/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // ensure this is correct
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auto-redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/welcomecontext');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext will detect and redirect
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
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
              required
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
              required
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
