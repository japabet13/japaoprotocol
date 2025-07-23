import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Scan, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ArbitrageCalculator = ({ onShowPrize }) => {
  const [scannerInput, setScannerInput] = useState('');
  const [showHouseSelection, setShowHouseSelection] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const arbitrageData = `2025-07-16 07:00	Barcelona – Real Madrid	Futebol  / Champions League
BETANO	Barcelona VENCE OU EMPATA	2.60	0.0	2.600	2400.00	0	BRL	1240.00	24.80%
BRAZINO (BR)	Real Madrid	VENCE OU EMPATA 2.40	0.0	2.400	2600.00	0	BRL	1240.00
					5000		BRL`;

  const copyArbitrageData = () => {
    navigator.clipboard.writeText(arbitrageData);
    toast({
      title: "Entrada copiada!",
      description: "Cole no scanner abaixo para analisar."
    });
  };

  const handleScannerSubmit = () => {
    if (scannerInput.includes('Barcelona') && scannerInput.includes('Real Madrid')) {
      setShowHouseSelection(true);
      toast({
        title: "Entrada detectada!",
        description: "Escolha a casa para simular o resultado."
      });
    } else {
      toast({
        title: "Entrada inválida",
        description: "Por favor, cole a entrada copiada acima.",
        variant: "destructive"
      });
    }
  };

  const selectHouse = (house) => {
    setSelectedHouse(house);
    const profit = 1240;
    if (onShowPrize) {
      onShowPrize(profit);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-primary">🎯 A I.A RASTREOU ESSA ENTRADA PARA VOCÊ!</h3>
      
      <div className="bg-gray-200/50 rounded-lg p-4 mb-4 font-mono text-sm text-black whitespace-pre-wrap overflow-x-auto">
        {arbitrageData}
      </div>
      
      <Button onClick={copyArbitrageData} className="w-full mb-4 btn-secondary">
        <Copy className="w-4 h-4 mr-2" />
        Copiar Entrada de Arbitragem
      </Button>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-600">
          <Scan className="w-4 h-4 inline mr-2" />
          Scanner de Entrada
        </label>
        <textarea value={scannerInput} onChange={e => setScannerInput(e.target.value)} placeholder="Cole aqui a entrada copiada para análise..." className="w-full h-24 bg-white border border-border rounded-lg p-3 text-black resize-none focus:ring-2 focus:ring-primary" />
        <Button onClick={handleScannerSubmit} className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold">
          <Scan className="w-4 h-4 mr-2" />
          Analisar Entrada
        </Button>
      </div>

      {showHouseSelection && (
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button onClick={() => selectHouse('betano')} className="bg-gray-700 hover:bg-gray-600 h-16 text-white" disabled={selectedHouse}>
            <div className="text-center">
              <div className="font-bold">CASA 1: BETANO</div>
              <div className="text-sm">Barcelona VENCE OU EMPATA @ 2.60</div>
            </div>
          </Button>
          <Button onClick={() => selectHouse('brazino')} className="bg-gray-700 hover:bg-gray-600 h-16 text-white" disabled={selectedHouse}>
            <div className="text-center">
              <div className="font-bold">CASA 2: BRAZINO</div>
              <div className="text-sm">Real Madrid VENCE OU EMPATA @ 2.40</div>
            </div>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ArbitrageCalculator;