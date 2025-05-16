import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import PrincessTiara from './PrincessTiara';

const MotionDiv = motion.div;
const MotionP = motion.p;

export default function Hero({ name = "Princess" }) {
  return (
    <section className="relative w-full h-screen bg-gradient-to-b from-pink-50 to-purple-100 overflow-hidden">
      {/* Sparkling Stars Background (larger particles) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 16 + 8}px`,
              height: `${Math.random() * 16 + 8}px`,
              background: `hsl(${Math.random() * 30 + 330}, 100%, 70%)`,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0], y: [0, -100] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center p-8 bg-white bg-opacity-70 rounded-3xl shadow-xl backdrop-blur-sm w-full max-w-4xl"
        >
          <PrincessTiara />

          {/* "Happy Birthday" on one line, name below with extra space */}
          <h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-purple-500 to-red-500 bg-clip-text text-transparent mb-4 drop-shadow-lg whitespace-nowrap"
          >
            Happy Birthday
            <br />
            <span className="inline-block mt-6">{name}!</span>
          </h1>

          <MotionP 
            className="text-3xl md:text-5xl font-semibold text-pink-600 mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              textShadow: [
                "0 0 10px rgba(255,255,255,0.3)",
                "0 0 20px rgba(255,105,180,0.5)",
                "0 0 10px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Your Day to Shine! ✨
          </MotionP>

          {/* Enhanced Cake Animation */}
          <MotionDiv
            className="text-8xl"
            animate={{ 
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎂🎁
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Floating Flowers “Confetti” ABOVE the text */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {['🌸', '🌺', '🌼'].map((flower, i) => (
          <MotionDiv
            key={i}
            className="absolute text-4xl opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
            }}
            animate={{
              y: ["100vh", "-100vh"],
              rotate: [0, 360],
              opacity: [0.8, 1, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {flower}
          </MotionDiv>
        ))}
      </div>

      {/* Floating Hearts (unchanged) */}
      <FloatingHearts count={30} />
    </section>
  );
}
