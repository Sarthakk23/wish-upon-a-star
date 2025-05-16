import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

// Replace the emojis with actual image paths (update src fields to your real photo URLs)
const jewelryItems = [
  { id: 1, name: 'Diamond Necklace', src: 'assets/images/gift/necklace.png', color: 'text-blue-300' },
  { id: 2, name: 'Pearl Earrings', src: 'assets/images/gift/earring.png', color: 'text-gray-200' },
  { id: 3, name: 'Ruby Ring', src: 'assets/images/gift/ring.png', color: 'text-red-400' },
  { id: 4, name: 'Gold Bracelet', src: 'assets/images/gift/bracelet.png', color: 'text-yellow-400' },
];

const heartEmojis = ['💖', '💗', '💓', '💘', '💝', '💞', '✨', '🌸', '🎀'];
const heartColors = ['text-pink-400', 'text-red-300', 'text-purple-300', 'text-rose-300', 'text-fuchsia-400'];

export default function JewelryBoxWithHearts() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [poppedHearts, setPoppedHearts] = useState(new Set());

  // Initialize hearts
  useEffect(() => {
    const initialHearts = Array.from({ length: 50 }, (_, i) => createHeart(i));
    setHearts(initialHearts);
  }, []);

  const createHeart = (id) => ({
    id,
    size: Math.random() * 25 + 15,
    duration: Math.random() * 10 + 5,
    left: Math.random() * 100,
    startTop: Math.random() * 100,
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
    emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    rotation: Math.random() * 360,
    xMovement: (Math.random() - 0.5) * 0.5,
    yMovement: (Math.random() - 0.5) * 0.5,
    zIndex: Math.random() > 0.5 ? 5 : 1
  });

  const handleHeartClick = (heartId) => {
    setPoppedHearts(prev => new Set([...prev, heartId]));
    setTimeout(() => {
      setHearts(prev => prev.map(heart =>
        heart.id === heartId ? createHeart(heartId) : heart
      ));
      setPoppedHearts(prev => {
        const newSet = new Set(prev);
        newSet.delete(heartId);
        return newSet;
      });
    }, 800);
  };

  return (
    <div className="relative flex flex-col items-center py-12 bg-gradient-to-b from-pink-100 to-purple-100 min-h-[500px] overflow-visible">
      {/* Floating Hearts */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
        {hearts.map((heart) => (
          <MotionDiv
            key={heart.id}
            className={`absolute ${heart.color} cursor-pointer`}
            style={{
              left: `${heart.left}%`,
              top: `${heart.startTop}%`,
              fontSize: `${heart.size}px`,
              rotate: heart.rotation,
              zIndex: heart.zIndex
            }}
            animate={{
              y: [`${heart.startTop}%`, `${heart.startTop + heart.yMovement * 50}%`],
              x: [`${heart.left}%`, `${heart.left + heart.xMovement * 50}%`],
              rotate: heart.rotation + 360,
              opacity: poppedHearts.has(heart.id) ? [1, 0] : [1, 1],
              scale: poppedHearts.has(heart.id) ? [1, 1.5, 0] : [1, 1.1, 1]
            }}
            transition={{
              y: {
                duration: heart.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              },
              x: {
                duration: heart.duration * 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              },
              rotate: {
                duration: heart.duration * 2,
                repeat: Infinity,
                ease: "linear"
              },
              opacity: {
                duration: 0.3,
                ease: "easeOut"
              },
              scale: {
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            onClick={() => handleHeartClick(heart.id)}
          >
            {!poppedHearts.has(heart.id) && heart.emoji}
          </MotionDiv>
        ))}
      </div>

      {/* Jewelry Box Section */}
      <div className="relative z-10 flex flex-col items-center">
        {/* New Title */}
        <h2 className="text-4xl md:text-6xl font-cursive bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          Jewelry Box
        </h2>

        <MotionDiv 
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MotionDiv
            className="w-48 h-32 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-lg shadow-xl border-4 border-yellow-500 flex items-center justify-center"
            animate={{ rotateZ: isOpen ? -15 : 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-4xl">💍</div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-600 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>

        {isOpen && (
          <MotionDiv
            className="mt-8 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {jewelryItems.map((item) => (
              <MotionButton
                key={item.id}
                className={`p-4 rounded-lg bg-white bg-opacity-90 backdrop-blur-sm shadow-md flex flex-col items-center ${item.color}`}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-16 h-16 object-cover mb-2 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </MotionButton>
            ))}
          </MotionDiv>
        )}

        {selectedItem && (
          <MotionDiv
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedItem(null)}
          >
            <MotionDiv 
              className="bg-white p-8 rounded-2xl max-w-sm text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <img
                src={selectedItem.src}
                alt={selectedItem.name}
                className={`w-24 h-24 mb-4 object-cover rounded-full ${selectedItem.color}`}
              />
              <h3 className="text-2xl font-bold text-pink-600 mb-2">
                {selectedItem.name}
              </h3>
              <p className="text-gray-600 mb-4">
                This beautiful {selectedItem.name.toLowerCase()} is for you!
              </p>
              <MotionButton
                className="px-6 py-2 bg-pink-500 text-white rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Gift 💝
              </MotionButton>
            </MotionDiv>
          </MotionDiv>
        )}
      </div>
    </div>
  );
}
