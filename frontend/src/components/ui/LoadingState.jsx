import React from 'react';

/**
 * Atomo: Stato di caricamento standard.
 */
export default function LoadingState({ message = "Caricamento in corso...", className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="w-10 h-10 border-4 border-brand-sfondowidget border-t-brand-testo rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">{message}</p>
    </div>
  );
}
