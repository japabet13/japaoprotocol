import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

const PrizePopup = ({ amount, onClose }) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      await controls.start({ opacity: 1, scale: 1 });
      let start = 0;
      const end = amount;
      const duration = 1500; // ms
      const range = end - start;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentAmount = Math.floor(progress * range + start);
        setDisplayAmount(currentAmount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayAmount(end); // Ensure it ends on the exact amount
        }
      };

      window.requestAnimationFrame(step);
    };

    animation();
  }, [amount, controls]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center p-4 text-center from-green-400 via-teal-500 to-blue-600 bg-gradient-to-br"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={40} />
        </button>

        <Trophy className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-8 mb-4 drop-shadow-lg">
          LUCRO GARANTIDO!
        </h2>
        
        <div className="text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-white drop-shadow-lg">
          R$ {displayAmount.toFixed(2).replace('.',',')}
        </div>

        <p className="text-xl md:text-2xl text-white/90 mt-6 drop-shadow-lg">
          Esta é a vantagem da arbitragem. Matemática, não sorte.
        </p>

        <motion.button
          onClick={onClose}
          className="mt-12 bg-white text-green-500 font-bold py-4 px-12 rounded-full shadow-2xl text-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          CONTINUAR
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default PrizePopup;