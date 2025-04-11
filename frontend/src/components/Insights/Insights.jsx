import React from 'react';
import './Insights.css';
import { useNavigate } from 'react-router-dom';

const Insights = () => {
  const navigate = useNavigate();

  return (
    <div className='insights-container'>
      <header className='insights-header'>
        <h1>Insights</h1>
      </header>

      <div className='mood-graph'>
        <div className='mood-visualization'></div>
        <p className='caption'>Your mood patterns over time</p>
      </div>

      <section className='life-patterns'>
        <h2>Life Patterns:</h2>
        <div className='pattern-card'>
          <div className='pattern-icon happy-icon'></div>
          <div className='pattern-content'>
            <p>You seem happiest when creating something new</p>
            <div className='pattern-visualization'>
              <div className='progress-bar'></div>
            </div>
          </div>
        </div>
      </section>

      <section className='recurring-themes'>
        <h2>Recurring Themes:</h2>
        <div className='themes-container'>
          <span className='theme-tag creativity'>#creativity (45)</span>
          <span className='theme-tag growth'>#growth (32)</span>
          <span className='theme-tag learning'>#learning (28)</span>
        </div>
      </section>

      <div className='ai-reflection'>
        <h3>
          <span className='ai-icon'>💡</span> AI Reflection:
        </h3>
        <p>
          I've noticed you often write about wanting more time for projects.
        </p>
        <div className='reflection-actions'>
          <button className='action-button'>Create a goal</button>
          <button className='action-button secondary'>Not now</button>
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
        <button className='nav-button active'>
          <span className='nav-icon'>🤖</span>
          <span className='nav-label'>Insights</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/timeline')}>
          <span className='nav-icon'>📊</span>
          <span className='nav-label'>Timeline</span>
        </button>
        <button className='nav-button' onClick={() => navigate('/goals')}>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Goals</span>
        </button>
      </nav>
    </div>
  );
};

export default Insights;
