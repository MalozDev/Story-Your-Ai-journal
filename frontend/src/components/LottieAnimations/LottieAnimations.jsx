// src/components/LottieAnimation/LottieAnimation.jsx
import { useLottie } from 'lottie-react';
import { motion } from 'framer-motion';
import './LottieAnimation.css';

const LottieAnimation = ({
  animationData,
  width = 150,
  height = 'auto',
  loop = true,
  autoplay = true,
  className = '',
  style = {},
  variants,
  initial = { opacity: 0, scale: 0.8 },
  animate = { opacity: 1, scale: 1 },
  transition = { duration: 0.6, ease: 'easeOut' },
}) => {
  const options = {
    animationData,
    loop,
    autoplay,
    style: {
      width,
      height,
      ...style,
    },
  };

  const { View } = useLottie(options);

  return (
    <motion.div
      className={`lottie-wrapper ${className}`}
      variants={variants}
      initial={variants ? 'initial' : initial}
      animate={variants ? 'animate' : animate}
      transition={transition}
    >
      {View}
    </motion.div>
  );
};

export default LottieAnimation;
