import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionImg = motion.img;

const dressItems = {
  dresses: [
    { id: 1, name: "Pink Gown", emoji: "👗", color: "bg-pink-400", image: "/assets/images/dresses/pink-gown.png" },
    { id: 2, name: "Blue Dress", emoji: "👘", color: "bg-blue-400", image: "/assets/images/dresses/blue-dress.png" },
    { id: 3, name: "Princess", emoji: "👑", color: "bg-purple-400", image: "/assets/images/dresses/princess.png" },
  ],
  accessories: [
    { id: 1, name: "Tiara", emoji: "👑", image: "/assets/images/accessories/tiara.png" },
    { id: 2, name: "Necklace", emoji: "📿", image: "/assets/images/accessories/necklace.png" },
    { id: 3, name: "Earrings", emoji: "💎", image: "/assets/images/accessories/earrings.png" },
  ]
};

export default function DressUpGame() {
  const [selectedDress, setSelectedDress] = useState(null);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [showOutfit, setShowOutfit] = useState(false);

  const toggleAccessory = (accessory) => {
    if (selectedAccessories.some(a => a.id === accessory.id)) {
      setSelectedAccessories(selectedAccessories.filter(a => a.id !== accessory.id));
    } else {
      setSelectedAccessories([...selectedAccessories, accessory]);
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-purple-100 to-pink-100">
      <MotionDiv 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-8">
          Princess Dress Up 👗
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Doll base */}
          <MotionDiv 
            className="relative bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-xl h-96 flex items-center justify-center"
            whileHover={{ scale: 1.01 }}
          >
            {selectedDress ? (
              <>
                <MotionImg
                  src={selectedDress.image}
                  alt={selectedDress.name}
                  className="absolute inset-0 w-full h-full object-contain p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                {selectedAccessories.map(accessory => (
                  <MotionImg
                    key={accessory.id}
                    src={accessory.image}
                    alt={accessory.name}
                    className="absolute inset-0 w-full h-full object-contain p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  />
                ))}
              </>
            ) : (
              <div className="text-8xl">👸</div>
            )}

            <MotionButton
              className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full ${
                selectedDress ? 'bg-pink-500' : 'bg-gray-300'
              } text-white`}
              onClick={() => setShowOutfit(true)}
              disabled={!selectedDress}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedDress ? "Show My Outfit!" : "Pick a Dress First"}
            </MotionButton>
          </MotionDiv>

          {/* Dress selection */}
          <div>
            <h3 className="text-2xl font-bold text-pink-700 mb-4">Choose a Dress</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {dressItems.dresses.map(dress => (
                <MotionButton
                  key={dress.id}
                  className={`p-4 rounded-2xl flex flex-col items-center ${
                    selectedDress?.id === dress.id 
                      ? 'ring-4 ring-pink-500' 
                      : 'bg-white'
                  }`}
                  onClick={() => setSelectedDress(dress)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-12 h-12 rounded-full ${dress.color} flex items-center justify-center text-2xl mb-2`}>
                    {dress.emoji}
                  </div>
                  <span className="text-sm">{dress.name}</span>
                </MotionButton>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-pink-700 mb-4">Add Accessories</h3>
            <div className="grid grid-cols-3 gap-4">
              {dressItems.accessories.map(accessory => (
                <MotionButton
                  key={accessory.id}
                  className={`p-4 rounded-2xl flex flex-col items-center ${
                    selectedAccessories.some(a => a.id === accessory.id)
                      ? 'bg-pink-100 ring-2 ring-pink-400'
                      : 'bg-white'
                  }`}
                  onClick={() => toggleAccessory(accessory)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-2">
                    {accessory.emoji}
                  </div>
                  <span className="text-sm">{accessory.name}</span>
                </MotionButton>
              ))}
            </div>
          </div>
        </div>

        {showOutfit && (
          <MotionDiv
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowOutfit(false)}
          >
            <MotionDiv 
              className="relative bg-white rounded-3xl p-8 max-w-md text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h3 className="text-3xl font-bold text-pink-600 mb-4">Your Princess Outfit!</h3>
              <div className="relative h-64 mb-6">
                <MotionImg
                  src={selectedDress.image}
                  alt={selectedDress.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
                {selectedAccessories.map(accessory => (
                  <MotionImg
                    key={accessory.id}
                    src={accessory.image}
                    alt={accessory.name}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ))}
              </div>
              <MotionButton
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save This Look! 💾
              </MotionButton>
            </MotionDiv>
          </MotionDiv>
        )}
      </MotionDiv>
    </div>
  );
}