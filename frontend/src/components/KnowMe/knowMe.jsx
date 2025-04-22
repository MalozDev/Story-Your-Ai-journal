import React, { useEffect } from 'react';
import './KnowMe.css';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const KnowMe = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Animation controls for different sections
  const controls = {
    chapterProgress: useAnimation(),
    todaysMemory: useAnimation(),
    chapters: useAnimation(),
  };

  // Reference elements with lower thresholds for mobile
  const sections = {
    chapterProgress: useInView({ triggerOnce: true, threshold: 0.1 }),
    todaysMemory: useInView({ triggerOnce: true, threshold: 0.1 }),
    chapters: useInView({ triggerOnce: true, threshold: 0.1 }),
  };

  // Trigger animations when sections come into view
  useEffect(() => {
    if (sections.chapterProgress[1]) controls.chapterProgress.start('visible');
    if (sections.todaysMemory[1]) controls.todaysMemory.start('visible');
    if (sections.chapters[1]) controls.chapters.start('visible');
  }, [
    sections.chapterProgress[1],
    sections.todaysMemory[1],
    sections.chapters[1],
    controls,
  ]);

  // Simplified animation variants with reduced motion
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          staggerChildren: 0.15,
          duration: 0.4,
        },
      },
    },
    item: {
      hidden: { y: 15, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      },
    },
    card: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
      hover: {
        y: -3,
        boxShadow: '0px 6px 12px rgba(0,0,0,0.08)',
        transition: { duration: 0.2 },
      },
    },
    book: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (index) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: index * 0.15,
          duration: 0.4,
        },
      }),
    },
  };

  return (
    <motion.div
      className='know-me-container'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        className='know-me-header'
        style={{
          opacity: scrollY.get() > 100 ? 0.9 : 1,
          transform: `translateY(${Math.min(0, scrollY.get() * -0.1)}px)`,
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Know Me
        </motion.h1>
      </motion.header>

      {/* Chapter Progress */}
      <motion.div
        className='chapter-progress-container'
        ref={sections.chapterProgress[0]}
        variants={animations.container}
        initial='hidden'
        animate={controls.chapterProgress}
      >
        <motion.div className='chapter-shelf' variants={animations.item}>
          {['completed', 'in-progress', 'not-started', 'not-started'].map(
            (status, index) => (
              <motion.div
                key={index}
                className={`book ${status}`}
                custom={index}
                variants={animations.book}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              />
            )
          )}
        </motion.div>
        <motion.p className='progress-text' variants={animations.item}>
          Life chapters in progress
        </motion.p>
      </motion.div>

      {/* Today's Memory */}
      <motion.section
        className='todays-memory'
        ref={sections.todaysMemory[0]}
        variants={animations.container}
        initial='hidden'
        animate={controls.todaysMemory}
      >
        <motion.h2 variants={animations.item}>Today's Memory:</motion.h2>
        <motion.div
          className='memory-card'
          variants={animations.card}
          whileHover='hover'
        >
          <motion.p className='memory-question' variants={animations.item}>
            Tell me about your childhood home. What stands out most?
          </motion.p>
          <motion.div
            className='memory-image-suggestion'
            variants={animations.item}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className='image-placeholder'
              whileHover={{
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
              }}
            ></motion.div>
            <motion.p className='image-text'>Add a photo of your home</motion.p>
          </motion.div>
          <motion.div className='memory-actions' variants={animations.item}>
            <motion.button
              className='memory-button primary'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Answer
            </motion.button>
            <motion.button
              className='memory-button secondary'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Remind Later
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Chapters in Progress */}
      <motion.section
        className='chapters-progress'
        ref={sections.chapters[0]}
        variants={animations.container}
        initial='hidden'
        animate={controls.chapters}
      >
        <motion.h2 variants={animations.item}>Chapters In Progress:</motion.h2>

        {[
          { title: 'Childhood Years', progress: '30%' },
          { title: 'School Days', progress: '15%' },
          { title: 'Social life', progress: '6%' },
        ].map((chapter, index) => (
          <motion.div
            key={index}
            className='chapter-card'
            variants={animations.card}
            custom={index}
            whileHover='hover'
          >
            <motion.h3 className='chapter-title'>{chapter.title}</motion.h3>
            <div className='progress-bar'>
              <motion.div
                className='progress'
                initial={{ width: '0%' }}
                animate={{ width: chapter.progress }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.8,
                  ease: 'easeOut',
                }}
              ></motion.div>
            </div>
          </motion.div>
        ))}

        <motion.button
          className='view-all-chapters'
          variants={animations.item}
          whileHover={{ scale: 1.03, backgroundColor: '#f0f0f0' }}
          whileTap={{ scale: 0.97 }}
        >
          See All Chapters
        </motion.button>
      </motion.section>

      {/* Bottom Navigation */}
      <motion.nav
        className='bottom-nav'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {[
          { icon: '🏠', label: 'Home', path: '/dashboard' },
          { icon: '👤', label: 'Know me', active: true },
          { icon: '🤖', label: 'Insights', path: '/Insights' },
          { icon: '📊', label: 'Timeline', path: '/timeline' },
          { icon: '⚙️', label: 'Goals', path: '/goals' },
        ].map((item, index) => (
          <motion.button
            key={index}
            className={`nav-button ${item.active ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.07, duration: 0.3 }}
            onClick={() => item.path && navigate(item.path)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span className='nav-icon'>{item.icon}</motion.span>
            <span className='nav-label'>{item.label}</span>
          </motion.button>
        ))}
      </motion.nav>

      {/* Floating action button */}
      <motion.div
        className='floating-add-button'
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.4,
          type: 'spring',
          stiffness: 260,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        +
      </motion.div>
    </motion.div>
  );
};

export default KnowMe;
