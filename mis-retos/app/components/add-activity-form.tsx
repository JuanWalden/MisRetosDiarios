
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AddActivityFormProps {
  onAddActivity: (name: string) => void;
}

export default function AddActivityForm({ onAddActivity }: AddActivityFormProps) {
  const [activityName, setActivityName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activityName.trim()) return;

    setIsSubmitting(true);
    
    try {
      onAddActivity(activityName.trim());
      setActivityName('');
    } catch (error) {
      console.error('Error al agregar actividad:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Agregar Nuevo Reto
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="Escribe tu nuevo reto..."
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 text-slate-800 placeholder-slate-500"
            disabled={isSubmitting}
            maxLength={100}
          />
          <div className="mt-1 text-xs text-slate-500">
            {activityName.length}/100 caracteres
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!activityName.trim() || isSubmitting}
          className={`btn flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            !activityName.trim() || isSubmitting
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'btn-primary hover:scale-105 active:scale-95'
          }`}
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Agregar</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
