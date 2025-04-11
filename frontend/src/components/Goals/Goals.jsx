// Goals.jsx
import React from 'react';
import './Goals.css';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  const navigate = useNavigate();

  return (
    <div className='goals-container'>
      <header className='goals-header'>
        <h1>My Goals</h1>
      </header>

      {/* Progress Overview */}
      <div className='progress-overview'>
        <div className='progress-circle'>
          <svg width='100' height='100' viewBox='0 0 100 100'>
            <circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='#f0f0f0'
              strokeWidth='8'
            />
            <circle
              cx='50'
              cy='50'
              r='45'
              fill='none'
              stroke='#F59E0B'
              strokeWidth='8'
              strokeDasharray='283'
              strokeDashoffset='85'
              transform='rotate(-90 50 50)'
            />
          </svg>
          <span className='progress-txt'>70%</span>
        </div>
        <p className='progress-description'>On track with your goals</p>
      </div>

      {/* Current Goals */}
      <section className='current-goals'>
        <h2>Current Goals:</h2>
        <div className='goal-card'>
          <div className='goal-header'>
            <h3 className='goal-title'>Write daily for 15 minutes</h3>
            <span className='goal-badge in-progress'>In Progress</span>
          </div>
          <div className='goal-progress'>
            <div className='progress-bar'>
              <div className='progress' style={{ width: '65%' }}></div>
            </div>
            <span className='progress-value'>65%</span>
          </div>
          <div className='goal-details'>
            <p className='goal-deadline'>Deadline: April 30, 2025</p>
            <p className='goal-streak'>Current streak: 5 days</p>
          </div>
          <div className='goal-actions'>
            <button className='goal-button check'>✓</button>
            <button className='goal-button edit'>✎</button>
          </div>
        </div>

        <div className='goal-card'>
          <div className='goal-header'>
            <h3 className='goal-title'>Complete app prototype</h3>
            <span className='goal-badge on-track'>On Track</span>
          </div>
          <div className='goal-progress'>
            <div className='progress-bar'>
              <div className='progress' style={{ width: '40%' }}></div>
            </div>
            <span className='progress-value'>40%</span>
          </div>
          <div className='goal-details'>
            <p className='goal-deadline'>Deadline: May 15, 2025</p>
          </div>
          <div className='goal-actions'>
            <button className='goal-button check'>✓</button>
            <button className='goal-button edit'>✎</button>
          </div>
        </div>
      </section>

      {/* Add New Goal */}
      <div className='add-goal-card'>
        <button className='add-goal-button'>
          <span className='plus-icon'>+</span>
          <span>Add New Goal</span>
        </button>
      </div>

      {/* AI Suggestion */}
      <div className='ai-suggestion'>
        <h3 className='ai-header'>
          <span className='ai-icon'>💡</span> Goal Suggestion:
        </h3>
        <p className='ai-message'>
          Based on your journal entries, you might want to set a goal around
          learning a new creative skill.
        </p>
        <div className='ai-actions'>
          <button className='ai-button primary'>Create Goal</button>
          <button className='ai-button secondary'>Not Now</button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className='bottom-nav'>
        <button className='nav-button' onClick={() => navigate('/dashboard')}>
          <span className='nav-icon'>🏠</span>
          <span className='nav-label'>Home</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/knowme')}>
          <span className='nav-icon'>👤</span>
          <span className='nav-label'>Know me</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/Insights')}>
          <span className='nav-icon'>🤖</span>
          <span className='nav-label'>Insights</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/timeline')}>
          <span className='nav-icon'>📊</span>
          <span className='nav-label'>Timeline</span>
        </button>
        <button className='nav-button active'>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Goals</span>
        </button>
      </nav>
    </div>
  );
};

export default Goals;
