import React from 'react';
import { motion } from 'framer-motion';
const CountdownTimer = ({
  timeLeft
}) => {
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  return <motion.div className="fixed top-0 left-0 right-0 z-50 bg-red-600/90 backdrop-blur-sm text-white py-3 shadow-lg" initial={{
    y: -100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.8
  }}>
      <div className="container mx-auto flex justify-center items-center gap-4 text-center">
        <span className="font-semibold uppercase text-sm md:text-base animate-pulse">🔥ESTE SERVIÇO ESTRARÁ DISPONÍVEL 1 ÚNICA VEZ E ACABA EM...
      </span>
        <span className="font-mono font-bold text-lg md:text-2xl text-red-200">{formatTime(timeLeft)}</span>
        <span className="hidden md:inline-block font-semibold uppercase text-sm">APROVEITE BEM A OPORTUNIDADE!
      </span>
      </div>
    </motion.div>;
};
export default CountdownTimer;