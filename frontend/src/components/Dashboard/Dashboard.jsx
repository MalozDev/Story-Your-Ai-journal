import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  // Animation controls for sections
  const moodControl = useAnimation();
  const questionControl = useAnimation();
  const captureControl = useAnimation();
  const entriesControl = useAnimation();

  // Refs for each section to detect when they're in view
  const [moodRef, moodInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [questionRef, questionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [captureRef, captureInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [entriesRef, entriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animate sections when they come into view
  useEffect(() => {
    if (moodInView) moodControl.start('visible');
    if (questionInView) questionControl.start('visible');
    if (captureInView) captureControl.start('visible');
    if (entriesInView) entriesControl.start('visible');
  }, [
    moodInView,
    questionInView,
    captureInView,
    entriesInView,
    moodControl,
    questionControl,
    captureControl,
    entriesControl,
  ]);

  // Default to "User" if no name was passed from sign up
  const username = location.state?.userData?.name || 'User';

  // Header parallax effect
  const headerRef = useRef(null);
  const headerY = useTransform(scrollY, [0, 200], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const recentEntries = [
    {
      id: 1,
      date: 'April 2, 2025',
      title: 'Started building MyStory app',
      snippet:
        "Today I began working on my new app idea. I'm excited about the possibilities...",
      mood: 'happy',
      moodEmoji: '😊',
      hasCode: true,
    },
    {
      id: 2,
      date: 'April 1, 2025',
      title: 'Reflections on Q1',
      snippet:
        "Looking back at the first quarter of the year, I've made progress on...",
      mood: 'thoughtful',
      moodEmoji: '🤔',
      hasPhoto: true,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className='dashboard'
      initial={{ opacity: 0, x: 100, rotateY: 90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -100, rotateY: -90 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div>
        <div className='dashboard-content'>
          <motion.header
            className='dashboard-header'
            ref={headerRef}
            style={{ y: headerY, opacity: headerOpacity }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Good {getTimeOfDay()}, {username}
            </motion.h1>
            <motion.div
              className='profile-button'
              onClick={() => navigate('/profile')}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              👤
            </motion.div>
          </motion.header>

          <motion.section
            className='mood-visualization'
            ref={moodRef}
            variants={containerVariants}
            initial='hidden'
            animate={moodControl}
          >
            <motion.h2
              variants={itemVariants}
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Mood Tracker
            </motion.h2>
            <motion.div className='mood-graph' variants={itemVariants}>
              <motion.div
                className='mood-dots'
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {[
                  'happy',
                  'neutral',
                  'happy',
                  'reflective',
                  'happy',
                  'emotional',
                  'happy',
                ].map((mood, index) => (
                  <motion.span
                    key={index}
                    className={`mood-dot ${mood}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  ></motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section
            className='daily-question'
            ref={questionRef}
            variants={containerVariants}
            initial='hidden'
            animate={questionControl}
          >
            <motion.h2 variants={itemVariants}>Today's Question:</motion.h2>
            <motion.div
              className='question-card'
              variants={cardVariants}
              whileHover='hover'
              whileInView={{ y: [50, 0], opacity: [0, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <p>How did your meeting go this morning?</p>
              <div className='question-actions'>
                <motion.button
                  className='action-button'
                  whileHover={{ scale: 1.05, backgroundColor: '#0066ff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Answer
                </motion.button>
                <motion.button
                  className='action-button secondary'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Skip
                </motion.button>
              </div>
            </motion.div>
          </motion.section>

          <motion.section
            className='quick-capture'
            ref={captureRef}
            variants={containerVariants}
            initial='hidden'
            animate={captureControl}
          >
            <motion.h2 variants={itemVariants}>Quick Capture:</motion.h2>
            <motion.div
              className='capture-buttons'
              variants={itemVariants}
              whileInView={{ opacity: [0, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                { icon: '✏️', label: 'Write' },
                { icon: '🎙️', label: 'Record' },
                { icon: '📸', label: 'Photo' },
                { icon: '🤖', label: 'Ask AI' },
              ].map((button, index) => (
                <motion.button
                  key={index}
                  className='capture-button'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className='capture-icon'
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    {button.icon}
                  </motion.span>
                  <span className='capture-label'>{button.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className='recent-entries'
            ref={entriesRef}
            variants={containerVariants}
            initial='hidden'
            animate={entriesControl}
          >
            <motion.h2 variants={itemVariants}>Recent Entries:</motion.h2>
            <motion.div className='entries-list' variants={itemVariants}>
              {recentEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className='entry-card'
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0px 8px 15px rgba(0,0,0,0.1)',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <div className='entry-header'>
                    <div className='entry-date'>{entry.date}</div>
                    <motion.div
                      className='entry-mood'
                      whileHover={{ scale: 1.3, rotate: 10 }}
                    >
                      {entry.moodEmoji}
                    </motion.div>
                  </div>
                  <h3 className='entry-title'>{entry.title}</h3>
                  <p className='entry-snippet'>{entry.snippet}</p>
                  <motion.div
                    className='entry-indicators'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    {entry.hasPhoto && (
                      <motion.span
                        className='entry-indicator'
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        📷
                      </motion.span>
                    )}
                    {entry.hasCode && (
                      <motion.span
                        className='entry-indicator'
                        whileHover={{ scale: 1.2, rotate: -5 }}
                      >
                        💻
                      </motion.span>
                    )}
                  </motion.div>
                </motion.div>
              ))}
              <motion.button
                className='view-all-entries'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05, backgroundColor: '#f0f0f0' }}
                whileTap={{ scale: 0.95 }}
              >
                View All Entries
              </motion.button>
            </motion.div>
          </motion.section>
        </div>

        {/* Bottom Navigation */}
        <motion.nav
          className='bottom-nav'
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { icon: '🏠', label: 'Home', active: true },
            { icon: '👤', label: 'Know me', path: '/knowme' },
            { icon: '🤖', label: 'Insights', path: '/Insights' },
            { icon: '📊', label: 'Timeline', path: '/timeline' },
            { icon: '⚙️', label: 'Goals', path: '/goals' },
          ].map((item, index) => (
            <motion.button
              key={index}
              className={`nav-button ${item.active ? 'active' : ''}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              onClick={() => item.path && navigate(item.path)}
              whileHover={{
                y: -5,
                backgroundColor: item.active ? undefined : '#f0f0f0',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className='nav-icon'
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {item.icon}
              </motion.span>
              <span className='nav-label'>{item.label}</span>
            </motion.button>
          ))}
        </motion.nav>
      </div>
    </motion.div>
  );
};

export default Dashboard;
