// KnowMe.jsx
import React from 'react';
import './KnowMe.css';
import { useNavigate } from 'react-router-dom';

const KnowMe = () => {
  const navigate = useNavigate();

  return (
    <div className='know-me-container'>
      <header className='know-me-header'>
        <h1>Know Me</h1>
      </header>

      {/* Chapter Progress */}
      <div className='chapter-progress-container'>
        <div className='chapter-shelf'>
          <div className='book completed'></div>
          <div className='book in-progress'></div>
          <div className='book not-started'></div>
          <div className='book not-started'></div>
        </div>
        <p className='progress-txtt'>Life chapters in progress</p>
      </div>

      {/* Today's Memory */}
      <section className='todays-memory'>
        <h2>Today's Memory:</h2>
        <div className='memory-card'>
          <p className='memory-question'>
            Tell me about your childhood home. What stands out most?
          </p>
          <div className='memory-image-suggestion'>
            <div className='image-placeholder'></div>
            <p className='image-text'>Add a photo of your home</p>
          </div>
          <div className='memory-actions'>
            <button className='memory-button primary'>Answer</button>
            <button className='memory-button secondary'>Remind Later</button>
          </div>
        </div>
      </section>

      {/* Chapters in Progress */}
      <section className='chapters-progress'>
        <h2>Chapters In Progress:</h2>
        <div className='chapter-card'>
          <h3 className='chapter-title'>Childhood Years</h3>
          <div className='progress-bar'>
            <div className='progress' style={{ width: '30%' }}></div>
          </div>
        </div>

        <div className='chapter-card'>
          <h3 className='chapter-title'>School Days</h3>
          <div className='progress-bar'>
            <div className='progress' style={{ width: '15%' }}></div>
          </div>
        </div>

        <div className='chapter-card'>
          <h3 className='chapter-title'>Social life</h3>
          <div className='progress-bar'>
            <div className='progress' style={{ width: '6%' }}></div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className='bottom-nav'>
        <button className='nav-button' onClick={() => navigate('/dashboard')}>
          <span className='nav-icon'>🏠</span>
          <span className='nav-label'>Home</span>
        </button>
        <button className='nav-button active'>
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
        <button className='nav-button' onClick={() => navigate('/goals')}>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Goals</span>
        </button>
      </nav>
    </div>
  );
};

export default KnowMe;
