import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import JewelryBox from '../components/JewelryBox';
import CakeAnimation from '../components/CakeAnimation';

const MotionDiv = motion.div;

export default function Home() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero name="Sarah" /> {/* Replace with actual name */}
      
      <div className="space-y-24 pb-16">
        <JewelryBox />
        <CakeAnimation />
        
        <MotionDiv 
          className="text-center py-12"
          whileInView={{ y: [20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-pink-600 mb-6">
            Explore More! ✨
          </h2>
          <p className="text-xl text-pink-500 max-w-2xl mx-auto">
            Check out the gallery, leave a wish, or play dress-up!
          </p>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}