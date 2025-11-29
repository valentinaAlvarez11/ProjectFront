/**
 * Utilidades reutilizables para formateo de datos
 */

/**
 * Formatea una fecha en formato YYYY-MM-DD o ISO a formato legible en español
 * @param dateString - Fecha en formato string (YYYY-MM-DD o ISO)
 * @returns Fecha formateada en español
 */
export const formatDate = (dateString: string): string => {
  const dateOnly = dateString.split('T')[0];
  const [year, month, day] = dateOnly.split('-').map(Number);
  
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

/**
 * Formatea una fecha con hora en formato legible en español
 * @param dateString - Fecha en formato ISO string
 * @returns Fecha y hora formateada en español
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

/**
 * Formatea un monto numérico a moneda colombiana (COP)
 * @param amount - Monto numérico
 * @returns Monto formateado como moneda
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Enmascara un número de tarjeta mostrando solo los últimos 4 dígitos
 * @param cardNumber - Número de tarjeta completo
 * @returns Número de tarjeta enmascarado
 */
export const maskCardNumber = (cardNumber: string): string => {
  if (cardNumber.length <= 4) return cardNumber;
  return `**** **** **** ${cardNumber.slice(-4)}`;
};

/**
 * Calcula el número de noches entre dos fechas
 * @param fechaInicio - Fecha de inicio en formato YYYY-MM-DD
 * @param fechaFin - Fecha de fin en formato YYYY-MM-DD
 * @returns Número de noches
 */
export const calculateNights = (fechaInicio: string, fechaFin: string): number => {
  const inicioOnly = fechaInicio.split('T')[0];
  const finOnly = fechaFin.split('T')[0];
  const inicioUTC = new Date(inicioOnly + 'T00:00:00.000Z');
  const finUTC = new Date(finOnly + 'T00:00:00.000Z');
  const diffTime = Math.abs(finUTC.getTime() - inicioUTC.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
