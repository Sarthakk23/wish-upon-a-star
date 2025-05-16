import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from 'react-confetti';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionTextarea = motion.textarea;

// Replace with your Google Form's POST endpoint and entry ID
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfCXUVKNaQFBek4v-XO9PHg4eZtkHkTsfRhB3KS_NrQlk6YFQ/formResponse';
const GOOGLE_FORM_ENTRY = 'entry.1262880168';

// Default wishes by you
const DEFAULT_MESSAGES = [
  { id: 1, text: "On your special day, I wish you All the happiness your heart can hold", author: "Me" },
  { id: 2, text: "Happy Birthday! Your smile is my favorite little bit of magic—never stop casting that spell.", author: "Obviously Me" },
  { id: 3, text: "To the sweetest soul I know: Your kindness is like a warm hug for the soul—thank you for always being there to lift me up.", author: "Still Me" },
  { id: 4, text: "Wishing you a magical day! Your eyes sparkle with stories I never want to stop reading.", author: "Yes Again Me" },
  { id: 5, text: "Happy Birthday! You strolled into my world and quietly turned every ordinary moment into something I didn’t even know I was missing.", author: "Finally Me" },
];

// Floating background shapes
const floatingShapes = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 40 + 20,
  delay: Math.random() * 2,
  duration: Math.random() * 8 + 4,
  rotate: Math.random() * 360,
  type: ['🌸', '🌺', '💮', '🏵️', '🎀'][i % 5]
}));

export default function BirthdayWishes() {
  const [newMessage, setNewMessage] = useState('');
  const [currentMessages] = useState(DEFAULT_MESSAGES);
  const [isWriting, setIsWriting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // send to Google Form
    const formData = new FormData();
    formData.append(GOOGLE_FORM_ENTRY, newMessage);
    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
    } catch (err) {
      // no-cors fallback
    }

    setShowConfetti(true);
    setFeedback('Your wish was heard! 🎉');
    setNewMessage('');
    setTimeout(() => {
      setShowConfetti(false);
      setFeedback('');
    }, 3000);
  };

  return (
    <div className="relative min-h-screen py-16 px-4 bg-gradient-to-b from-pink-100 to-purple-200 overflow-hidden">
      {/* Floating background animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingShapes.map((shape) => (
          <MotionDiv
            key={shape.id}
            className="absolute text-4xl opacity-40"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              fontSize: `${shape.size}px`,
            }}
            initial={{ y: 0, rotate: shape.rotate, opacity: 0 }}
            animate={{ y: [0, -100, 0], rotate: shape.rotate + 360, opacity: [0, 0.6, 0] }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {shape.type}
          </MotionDiv>
        ))}
      </div>

      {showConfetti && (
        <Confetti 
          recycle={false}
          numberOfPieces={200}
          colors={['#ec4899', '#f472b6', '#d946ef', '#ffffff']}
          run={showConfetti}
        />
      )}

      <MotionDiv
        className="max-w-4xl mx-auto relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-600 drop-shadow-lg">
          Birthday Wishes 💌
        </h2>

        <div className="grid gap-6 mb-12">
          {currentMessages.map((message, index) => (
            <MotionDiv
              key={message.id}
              className={`p-6 rounded-3xl shadow-lg ${
                index % 2 === 0 
                  ? 'bg-white/90 text-pink-800 ml-auto' 
                  : 'bg-pink-500/90 text-white mr-auto'
              } max-w-md`}
              initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg mb-2">{message.text}</p>
              <p className="text-sm opacity-80">- {message.author}</p>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg max-w-md mx-auto relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">
            Leave Your Wish ✨
          </h3>
          <form onSubmit={handleSubmit}>
            <MotionTextarea
              className="w-full p-4 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:outline-none mb-4"
              placeholder="Write your birthday wish..."
              rows="4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onFocus={() => setIsWriting(true)}
              onBlur={() => setIsWriting(false)}
              animate={{
                scale: isWriting ? 1.02 : 1,
                borderColor: isWriting ? '#ec4899' : '#fbcfe8',
                background: isWriting ? '#fff' : '#fdf2f8'
              }}
              transition={{ duration: 0.2 }}
            />
            <MotionButton
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold relative overflow-hidden mb-2"
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Wish 💝
            </MotionButton>
            {feedback && (
              <p className="text-center text-green-600 mt-2">{feedback}</p>
            )}
          </form>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}
