import { motion } from 'framer-motion';

// Assign to variable to satisfy linter
const MotionDiv = motion.div;

export default function PrincessTiara() {
  return (
    <MotionDiv
      className="relative mb-6"
      animate={{
        y: [0, -10, 0],
        rotateZ: [-5, 5, -5, 5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="text-5xl">👑</div>
      <div className="absolute inset-0 flex justify-center -top-2">
        {[...Array(5)].map((_, i) => (
          <MotionDiv
            key={i}
            className="w-1 h-4 bg-yellow-300 rounded-full absolute"
            style={{
              left: `${i * 20}%`,
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scaleY: [1, 1.3, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </MotionDiv>
  );
}