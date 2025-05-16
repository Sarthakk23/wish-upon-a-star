import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

const jewelryItems = [
  { id: 1, name: 'Diamond Necklace', emoji: '💎', color: 'text-blue-300' },
  { id: 2, name: 'Pearl Earrings', emoji: '⚪', color: 'text-gray-200' },
  { id: 3, name: 'Ruby Ring', emoji: '🔴', color: 'text-red-400' },
  { id: 4, name: 'Gold Bracelet', emoji: '📿', color: 'text-yellow-400' },
];

export default function JewelryBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="flex flex-col items-center py-12 bg-gradient-to-b from-pink-100 to-purple-100">
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
              className={`p-4 rounded-lg bg-white bg-opacity-80 backdrop-blur-sm shadow-md flex flex-col items-center ${item.color}`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedItem(item)}
            >
              <span className="text-3xl mb-2">{item.emoji}</span>
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
            <div className={`text-6xl mb-4 ${selectedItem.color}`}>
              {selectedItem.emoji}
            </div>
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
  );
}