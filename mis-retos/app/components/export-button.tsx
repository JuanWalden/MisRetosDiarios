
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { exportToPDF } from '../lib/export-utils';

export default function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      await exportToPDF();
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al generar el PDF. Inténtalo de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      onClick={handleExport}
      disabled={isExporting}
      className={`btn flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        isExporting 
          ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
          : 'btn-primary hover:scale-105 active:scale-95 shadow-lg'
      }`}
      whileHover={!isExporting ? { scale: 1.05 } : {}}
      whileTap={!isExporting ? { scale: 0.95 } : {}}
    >
      {isExporting ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-500"></div>
          <span className="hidden sm:inline">Generando...</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Exportar PDF</span>
          <FileText className="w-5 h-5 sm:hidden" />
        </>
      )}
    </motion.button>
  );
}
