import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionTextarea = motion.textarea;
const MotionForm = motion.form;

// Sample initial messages
const initialMessages = [
  {
    id: 1,
    name: "Mom",
    message: "Happy birthday to my beautiful princess! Wishing you endless joy today and always. 💖",
    timestamp: "10:30 AM",
    color: "bg-pink-100"
  },
  {
    id: 2,
    name: "Bestie",
    message: "To the sparkliest girl I know - may your day be as fabulous as you are! ✨",
    timestamp: "11:15 AM",
    color: "bg-purple-100"
  },
  {
    id: 3,
    name: "Dad",
    message: "Another year of watching you shine! So proud of you, sweetheart. 🎀",
    timestamp: "9:00 AM",
    color: "bg-blue-50"
  }
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState({
    name: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;

    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      const newMsg = {
        id: Date.now(),
        name: newMessage.name,
        message: newMessage.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        color: `bg-${['pink', 'purple', 'blue', 'rose'][Math.floor(Math.random() * 4)]}-${[50, 100][Math.floor(Math.random() * 2)]}`
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage({ name: "", message: "" });
      setIsSubmitting(false);
      
      // Scroll to new message
      setTimeout(() => {
        const messagesEnd = document.getElementById("messages-end");
        messagesEnd?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 800);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-purple-50">
      <MotionDiv 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-pink-600">
          Birthday Wishes 💌
        </h2>

        {/* Messages Container */}
        <MotionDiv 
          className="mb-12 space-y-6 max-h-[500px] overflow-y-auto p-4 rounded-2xl"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
        >
          {messages.map((msg, index) => (
            <MotionDiv
              key={msg.id}
              className={`p-6 rounded-3xl shadow-md ${msg.color} relative`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, type: "spring" }}
            >
              <div className="absolute top-4 right-4 text-xs text-gray-500">
                {msg.timestamp}
              </div>
              <h3 className="text-xl font-bold text-pink-700 mb-2">{msg.name}</h3>
              <p className="text-gray-700">{msg.message}</p>
              
              {/* Decorative elements */}
              <div className="absolute bottom-2 right-2 text-xl opacity-30">
                {index % 3 === 0 ? "🌸" : index % 3 === 1 ? "💖" : "✨"}
              </div>
            </MotionDiv>
          ))}
          <div id="messages-end" />
        </MotionDiv>

        {/* Message Form */}
        <MotionForm
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-2xl font-bold text-center text-pink-600 mb-6">
            Leave Your Wish ✨
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-pink-700 mb-1">
                Your Name
              </label>
              <MotionDiv
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="text"
                  id="name"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                  className="w-full p-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                  placeholder="Enter your name"
                  required
                />
                <div className="absolute right-3 top-3 text-pink-400">👤</div>
              </MotionDiv>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-pink-700 mb-1">
                Your Message
              </label>
              <MotionTextarea
                id="message"
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                className="w-full p-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32"
                placeholder="Write your birthday wish..."
                required
                whileFocus={{ 
                  scale: 1.02,
                  borderColor: "#ec4899"
                }}
              />
            </div>
            
            <MotionButton
              type="submit"
              className={`w-full py-3 rounded-xl font-bold text-white ${
                isSubmitting 
                  ? 'bg-purple-400' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-500'
              }`}
              whileHover={!isSubmitting ? { scale: 1.03 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <MotionDiv
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Sending...
                </span>
              ) : (
                "Send Wish 💝"
              )}
            </MotionButton>
          </div>
        </MotionForm>
      </MotionDiv>
    </section>
  );
}