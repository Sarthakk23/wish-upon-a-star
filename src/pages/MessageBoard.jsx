import { motion } from 'framer-motion';
import Messages from '../components/Messages';
import ConfettiButton from '../components/ConfettiButton'; // Additional component

const MotionDiv = motion.div;

export default function MessageBoard() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-16 bg-gradient-to-b from-pink-100 to-purple-100"
    >
      <div className="max-w-4xl mx-auto px-4">
        <MotionDiv
          className="text-center mb-12"
          whileInView={{ rotate: [-2, 2, -2, 0] }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold text-pink-600 mb-4">
            Virtual Guestbook
          </h1>
          <ConfettiButton />
          <p className="text-lg text-pink-500 mt-4">
            Sign and leave your wishes for the birthday girl!
          </p>
        </MotionDiv>
        
        <Messages />
      </div>
    </MotionDiv>
  );
}