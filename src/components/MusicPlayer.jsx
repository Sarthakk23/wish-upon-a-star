import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

const songs = [
  { id: 1, title: "Happy Birthday", emoji: "🎂", src: "/assets/audio/happy-birthday.mp3" },
  { id: 2, title: "Princess Theme", emoji: "👑", src: "/assets/audio/princess-theme.mp3" },
  { id: 3, title: "Celebration", emoji: "🎉", src: "/assets/audio/celebration.mp3" }
];

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const menuRef = useRef(null);
  const hasInteracted = useRef(false);

  // Initialize audio and attempt autoplay
  useEffect(() => {
    const savedState = localStorage.getItem('musicState');
    if (savedState) {
      const { isPlaying: savedPlaying, songId } = JSON.parse(savedState);
      setCurrentSong(songs.find(s => s.id === songId) || songs[0]);
      setIsPlaying(savedPlaying);
    } else {
      // Attempt autoplay immediately
      const attemptAutoplay = async () => {
        try {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setIsPlaying(true);
          hasInteracted.current = true;
        } catch (err) {
          // Autoplay blocked, wait for interaction
          const handleFirstInteraction = async () => {
            try {
              await audioRef.current.play();
              setIsPlaying(true);
              document.removeEventListener('click', handleFirstInteraction);
            } catch (err) {
              console.error('Playback failed:', err);
            }
          };
          document.addEventListener('click', handleFirstInteraction);
        }
      };
      attemptAutoplay();
    }
  }, []);

  // Handle audio playback state
  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, currentSong]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('musicState', JSON.stringify({
      isPlaying,
      songId: currentSong.id
    }));
  }, [isPlaying, currentSong]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
      <MotionDiv
        className="relative"
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
      >
        <MotionButton
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-xl ${
            isPlaying ? 'bg-pink-500' : 'bg-purple-500'
          } text-white`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MotionDiv
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {currentSong.emoji}
          </MotionDiv>
        </MotionButton>

        <MotionDiv
          className="absolute bottom-20 right-0 bg-white rounded-2xl p-2 shadow-lg w-48"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : 20
          }}
          transition={{ duration: 0.2 }}
        >
          {songs.map((song) => (
            <MotionButton
              key={song.id}
              className={`w-full p-3 mb-2 last:mb-0 rounded-xl flex items-center ${
                currentSong.id === song.id
                  ? 'bg-pink-100 text-pink-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => {
                setCurrentSong(song);
                setIsPlaying(true);
              }}
              whileHover={{ x: 5 }}
            >
              <span className="text-2xl mr-2">{song.emoji}</span>
              <span className="text-sm">{song.title}</span>
            </MotionButton>
          ))}

          <MotionButton
            className="w-full p-3 rounded-xl bg-pink-500 text-white"
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.05 }}
          >
            {isPlaying ? 'Pause ⏸' : 'Play ▶'}
          </MotionButton>
        </MotionDiv>
      </MotionDiv>

      <audio 
        ref={audioRef} 
        src={currentSong.src} 
        loop 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}