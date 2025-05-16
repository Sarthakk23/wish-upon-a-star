import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import {
  Hero,
  JewelryBoxWithHearts, // Changed import
  PhotoGallery,
  BirthdayWishes,
  MusicPlayer,
  CakeAnimation,
  DressUpGame,
  Messages,
  PrincessTiara
} from './components'

import './styles/animations.css'
import './styles/globals.css'
import './styles/components.css'
import './styles/responsive.css'
import './styles/themes.css'
import './App.css'

const MotionDiv = motion.div

export default function App() {
  const [name] = useState('Tannu')
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-pink-50 to-purple-50 overflow-x-hidden">
      {showConfetti && typeof window !== 'undefined' && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#ff6b8b', '#ff8e9e', '#ffb3c6', '#ec4899', '#a855f7']}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      <main className="flex-grow w-full">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Hero name={name} />

          <div className="w-full space-y-24 px-4 py-12">
            <PrincessTiara />
            <JewelryBoxWithHearts /> {/* Replaced JewelryBox */}
            <PhotoGallery />
            <BirthdayWishes />
            <MusicPlayer />
            <CakeAnimation />
            <DressUpGame />
          </div>
        </MotionDiv>
      </main>

      <footer className="w-full py-6 bg-gradient-to-b from-purple-100 to-pink-200 text-center">
        <MotionDiv whileHover={{ scale: 1.05 }} className="inline-block">
          <p className="text-2xl font-display text-pink-600 mb-2">
            Made with 💖 for Tannu's special day!
          </p>
          <p className="text-sm text-pink-500">
            © {new Date().getFullYear()} - Happy Birthday Ranii!
          </p>
        </MotionDiv>
      </footer>
    </div>
  )
}