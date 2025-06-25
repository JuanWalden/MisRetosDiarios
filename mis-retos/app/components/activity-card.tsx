
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Activity } from '../lib/types';

interface ActivityCardProps {
  activity: Activity;
  onDelete: (activityId: string) => void;
  onUpdateCounter: (activityId: string, newCount: number) => void;
}

export default function ActivityCard({ activity, onDelete, onUpdateCounter }: ActivityCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleIncrement = () => {
    onUpdateCounter(activity.id, activity.count + 1);
  };

  const handleDecrement = () => {
    if (activity.count > 0) {
      onUpdateCounter(activity.id, activity.count - 1);
    }
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(activity.id);
    } else {
      setShowDeleteConfirm(true);
      // Ocultar confirmación después de 3 segundos
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <motion.div 
      className="activity-card"
      layout
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        {/* Nombre de la actividad */}
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="text-lg font-medium text-slate-800 truncate">
            {activity.name}
          </h3>
        </div>

        {/* Contador y controles */}
        <div className="flex items-center space-x-3">
          {/* Botón decrementar */}
          <button
            onClick={handleDecrement}
            disabled={activity.count === 0}
            className={`btn rounded-full p-3 transition-all duration-200 ${
              activity.count === 0 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'btn-secondary hover:scale-105 active:scale-95'
            }`}
            aria-label="Decrementar contador"
          >
            <Minus className="w-5 h-5" />
          </button>

          {/* Contador */}
          <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 min-w-[60px] text-center">
            <span className="text-xl font-bold text-slate-800">
              {activity.count}
            </span>
          </div>

          {/* Botón incrementar */}
          <button
            onClick={handleIncrement}
            className="btn btn-primary rounded-full p-3 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Incrementar contador"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Botón eliminar con confirmación */}
          <div className="relative">
            {showDeleteConfirm ? (
              <motion.div 
                className="flex items-center space-x-2 bg-red-50 rounded-lg p-2 border border-red-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs text-red-700 font-medium whitespace-nowrap">
                  ¿Eliminar?
                </span>
                <button
                  onClick={handleDelete}
                  className="btn btn-destructive px-2 py-1 text-xs rounded"
                >
                  Sí
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="btn bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 text-xs rounded"
                >
                  No
                </button>
              </motion.div>
            ) : (
              <button
                onClick={handleDelete}
                className="btn btn-destructive rounded-full p-3 hover:scale-105 active:scale-95 transition-all duration-200"
                aria-label="Eliminar actividad"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
