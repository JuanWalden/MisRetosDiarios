
import { DateString } from './types';

// Formatear fecha para mostrar en español
export function formatDateForDisplay(dateString: DateString): string {
  try {
    const date = new Date(dateString + 'T00:00:00');
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return date.toLocaleDateString('es-ES', options)
      .split('')
      .map((char, index) => index === 0 ? char.toUpperCase() : char)
      .join('');
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return dateString;
  }
}

// Formatear fecha corta para exportación
export function formatDateShort(dateString: DateString): string {
  try {
    const date = new Date(dateString + 'T00:00:00');
    
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    
    return date.toLocaleDateString('es-ES', options);
  } catch (error) {
    console.error('Error al formatear fecha corta:', error);
    return dateString;
  }
}

// Obtener el nombre del día de la semana
export function getDayName(dateString: DateString): string {
  try {
    const date = new Date(dateString + 'T00:00:00');
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long'
    };
    
    const dayName = date.toLocaleDateString('es-ES', options);
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  } catch (error) {
    console.error('Error al obtener nombre del día:', error);
    return '';
  }
}

// Verificar si una fecha es hoy
export function isToday(dateString: DateString): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
}

// Verificar si una fecha es ayer
export function isYesterday(dateString: DateString): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === yesterday.toISOString().split('T')[0];
}

// Verificar si una fecha es mañana
export function isTomorrow(dateString: DateString): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateString === tomorrow.toISOString().split('T')[0];
}

// Obtener una descripción relativa de la fecha
export function getRelativeDateDescription(dateString: DateString): string {
  if (isToday(dateString)) {
    return 'Hoy';
  } else if (isYesterday(dateString)) {
    return 'Ayer';
  } else if (isTomorrow(dateString)) {
    return 'Mañana';
  } else {
    return formatDateForDisplay(dateString);
  }
}

// Generar rango de fechas
export function generateDateRange(startDate: DateString, endDate: DateString): DateString[] {
  const dates: DateString[] = [];
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  
  const currentDate = new Date(start);
  
  while (currentDate <= end) {
    dates.push(currentDate.toISOString().split('T')[0] as DateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}
