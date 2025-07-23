import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
const WhatsappIcon = () => <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.4,15.1c-0.3-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,0.9c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.3-0.4c0.1-0.2,0-0.3,0-0.4c0-0.1-0.6-1.5-0.8-2C9.4,8,9.2,8.1,9,8.1c-0.2,0-0.4,0-0.6,0c-0.2,0-0.5,0.1-0.8,0.4c-0.3,0.3-1,1-1,2.5c0,1.5,1,2.9,1.2,3.1c0.2,0.2,1.9,3,4.6,4.1c0.6,0.2,1.1,0.4,1.5,0.5c0.6,0.1,1.1,0.1,1.5-0.1c0.5-0.2,1.5-0.8,1.7-1.5c0.2-0.7,0.2-1.3,0.1-1.5C18.8,15.3,18.6,15.2,18.4,15.1z M12,2.2C6.6,2.2,2.2,6.6,2.2,12c0,1.8,0.5,3.5,1.4,5L2.5,21.5l4.6-1.2c1.4,0.8,3,1.2,4.8,1.2h0c5.4,0,9.8-4.4,9.8-9.8C21.8,6.6,17.4,2.2,12,2.2z" />
  </svg>;
const SalesVideo = () => {
  const [showSpecialistButton, setShowSpecialistButton] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpecialistButton(true);
    }, 290000); // 4 minutos e 50 segundos

    return () => clearTimeout(timer);
  }, []);
  const handleSpecialistClick = () => {
    const phoneNumber = '5531983694059';
    const message = encodeURIComponent('Quero começar a lucrar com a arbitragem hoje!');
    window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  };
  return <motion.section className="w-full flex flex-col items-center justify-center lg:py-10 lg:px-4 text-center" initial={{
    opacity: 0,
    y: -50
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 1,
    delay: 0.2
  }}>
      <div className="px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">JAPÃO PROTOCOL</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 font-medium mb-8 drop-shadow-lg bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2">O método que me fez faturar mais de 1 MILHÃO DE REAIS agora TOTALMENTE ACESSIVEL para você! 
👇CLIQUE DUAS VEZES NO IPHONE👇</p>
      </div>
      
      <motion.div className="w-full max-w-6xl lg:rounded-2xl lg:shadow-2xl lg:border lg:border-gray-700 overflow-hidden relative" initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      duration: 0.8,
      delay: 0.5,
      ease: "easeOut"
    }}>
        <div style={{
        position: 'relative',
        paddingTop: '56.25%'
      }}>
          <iframe src="https://iframe.mediadelivery.net/embed/471287/e6234b27-fca4-468c-aa51-a9d0f27e89f6?autoplay=false&loop=false&muted=false&preload=true&responsive=true" loading="lazy" style={{
          border: 'none',
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%'
        }} allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true}></iframe>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSpecialistButton && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="px-4">
              <Button onClick={handleSpecialistClick} className="mt-8 text-lg font-semibold px-8 py-6 rounded-lg shadow-lg bg-[#25D366] hover:bg-[#1DAE53] text-white flex items-center justify-center">
                Quero falar com um especialista
                <WhatsappIcon />
              </Button>
            </motion.div>}
      </AnimatePresence>
    </motion.section>;
};
export default SalesVideo;