
import { Activity, DateString, StorageData } from './types';

const STORAGE_KEY = 'mis-retos-data';

// Obtener todos los datos del localStorage
export function getAllStorageData(): StorageData {
  if (typeof window === 'undefined') return {};
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error al leer datos del localStorage:', error);
    return {};
  }
}

// Guardar todos los datos en localStorage
export function saveAllStorageData(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar datos en localStorage:', error);
  }
}

// Obtener actividades para una fecha específica
export function getActivitiesForDate(date: DateString): Activity[] {
  const allData = getAllStorageData();
  return allData[date] || [];
}

// Guardar una nueva actividad
export function saveActivity(activity: Activity): void {
  const allData = getAllStorageData();
  
  if (!allData[activity.date]) {
    allData[activity.date] = [];
  }
  
  allData[activity.date].push(activity);
  saveAllStorageData(allData);
}

// Actualizar el contador de una actividad
export function updateActivityCounter(activityId: string, date: DateString, newCount: number): void {
  const allData = getAllStorageData();
  
  if (allData[date]) {
    const activityIndex = allData[date].findIndex(activity => activity.id === activityId);
    if (activityIndex !== -1) {
      allData[date][activityIndex].count = Math.max(0, newCount);
      saveAllStorageData(allData);
    }
  }
}

// Eliminar una actividad
export function deleteActivity(activityId: string, date: DateString): void {
  const allData = getAllStorageData();
  
  if (allData[date]) {
    allData[date] = allData[date].filter(activity => activity.id !== activityId);
    
    // Si no quedan actividades para esa fecha, eliminar la entrada
    if (allData[date].length === 0) {
      delete allData[date];
    }
    
    saveAllStorageData(allData);
  }
}

// Obtener estadísticas generales
export function getStatistics() {
  const allData = getAllStorageData();
  const dates = Object.keys(allData);
  
  let totalActivities = 0;
  let totalCompletions = 0;
  let activeDays = 0;
  
  dates.forEach(date => {
    const activities = allData[date];
    if (activities.length > 0) {
      activeDays++;
      totalActivities += activities.length;
      totalCompletions += activities.reduce((sum, activity) => sum + activity.count, 0);
    }
  });
  
  return {
    totalActivities,
    totalCompletions,
    activeDays,
    totalDates: dates.length
  };
}

// Limpiar todos los datos (para resetear la aplicación)
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar datos:', error);
  }
}
