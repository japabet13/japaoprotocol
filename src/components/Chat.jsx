import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Chat = ({ messages, isOpen, setIsOpen, addMessage, parentRef }) => {
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef(null);
  const [height, setHeight] = useState('auto');
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const updateHeight = () => {
      if (parentRef.current && window.innerWidth >= 1024) {
        setHeight(`${parentRef.current.offsetHeight}px`);
      } else {
        setHeight('calc(100vh - 80px)');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    const observer = new MutationObserver(updateHeight);
    if (parentRef.current) {
      observer.observe(parentRef.current, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, [parentRef]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    const userMessage = {
      id: Date.now(),
      user: 'Você',
      message: inputValue,
      type: 'user',
    };
    addMessage(userMessage);
    setInputValue('');

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        user: 'Ana Clara',
        message: 'E aí, joia? Então... algumas perguntas mais aprofundadas é interessante chamar o especialista no WhatsApp, viu? Eles respondem na hora!',
        type: 'testimonial',
      };
      addMessage(botMessage);
    }, 1500);

    closeTimerRef.current = setTimeout(() => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    }, 10000); // 10 segundos
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    }
  }, []);

  const getMessageColor = (type) => {
    switch(type) {
      case 'success': return 'text-green-600';
      case 'question': return 'text-blue-600';
      case 'testimonial': return 'text-amber-600';
      case 'user': return 'text-white';
      default: return 'text-gray-700';
    }
  };
  
  const getMessageBgColor = (type) => {
    if (type === 'user') return 'bg-primary';
    return 'bg-white';
  }

  const getAvatarColor = (userName) => {
    if (userName === 'Você') return 'bg-primary';
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
    let hash = 0;
    for (let i = 0; i < userName.length; i++) {
      hash = userName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const mobileVariants = {
    open: { x: 0 },
    closed: { x: '100%' },
  };
  
  const desktopVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 50 },
  }

  return (
    <motion.aside 
      className="bg-gray-100/90 backdrop-blur-lg border-l border-gray-300/80 flex flex-col fixed top-[80px] right-0 z-50 lg:relative lg:top-auto lg:flex lg:z-auto lg:w-96 shrink-0 lg:rounded-2xl lg:overflow-hidden lg:shadow-lg"
      style={{ height: window.innerWidth >= 1024 ? height : 'calc(100vh - 80px)' }}
      variants={window.innerWidth >= 1024 ? desktopVariants : mobileVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="p-4 border-b border-gray-300 bg-gray-200/80 flex items-center shrink-0">
        <h3 className="font-bold text-gray-800 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-primary" />
          Chat da Comunidade
        </h3>
        <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
          <Users className="w-3 h-3 inline mr-1" />
          1,247 online
        </span>
        <Button variant="ghost" size="icon" className="lg:hidden ml-2" onClick={() => setIsOpen(false)}>
          <X className="h-6 w-6 text-gray-800" />
        </Button>
      </div>
      
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex items-start space-x-3 ${msg.user === 'Você' ? 'justify-end' : ''}`}
            >
              {msg.user !== 'Você' && (
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.user}`} alt={msg.user} />
                  <AvatarFallback className={`${getAvatarColor(msg.user)} text-white`}>
                    {msg.user.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`flex-1 max-w-[80%] ${msg.user === 'Você' ? 'text-right' : ''}`}>
                <div className={`font-semibold text-sm ${msg.user === 'Você' ? 'text-gray-600 mr-2' : 'text-primary ml-2'}`}>
                  {msg.user}
                </div>
                <div className={`text-sm p-3 rounded-lg shadow-sm inline-block ${getMessageBgColor(msg.type)} ${getMessageColor(msg.type)} ${msg.user === 'Você' ? 'rounded-br-none' : 'rounded-tl-none'}`}>
                  {msg.message}
                </div>
              </div>
               {msg.user === 'Você' && (
                <Avatar>
                  <AvatarFallback className={`${getAvatarColor(msg.user)} text-white`}>
                    V
                  </AvatarFallback>
                </Avatar>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="p-4 border-t border-gray-300 bg-gray-200/80 shrink-0">
        <div className="flex space-x-2 items-center">
          <input 
            type="text" 
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <Button 
            size="icon" 
            className="btn-primary rounded-full shrink-0"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Chat;