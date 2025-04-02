import { useState } from 'react';
import './TimelinePage.css';

const TimelinePage = () => {
  // Dummy data for timeline entries
  const timelineEntries = [
    {
      id: 1,
      year: '2025',
      month: 'APR',
      day: '02',
      content: 'Started building MyStory app',
      hasCode: true,
      hasPhoto: false,
    },
    {
      id: 2,
      year: '2025',
      month: 'MAR',
      day: '15',
      content: 'Celebrated birthday',
      hasCode: false,
      hasPhoto: true,
    },
    {
      id: 3,
      year: '2024',
      month: 'NOV',
      day: '20',
      content: 'Completed the certification program',
      hasCode: false,
      hasPhoto: true,
    },
  ];

  // Group entries by year
  const entriesByYear = timelineEntries.reduce((acc, entry) => {
    if (!acc[entry.year]) {
      acc[entry.year] = [];
    }
    acc[entry.year].push(entry);
    return acc;
  }, {});

  return (
    <div className='timeline-page'>
      <header className='timeline-header'>
        <h1>Timeline</h1>
      </header>

      <div className='search-container'>
        <div className='search-bar'>
          <span className='search-icon'>🔍</span>
          <input
            type='text'
            placeholder='Search memories...'
            className='search-input'
          />
          <button className='voice-search-button'>🎙️</button>
        </div>
      </div>

      <div className='calendar-view'>
        {/* Calendar preview for quick date selection */}
        <div className='calendar-preview'>
          <div className='month-selector'>
            <button className='month-arrow'>◀</button>
            <div className='current-month'>April 2025</div>
            <button className='month-arrow'>▶</button>
          </div>
          <div className='mini-calendar'>
            {/* Simplified calendar grid */}
            <div className='calendar-days'>
              <div className='day-label'>S</div>
              <div className='day-label'>M</div>
              <div className='day-label'>T</div>
              <div className='day-label'>W</div>
              <div className='day-label'>T</div>
              <div className='day-label'>F</div>
              <div className='day-label'>S</div>

              {/* Example calendar days */}
              {Array.from({ length: 30 }, (_, i) => {
                const hasEntry = i === 1; // Entry on April 2nd
                return (
                  <div
                    key={i}
                    className={`calendar-day ${hasEntry ? 'has-entry' : ''} ${
                      i === 1 ? 'current-day' : ''
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className='timeline-entries'>
        {Object.keys(entriesByYear)
          .sort((a, b) => b - a)
          .map((year) => (
            <div key={year} className='year-section'>
              <div className='year-divider'>
                <span className='year-label'>{year}</span>
                <div className='divider-line'></div>
              </div>

              {entriesByYear[year].map((entry) => (
                <div key={entry.id} className='timeline-entry'>
                  <div className='entry-date-block'>
                    <div className='entry-month'>{entry.month}</div>
                    <div className='entry-day'>{entry.day}</div>
                  </div>
                  <div className='entry-content-block'>
                    <div className='entry-content'>{entry.content}</div>
                    <div className='entry-indicators'>
                      {entry.hasCode && (
                        <span className='entry-indicator code-icon'>💻</span>
                      )}
                      {entry.hasPhoto && (
                        <span className='entry-indicator photo-icon'>📷</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        <div className='memory-flashback'>
          <h3>Memory Flashback:</h3>
          <p>You felt proud last November. Revisit?</p>
          <div className='flashback-actions'>
            <button className='flashback-button primary'>Yes</button>
            <button className='flashback-button secondary'>Not now</button>
          </div>
        </div>
      </div>

      <nav className='bottom-nav'>
        <button className='nav-button'>
          <span className='nav-icon'>🏠</span>
          <span className='nav-label'>Home</span>
        </button>
        <button className='nav-button'>
          <span className='nav-icon'>👤</span>
          <span className='nav-label'>Profile</span>
        </button>
        <button className='nav-button'>
          <span className='nav-icon'>🤖</span>
          <span className='nav-label'>AI</span>
        </button>
        <button className='nav-button active'>
          <span className='nav-icon'>📊</span>
          <span className='nav-label'>Timeline</span>
        </button>
        <button className='nav-button'>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default TimelinePage;
