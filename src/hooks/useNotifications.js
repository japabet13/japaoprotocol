import { useState, useEffect } from 'react';
import { notificationData } from '@/data/notificationData';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const addNotification = () => {
      const randomNotification = notificationData[Math.floor(Math.random() * notificationData.length)];
      const newNotification = { id: Date.now() + Math.random(), text: randomNotification };
      setNotifications(prev => [...prev, newNotification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 4000);
    };

    const interval = setInterval(addNotification, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return notifications;
};

export default useNotifications;