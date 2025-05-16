import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Explicitly assign to variable to satisfy linter
const MotionDiv = motion.div;

const heartEmojis = ['💖', '💗', '💓', '💘', '💝', '💞', '✨', '🌸', '🎀'];
const heartColors = ['text-pink-400', 'text-red-300', 'text-purple-300', 'text-rose-300', 'text-fuchsia-400'];

export default function FloatingHearts({ count = 15 }) {
  const [hearts, setHearts] = useState([]);
  const [clickedHearts, setClickedHearts] = useState([]);

  // Initialize hearts
  useEffect(() => {
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 25 + 15,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        left: Math.random() * 100,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        rotation: Math.random() * 360,
        xMovement: (Math.random() - 0.5) * 40,
        startY: 100 + Math.random() * 20,
        pulseSpeed: 2 + Math.random() * 3
      }))
    );
  }, [count]);

  const handleHeartClick = (id) => {
    if (!clickedHearts.includes(id)) {
      setClickedHearts([...clickedHearts, id]);
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
        setClickedHearts(prev => prev.filter(heartId => heartId !== id));
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[999]">
      {hearts.map((heart) => (
        <MotionDiv
          key={heart.id}
          className={`absolute ${heart.color} cursor-pointer pointer-events-auto`}
          style={{
            left: `${heart.left}%`,
            top: `${heart.startY}%`,
            fontSize: `${heart.size}px`,
            rotate: heart.rotation,
            zIndex: 10
          }}
          animate={{
            y: [`${heart.startY}%`, `-20%`],
            x: [0, heart.xMovement],
            rotate: [heart.rotation, heart.rotation + 360],
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.2, 1]
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              ease: "linear"
            },
            x: {
              duration: heart.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: heart.duration * 2,
              repeat: Infinity,
              ease: "linear"
            },
            opacity: {
              duration: heart.pulseSpeed,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: heart.pulseSpeed,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{
            scale: 1.8,
            transition: { duration: 0.2 }
          }}
          whileTap={{
            scale: 2.5,
            opacity: 0,
            transition: { duration: 0.5 }
          }}
          onClick={() => handleHeartClick(heart.id)}
        >
          {heart.emoji}
        </MotionDiv>
      ))}
    </div>
  );
}