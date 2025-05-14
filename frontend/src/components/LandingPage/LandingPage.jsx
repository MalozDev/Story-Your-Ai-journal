import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import './LandingPage.css';

// Import your actual assets
import journalIcon from '../../assets/images/three.jpg';
import penIcon from '../../assets/images/two.jpg';
import calendarIcon from '../../assets/images/two.jpg';
import videoPoster from '../../assets/images/three.jpg';
import demoVideo from '../../assets/videos/demo.mp4';
import backgroundMusic from '../../assets/audio/background-music.mp3';
import avatar1 from '../../assets/images/four.jpg';
import avatar2 from '../../assets/images/one.jpg';
import avatar3 from '../../assets/images/three.jpg';
import previewImage1 from '../../assets/images/one.jpg';
import previewImage2 from '../../assets/images/three.jpg';
import backgroundImage from '../../assets/images/three.jpg';

const LandingPage = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted to prevent autoplay issues
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Controls for different sections
  const benefitsControls = useAnimation();
  const previewControls = useAnimation();
  const videoSectionControls = useAnimation();
  const testimonialControls = useAnimation();

  // Refs for sections we want to animate on scroll
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [previewRef, previewInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [videoSectionRef, videoSectionInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [testimonialRef, testimonialInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Sample testimonials
  const testimonials = [
    {
      quote: "This app has completely transformed how I document my life. The AI prompts make journaling effortless!",
      author: "Sarah K.",
      avatar: avatar1
    },
    {
      quote: "I've tried many journaling apps, but Story is different. It feels like having a personal biographer.",
      author: "Michael T.",
      avatar: avatar2
    },
    {
      quote: "The timeline feature lets me revisit memories I'd forgotten. It's like time travel for your life.",
      author: "Jamie L.",
      avatar: avatar3
    }
  ];

  // Handle scroll animations
  useEffect(() => {
    if (benefitsInView) benefitsControls.start('visible');
    if (previewInView) previewControls.start('visible');
    if (videoSectionInView) videoSectionControls.start('visible');
    if (testimonialInView) testimonialControls.start('visible');
  }, [
    benefitsControls, previewControls, videoSectionControls, testimonialControls,
    benefitsInView, previewInView, videoSectionInView, testimonialInView
  ]);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set a comfortable volume
      audioRef.current.muted = isMuted;
    }
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Handle video playback
  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => {
          console.log("Video play failed:", e);
          // Maybe show a user-friendly message here
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle audio mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Start video when it's in view
  useEffect(() => {
    if (videoSectionInView && videoRef.current && videoLoaded) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log("Auto-play prevented:", e);
          // Don't update isPlaying state here since play failed
        });
    }
  }, [videoSectionInView, videoLoaded]);

  const handleStartStory = () => {
    if (storyTitle.trim()) {
      navigate('/signup', { state: { title: storyTitle } });
    }
  };

  // Animation variants
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

  // Function to handle image errors 
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.src = 'https://via.placeholder.com/150'; // Fallback image
  };

  return (
    <motion.div
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background audio */}
      <audio 
        ref={audioRef}
        loop
        preload="auto"
        className="background-audio"
      >
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Audio controls */}
      <motion.div 
        className="audio-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button onClick={toggleMute} className="audio-toggle-btn">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <span className="audio-label">{isMuted ? "Sound Off" : "Sound On"}</span>
      </motion.div>

      {/* Hero Section with background image */}
      <div 
        className="hero-wrapper"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div className="hero-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
        }}></div>

        <motion.div
          className="logo-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            zIndex: 2, // Place above the overlay
            textAlign: 'center',
            padding: '4rem 1rem',
            color: '#fff', // White text for better contrast
          }}
        >
          <motion.h1 className="logo" variants={itemVariants}>
            Hi, I'm Story.
          </motion.h1>
          <motion.h5 className="intro" variants={itemVariants}>
            Your AI Powered Journaling Assistant.
          </motion.h5>
        </motion.div>

        <motion.div
          className="hero-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative',
            zIndex: 2, // Place above the overlay
          }}
        >
          <motion.p
            className="tagline"
            variants={itemVariants}
            style={{
              color: '#fff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
            }}
          >
            "Your life is a story waiting to be written. Let's start documenting it together."
          </motion.p>

          <motion.div
            className="start-form"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <label htmlFor="story-title" className="question-label" style={{color: '#fff'}}>
              If your life had a title, what would it be?
            </label>
            <input
              id="story-title"
              type="text"
              className="title-input"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Enter your life's title..."
            />
            <motion.button
              className="start-button"
              onClick={handleStartStory}
              disabled={!storyTitle.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Story
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Section */}
      <motion.div 
        className="video-section"
        ref={videoSectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={videoSectionControls}
      >
        <motion.h2 
          className="section-title"
          variants={itemVariants}
        >
          See How Story Works
        </motion.h2>
        
        <motion.div 
          className="video-container"
          variants={itemVariants}
        >
          <div className="video-wrapper">
            <video 
              ref={videoRef}
              className="feature-video"
              poster={videoPoster}
              preload="metadata"
              onLoadedData={() => setVideoLoaded(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => console.log("Video error:", e)}
            >
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="video-overlay">
              <button 
                className="play-pause-btn"
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={48} /> : <Play size={48} />}
              </button>
            </div>
          </div>
          
          <p className="video-caption">
            Watch how Story helps you document life's moments with ease
          </p>
        </motion.div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        className="benefits-section"
        ref={benefitsRef}
        variants={benefitContainerVariants}
        initial="hidden"
        animate={benefitsControls}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          What Story Offers
        </motion.h2>

        <div className="benefits-grid">
          <motion.div
            className="benefit-card"
            variants={benefitItemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <motion.span
              className="benefit-icon"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              🤖
            </motion.span>
            <h3>AI Assistance</h3>
            <p>Document your life effortlessly with AI-powered journaling prompts</p>
          </motion.div>

          <motion.div
            className="benefit-card"
            variants={benefitItemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <motion.span
              className="benefit-icon"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              🎙️
            </motion.span>
            <h3>Voice Journal</h3>
            <p>Speak your thoughts and let Story organize them beautifully</p>
          </motion.div>

          <motion.div
            className="benefit-card"
            variants={benefitItemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <motion.span
              className="benefit-icon"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🕰️
            </motion.span>
            <h3>Timeline Dive</h3>
            <p>Relive past moments with deep timeline exploration</p>
          </motion.div>

          <motion.div
            className="benefit-card"
            variants={benefitItemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <motion.span
              className="benefit-icon"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              📊
            </motion.span>
            <h3>Life Insights</h3>
            <p>Discover patterns and themes in your life journey</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="testimonials-section"
        ref={testimonialRef}
        variants={containerVariants}
        initial="hidden"
        animate={testimonialControls}
      >
        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          What Users Say
        </motion.h2>

        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: index === activeTestimonial ? 1 : 0, 
                x: index === activeTestimonial ? 0 : 50,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-content">
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="author-avatar" 
                    onError={handleImageError}
                  />
                  <span className="author-name">{testimonial.author}</span>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        className="preview-section"
        ref={previewRef}
        variants={previewVariants}
        initial="hidden"
        animate={previewControls}
      >
        <motion.h2
          className="section-title"
          variants={itemVariants}
        >
          Your Story Preview
        </motion.h2>

        <div className="preview-gallery">
          <motion.div
            className="preview-card"
            whileInView={{
              y: [50, 0],
              opacity: [0, 1],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 8px 20px rgba(0,0,0,0.12)",
              ],
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <div className="preview-image-container">
              <img 
                src={previewImage1} 
                alt="Journal preview" 
                className="preview-image" 
                onError={handleImageError}
              />
            </div>
            <h3 className="preview-title">Daily Reflections</h3>
            <p className="preview-text">
              "My journey began with a simple dream to connect stories across
              time. Each day brought new discoveries, challenges, and moments of
              joy..."
            </p>
          </motion.div>

          <motion.div
            className="preview-card"
            whileInView={{
              y: [50, 0],
              opacity: [0, 1],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 8px 20px rgba(0,0,0,0.12)",
              ],
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <div className="preview-image-container">
              <img 
                src={previewImage2} 
                alt="Timeline view" 
                className="preview-image" 
                onError={handleImageError}
              />
            </div>
            <h3 className="preview-title">Your Timeline View</h3>
            <p className="preview-text">
              "Looking back at 2023, I realized how much ground I've covered. The visual timeline helped me see patterns in my growth journey..."
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Get Started Section */}
      <motion.div
        className="get-started-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="cta-title">Ready to Begin Your Story?</h2>
        <p className="cta-description">Join thousands of others who are documenting their life journey with AI assistance</p>
        
        <div className="cta-buttons">
          <motion.button
            className="start-button cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
          >
            Start For Free
          </motion.button>
          
          <motion.div className="login-container">
            <p className="login">Already have an account?</p>
            <motion.button
              className="login-btn"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
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
        <span className="scroll-text">Scroll to explore</span>
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;