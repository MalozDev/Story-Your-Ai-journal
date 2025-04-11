// Profile.jsx
import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className='profile-container'>
      <header className='profile-header'>
        <h1>My Profile</h1>
      </header>

      {/* Profile Summary */}
      <div className='profile-summary'>
        <div className='profile-avatar'>
          <div className='avatar-placeholder'>
            <span>👤</span>
          </div>
        </div>
        <div className='profile-info'>
          <h2 className='profile-name'>User Name</h2>
          <p className='profile-joined'>Journaling since March 2025</p>
          <div className='profile-stats'>
            <div className='stat'>
              <span className='stat-value'>37</span>
              <span className='stat-label'>Entries</span>
            </div>
            <div className='stat'>
              <span className='stat-value'>3</span>
              <span className='stat-label'>Chapters</span>
            </div>
            <div className='stat'>
              <span className='stat-value'>5</span>
              <span className='stat-label'>Goals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <section className='settings-group'>
        <h2>Account</h2>
        <div className='settings-card'>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>👤</span>
              <span className='settings-text'>Edit Profile</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
          <div className='divider'></div>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>🔔</span>
              <span className='settings-text'>Notifications</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
          <div className='divider'></div>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>🔐</span>
              <span className='settings-text'>Privacy & Security</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
        </div>
      </section>

      <section className='settings-group'>
        <h2>Journal Settings</h2>
        <div className='settings-card'>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>📝</span>
              <span className='settings-text'>Journal Preferences</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
          <div className='divider'></div>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>🤖</span>
              <span className='settings-text'>AI Assistant Settings</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
          <div className='divider'></div>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>📱</span>
              <span className='settings-text'>App Appearance</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
        </div>
      </section>

      <section className='settings-group'>
        <h2>Data & Backup</h2>
        <div className='settings-card'>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>💾</span>
              <span className='settings-text'>Export Journal Data</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
          <div className='divider'></div>
          <div className='settings-item'>
            <div className='settings-item-content'>
              <span className='settings-icon'>🔄</span>
              <span className='settings-text'>Backup & Sync</span>
            </div>
            <span className='settings-chevron'>›</span>
          </div>
        </div>
      </section>

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
        <button className='nav-button' onClick={() => navigate('/goals')}>
          <span className='nav-icon'>⚙️</span>
          <span className='nav-label'>Goals</span>
        </button>
      </nav>
    </div>
  );
};

export default Profile;
