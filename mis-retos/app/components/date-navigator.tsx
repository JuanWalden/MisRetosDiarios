
'use client';

import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { DateString } from '../lib/types';

interface DateNavigatorProps {
  currentDate: DateString;
  onDateChange: (date: DateString) => void;
}

export default function DateNavigator({ currentDate, onDateChange }: DateNavigatorProps) {
  const goToPreviousDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    onDateChange(date.toISOString().split('T')[0] as DateString);
  };

  const goToNextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    onDateChange(date.toISOString().split('T')[0] as DateString);
  };

  const goToToday = () => {
    const today = new Date().toISOString().split('T')[0] as DateString;
    onDateChange(today);
  };

  const isToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return currentDate === today;
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Botón día anterior */}
      <button
        onClick={goToPreviousDay}
        className="btn btn-secondary p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        aria-label="Día anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botón "Hoy" */}
      <button
        onClick={goToToday}
        className={`btn px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
          isToday() 
            ? 'btn-primary shadow-lg' 
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md hover:shadow-lg'
        }`}
        aria-label="Ir a hoy"
      >
        <Calendar className="w-5 h-5" />
        <span className="hidden sm:inline">Hoy</span>
      </button>

      {/* Botón día siguiente */}
      <button
        onClick={goToNextDay}
        className="btn btn-secondary p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        aria-label="Día siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
