import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Controls for different sections
  const benefitsControls = useAnimation();
  const previewControls = useAnimation();

  // Refs for sections we want to animate on scroll
  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [previewRef, previewInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Handle scroll animations
  useEffect(() => {
    if (benefitsInView) {
      benefitsControls.start('visible');
    }
    if (previewInView) {
      previewControls.start('visible');
    }
  }, [benefitsControls, previewControls, benefitsInView, previewInView]);

  const handleStartStory = () => {
    if (storyTitle.trim()) {
      navigate('/signup', { state: { title: storyTitle } });
    }
  };

  // Animation variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
        duration: 0.6,
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

  const benefitContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const benefitItemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const previewVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // Parallax effect for logo
  const logoYPosition = useMotionValue(0);
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      logoYPosition.set(latest * 0.2); // Adjust multiplier for parallax intensity
    });
    return () => unsubscribe();
  }, [scrollY, logoYPosition]);

  return (
    <motion.div
      className='landing-page'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className='logo-container'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        style={{ y: logoYPosition }}
      >
        <motion.h1 className='logo' variants={itemVariants}>
          Hi, I'm Story.
        </motion.h1>
        <motion.h5 className='intro' variants={itemVariants}>
          Your AI Powered Journaling Assistant.
        </motion.h5>
      </motion.div>

      <motion.div
        className='hero-section'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.p
          className='tagline'
          variants={itemVariants}
          whileInView={{
            scale: [1, 1.03, 1],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
          viewport={{ once: false, amount: 0.8 }}
        >
          "Your life is a story waiting to be written. Let's start documenting
          it together."
        </motion.p>

        <motion.div
          className='start-form'
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <label htmlFor='story-title' className='question-label'>
            If your life had a title, what would it be?
          </label>
          <input
            id='story-title'
            type='text'
            className='title-input'
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
            placeholder="Enter your life's title..."
          />
          <motion.button
            className='start-button'
            onClick={handleStartStory}
            disabled={!storyTitle.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Story
          </motion.button>
        </motion.div>

        <motion.div className='login-container' variants={itemVariants}>
          <p className='login'> Already have an account? Login Here </p>
          <motion.button
            className='login-btn'
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className='benefits-section'
        ref={benefitsRef}
        variants={benefitContainerVariants}
        initial='hidden'
        animate={benefitsControls}
      >
        <motion.h2
          className='section-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          What Story Offers
        </motion.h2>

        <ul className='benefits-list'>
          <motion.li
            className='benefit-item'
            variants={benefitItemVariants}
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className='benefit-icon'
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              🤖
            </motion.span>
            AI helps you document your life effortlessly
          </motion.li>
          <motion.li
            className='benefit-item'
            variants={benefitItemVariants}
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.span
              className='benefit-icon'
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              🎙️
            </motion.span>
            Voice and text journaling with AI organization
          </motion.li>
          <motion.li
            className='benefit-item'
            variants={benefitItemVariants}
            whileInView={{ x: [50, 0], opacity: [0, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.span
              className='benefit-icon'
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🕰️
            </motion.span>
            Relive past moments with deep timeline dives
          </motion.li>
        </ul>
      </motion.div>

      <motion.div
        className='preview-section'
        ref={previewRef}
        variants={previewVariants}
        initial='hidden'
        animate={previewControls}
      >
        <motion.div
          className='preview-card'
          whileInView={{
            y: [50, 0],
            opacity: [0, 1],
            boxShadow: [
              '0px 0px 0px rgba(0,0,0,0)',
              '0px 8px 20px rgba(0,0,0,0.12)',
            ],
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0px 8px 20px rgba(0,0,0,0.12)',
          }}
        >
          <h3 className='preview-title'>Sample Story Preview</h3>
          <p className='preview-text'>
            "My journey began with a simple dream to connect stories across
            time. Each day brought new discoveries, challenges, and moments of
            joy..."
          </p>

          <motion.button
            className='preview-more-btn'
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          ></motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className='scroll-indicator'
        initial={{ opacity: 1 }}
        animate={{
          y: [0, 10, 0],
          opacity: scrollY.get() > 100 ? 0 : 1,
        }}
        transition={{
          y: { repeat: Infinity, duration: 1.5 },
          opacity: { duration: 0.3 },
        }}
      >
        <span className='scroll-text'>Scroll to explore</span>
        <motion.div
          className='scroll-arrow'
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Add this custom hook to handle scroll animations
const useMotionValue = (value) => {
  const [motionValue, setMotionValue] = useState(value);
  return {
    get: () => motionValue,
    set: (newValue) => setMotionValue(newValue),
  };
};

export default LandingPage;
