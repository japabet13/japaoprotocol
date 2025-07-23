import { useState, useEffect, useCallback } from 'react';
import { chatData } from '@/data/chatData';

const useFakeChat = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const addMessage = useCallback((newMessage) => {
    setChatMessages(prev => [...prev.slice(-50), { ...newMessage, id: Date.now() + Math.random() }]);
  }, []);

  useEffect(() => {
    let messageIndex = 0;
    const postAutomatedMessage = () => {
      if (messageIndex >= chatData.length) {
        messageIndex = 0; // Loop back to the start
      }
      const newMessage = chatData[messageIndex];
      addMessage(newMessage);
      messageIndex++;
    };
    
    // Initial messages
    chatData.slice(0, 5).forEach((m, i) => {
      setTimeout(() => addMessage(m), i * 1000);
    });
    messageIndex = 5;

    const interval = setInterval(postAutomatedMessage, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [addMessage]);

  return { chatMessages, addMessage };
};

export default useFakeChat;