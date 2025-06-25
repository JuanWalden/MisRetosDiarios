
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DateNavigator from '../components/date-navigator';
import ActivityCard from '../components/activity-card';
import AddActivityForm from '../components/add-activity-form';
import ExportButton from '../components/export-button';
import { Activity, DateString } from '../lib/types';
import { getActivitiesForDate, saveActivity, deleteActivity, updateActivityCounter } from '../lib/storage-utils';
import { formatDateForDisplay } from '../lib/date-utils';

export default function HomePage() {
  const [currentDate, setCurrentDate] = useState<DateString>('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicializar con la fecha actual
    const today = new Date().toISOString().split('T')[0] as DateString;
    setCurrentDate(today);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currentDate) {
      loadActivities();
    }
  }, [currentDate]);

  const loadActivities = () => {
    const dateActivities = getActivitiesForDate(currentDate);
    setActivities(dateActivities);
  };

  const handleDateChange = (newDate: DateString) => {
    setCurrentDate(newDate);
  };

  const handleAddActivity = (name: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      name,
      count: 0,
      date: currentDate,
      createdAt: new Date().toISOString()
    };
    
    saveActivity(newActivity);
    loadActivities();
  };

  const handleDeleteActivity = (activityId: string) => {
    deleteActivity(activityId, currentDate);
    loadActivities();
  };

  const handleUpdateCounter = (activityId: string, newCount: number) => {
    updateActivityCounter(activityId, currentDate, newCount);
    loadActivities();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container py-6 max-w-4xl">
        {/* Header */}
        <motion.header 
          className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              Mis Retos
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Taller de Regulación Emocional Juan Orta
            </p>
          </div>
          <ExportButton />
        </motion.header>

        {/* Navegador de Fecha */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <DateNavigator 
            currentDate={currentDate}
            onDateChange={handleDateChange}
          />
        </motion.section>

        {/* Fecha Actual */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
            {formatDateForDisplay(currentDate)}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Lista de Actividades */}
        <motion.section 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {activities.length === 0 ? (
              <motion.div 
                key="empty-state"
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  No hay retos para hoy
                </h3>
                <p className="text-slate-500">
                  ¡Añade tu primer reto y comienza tu jornada!
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="activities-list"
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ActivityCard
                      activity={activity}
                      onDelete={handleDeleteActivity}
                      onUpdateCounter={handleUpdateCounter}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Formulario para Agregar Actividad */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AddActivityForm onAddActivity={handleAddActivity} />
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="text-center mt-12 pt-8 border-t border-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-slate-500 text-sm">
            Taller de Regulación Emocional - Juan Orta
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
