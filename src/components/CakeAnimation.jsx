import { motion } from 'framer-motion';
import { useState } from 'react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 

const MotionDiv = motion.div;
const MotionButton = motion.button;

const candleColors = ['#ff6b8b', '#ff8e9e', '#ffb3c6', '#ffd700', '#ec4899'];

const floatingPetals = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  startX: Math.random() * 100,
  size: Math.random() * 25 + 10,
  delay: Math.random() * 2,
  duration: Math.random() * 8 + 5,
  rotation: Math.random() * 360,
  type: ['🌸', '🌺', '🌼', '🏵️'][i % 4]
}));

export default function CakeAnimation() {
  const [candlesLit, setCandlesLit] = useState(Array(5).fill(false));
  const [isBlowing, setIsBlowing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const toggleCandle = (index) => {
    const newCandles = [...candlesLit];
    newCandles[index] = !newCandles[index];
    setCandlesLit(newCandles);
  };

  const blowAllCandles = () => {
    setIsBlowing(true);
    setTimeout(() => {
      setCandlesLit(Array(5).fill(false));
      setIsBlowing(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }, 1000);
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-pink-50 to-purple-50 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 80 },
              color: { value: ["#fbcfe8", "#f9a8d4", "#ec4899"] },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
              size: { value: 2 },
              move: {
                enable: true,
                speed: 3,
                direction: "top",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
              },
              links: {
                enable: true,
                distance: 150,
                color: "#f9a8d4",
                opacity: 0.2,
                width: 1
              }
            }
          }}
        />
      </div>

      {/* Floating Petal Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingPetals.map((petal) => (
          <MotionDiv
            key={petal.id}
            className="absolute text-3xl opacity-40"
            style={{
              left: `${petal.startX}%`,
              fontSize: `${petal.size}px`,
            }}
            initial={{ 
              y: '100vh',
              rotate: petal.rotation,
              opacity: 0
            }}
            animate={{ 
              y: '-100vh',
              rotate: petal.rotation + 360,
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {petal.type}
          </MotionDiv>
        ))}
      </div>

      <MotionDiv 
        className="max-w-md mx-auto text-center relative z-10 h-full flex flex-col justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-pink-600 mb-8">
          Make a Wish! 🎂
        </h2>

        <MotionDiv 
          className="relative bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-xl mx-4"
          whileHover={{ scale: 1.01 }}
        >
          {/* Cake layers */}
          <MotionDiv 
            className="relative mx-auto w-64 h-40"
            animate={{ y: isBlowing ? [0, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Bottom layer */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-16 bg-gradient-to-b from-amber-300 to-amber-400 rounded-b-lg" />
            
            {/* Middle layer */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-12 bg-gradient-to-b from-pink-300 to-pink-400 rounded-b-lg" />
            
            {/* Top layer */}
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-32 h-10 bg-gradient-to-b from-white to-pink-200 rounded-b-lg" />
            
            {/* Frosting details */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-pink-100 rounded-full" />
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-white rounded-full" />
            
            {/* Candles */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 w-full">
              {candlesLit.map((lit, index) => (
                <MotionDiv
                  key={index}
                  className="relative w-4 h-12 cursor-pointer"
                  onClick={() => toggleCandle(index)}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-white to-gray-200 rounded-sm" />
                  {lit && (
                    <MotionDiv
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-6 rounded-full"
                      style={{ backgroundColor: candleColors[index] }}
                      animate={{ 
                        opacity: [0.8, 1, 0.8],
                        scaleY: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>

          <MotionButton
            className={`mt-8 px-6 py-3 rounded-full text-white font-bold ${
              candlesLit.some(lit => lit) 
                ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                : 'bg-gray-300'
            }`}
            onClick={blowAllCandles}
            disabled={!candlesLit.some(lit => lit)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isBlowing ? '💨 Blowing...' : '🎉 Blow All Candles!'}
          </MotionButton>

          {showMessage && (
            <MotionDiv
              className="mt-6 p-4 bg-pink-100 rounded-lg text-pink-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✨ Your wish will come true! ✨
            </MotionDiv>
          )}
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}