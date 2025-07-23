import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import CountdownTimer from '@/components/CountdownTimer';
import SalesVideo from '@/components/SalesVideo';
import ArbitrageCalculator from '@/components/ArbitrageCalculator';
import Chat from '@/components/Chat';
import Notifications from '@/components/Notifications';
import useCountdown from '@/hooks/useCountdown';
import useFakeChat from '@/hooks/useFakeChat';
import useNotifications from '@/hooks/useNotifications';
import { Button } from '@/components/ui/button';
import { X, Users } from 'lucide-react';
import PrizePopup from '@/components/PrizePopup';

function App() {
  const timeLeft = useCountdown(7 * 60);
  const { chatMessages, addMessage } = useFakeChat();
  const notifications = useNotifications();
  const [showCalculatorSection, setShowCalculatorSection] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPrize, setShowPrize] = useState(false);
  const [prizeAmount, setPrizeAmount] = useState(0);
  const salesVideoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsChatOpen(true);
      } else {
        setIsChatOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCalculatorSection(true);
    }, 220000); // 3 minutos e 40 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleShowPrize = (amount) => {
    setPrizeAmount(amount);
    setShowPrize(true);
  };

  const handleClosePrize = () => {
    setShowPrize(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Helmet>
        <title>Sala de Espera VIP - Operações Estratégicas</title>
        <meta name="description" content="Bem-vindo ao ambiente exclusivo de operações estratégicas. Conheça nossos bastidores enquanto aguarda." />
      </Helmet>

      <div className="absolute inset-0 z-0">
        <img  className="w-full h-full object-cover" alt="Sala de reuniões moderna e escura com iluminação de LED" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/a574aed0-ba00-4ed5-8a57-50de6443cda4/b3df374c90b5bf4734daee01be1f7b17.jpg" />
      </div>
      
      <CountdownTimer timeLeft={timeLeft} />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto lg:px-4 pt-20">
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
          <div className="flex-grow" ref={salesVideoRef}>
            <SalesVideo />
          </div>
          <div className="w-full lg:w-96 shrink-0">
            <Chat 
              messages={chatMessages} 
              isOpen={isChatOpen} 
              setIsOpen={setIsChatOpen}
              addMessage={addMessage}
              parentRef={salesVideoRef}
            />
          </div>
        </div>
        
        <AnimatePresence>
          {showCalculatorSection && (
            <motion.section
              className="w-full py-12 px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ArbitrageCalculator onShowPrize={handleShowPrize} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      
      <Button 
        variant="default" 
        className="fixed bottom-4 right-4 z-[60] lg:hidden rounded-full shadow-lg h-14 px-4 flex items-center justify-center text-sm font-bold"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <X className="h-7 w-7" /> : (
          <div className="flex items-center">
            <div className="relative mr-2">
              <Users className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white animate-pulse"></span>
            </div>
            <span>1,247 Online</span>
          </div>
        )}
      </Button>

      <Notifications notifications={notifications} isChatOpen={isChatOpen} />
      <Toaster />
      
      <AnimatePresence>
        {showPrize && <PrizePopup amount={prizeAmount} onClose={handleClosePrize} />}
      </AnimatePresence>
    </div>
  );
}

export default App;