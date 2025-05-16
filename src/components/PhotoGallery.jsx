import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const MotionImg = motion.img;
const MotionButton = motion.button;

const photos = [
  { id: 1, src: 'assets/images/photos/photo5.jpg', caption: 'Beautiful Smile ✨', aspect: 'portrait' },
  { id: 2, src: 'assets/images/photos/photo2.jpg', caption: 'Lovely Memories 💝', aspect: 'landscape' },
  { id: 3, src: 'assets/images/photos/photo3.jpg', caption: 'Special Moments 🌸', aspect: 'portrait' },
  { id: 4, src: 'assets/images/photos/photo7.jpg', caption: 'Adventure Buddies 🌄', aspect: 'square' },
  { id: 5, src: 'assets/images/photos/photo1.jpg', caption: 'Golden Hours 🌅', aspect: 'landscape' },
  { id: 6, src: 'assets/images/photos/photo6.jpg', caption: 'Best Friends Forever 👯', aspect: 'square' },
  { id: 7, src: 'assets/images/photos/photo4.jpg', caption: 'Happy Times 🎀', aspect: 'portrait' },
  { id: 8, src: 'assets/images/photos/photo8.jpg', caption: 'Pure Joy 😄', aspect: 'landscape' },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const floatingElements = Array.from({ length: 60 }).map((_, i) => {
    const sideCluster = Math.random() > 0.3;
    const isLeft = Math.random() > 0.5;

    return {
      id: i,
      x: sideCluster 
        ? isLeft 
          ? Math.random() * 20 
          : 80 + Math.random() * 20 
        : 20 + Math.random() * 60,
      y: Math.random() * 150 - 25,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 5,
      yMovement: Math.random() * 80 + 40,
      rotation: Math.random() * 360,
      emoji: ['🌸', '✨', '💖', '🎀'][i % 4]
    };
  });

  const handleNavigation = (direction) => {
    setActiveIndex(prev => {
      const newIndex = direction === 'next' 
        ? (prev + 1) % photos.length 
        : (prev - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[newIndex]);
      return newIndex;
    });
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingElements.map((element) => (
          <MotionDiv
            key={element.id}
            className="absolute text-4xl"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}px`,
            }}
            initial={{ y: 0, opacity: 0.4 }}
            animate={{ 
              y: [`${element.y}%`, `${element.y - element.yMovement}%`],
              opacity: [0.4, 0.8, 0.4],
              rotate: [element.rotation, element.rotation + 360]
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
              opacity: { duration: element.duration * 0.8 }
            }}
          >
            {element.emoji}
          </MotionDiv>
        ))}
      </div>

      <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Magical Memories ✨
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4">
        {photos.map((photo, index) => (
          <MotionDiv
            key={photo.id}
            className={`relative cursor-pointer group ${
              photo.aspect === 'landscape' ? 'col-span-2 md:col-span-2' : 
              photo.aspect === 'portrait' ? 'row-span-2 md:row-span-2' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-3xl transform rotate-3 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-100/20 to-pink-100/20 rounded-3xl transform -rotate-3 -z-10" />

            <MotionDiv
              className="relative bg-white/70 backdrop-blur-sm p-4 rounded-3xl shadow-xl overflow-hidden h-full"
              onClick={() => {
                setSelectedPhoto(photo);
                setActiveIndex(index);
              }}
            >
              <MotionImg
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover rounded-xl border-4 border-white/80"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-xl font-bold drop-shadow-lg">{photo.caption}</p>
              </div>
            </MotionDiv>
          </MotionDiv>
        ))}
      </div>

      {selectedPhoto && (
        <MotionDiv
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => e.target === e.currentTarget && setSelectedPhoto(null)}
        >
          <MotionDiv
            className="relative max-w-6xl w-full"
            initial={{ scale: 0.9, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring' }}
          >
            <MotionImg
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-center">
              <p className="text-white text-3xl font-bold mb-4">{selectedPhoto.caption}</p>
              <div className="flex justify-center gap-4">
                <MotionButton
                  className="px-6 py-2 bg-pink-500/80 hover:bg-pink-600 text-white rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('prev');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Previous
                </MotionButton>
                <MotionButton
                  className="px-6 py-2 bg-pink-500/80 hover:bg-pink-600 text-white rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('next');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next →
                </MotionButton>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </section>
  );
}
