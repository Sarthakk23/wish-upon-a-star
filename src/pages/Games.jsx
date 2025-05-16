import { motion } from 'framer-motion';
import DressUpGame from '../components/DressUpGame';
import MusicPlayer from '../components/MusicPlayer';
import MakeupPalette from '../components/MakeupPalette'; // Additional component

const MotionDiv = motion.div;

export default function Games() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 bg-gradient-to-b from-purple-100 to-pink-100"
    >
      <div className="max-w-6xl mx-auto px-4">
        <MotionDiv
          className="text-center mb-16"
          whileHover={{ scale: 1.02 }}
        >
          <h1 className="text-5xl font-bold text-pink-600 mb-4">
            Birthday Fun!
          </h1>
          <p className="text-xl text-pink-500">
            Play with these interactive games 🎮
          </p>
        </MotionDiv>
        
        <div className="space-y-24">
          <DressUpGame />
          <MusicPlayer />
          <MakeupPalette />
        </div>
      </div>
    </MotionDiv>
  );
}