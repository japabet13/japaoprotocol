import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = ({ notifications, isChatOpen }) => {
  const isMobile = window.innerWidth < 1024;
  if (isMobile && isChatOpen) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-40 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            className="notification-gradient backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-lg border border-white/20 max-w-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{notification.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;