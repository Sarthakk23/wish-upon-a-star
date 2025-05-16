import { motion } from 'framer-motion';
import PhotoGallery from '../components/PhotoGallery';
import PolaroidEffect from '../components/PolaroidEffect'; // Additional component

const MotionDiv = motion.div;

export default function Gallery() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <MotionDiv
          className="text-center mb-16"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h1 className="text-5xl font-bold text-pink-600 mb-4">
            Memory Lane
          </h1>
          <p className="text-xl text-pink-500">
            Our favorite moments together 💖
          </p>
        </MotionDiv>
        
        <PhotoGallery />
        <PolaroidEffect /> {/* Additional photo display option */}
      </div>
    </MotionDiv>
  );
}