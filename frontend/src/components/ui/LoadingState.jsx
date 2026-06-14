import React from 'react';

/**
 * ============================================================
 * ATOMO: LoadingState (Stato di Caricamento)
 * ============================================================
 * Componente visualizzato durante l'attesa delle risposte API.
 * Fornisce un feedback visivo immediato (spinner animato) per
 * indicare che l'applicazione è operativa e sta caricando dati.
 * 
 * @param {Object} props
 * @param {string} [props.message] - Testo informativo opzionale
 * @param {string} [props.className] - Classi extra per il contenitore
 * ============================================================
 */
export default function LoadingState({ 
  message = "Caricamento in corso...", 
  className = "" 
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      
      {/* SPINNER ANIMATO:
          Creato interamente con Tailwind (border a 4 colori, t-brand per l'accento).
          La classe 'animate-spin' gestisce la rotazione continua. */}
      <div className="w-10 h-10 border-4 border-brand-sfondowidget border-t-brand-testo rounded-full animate-spin mb-4"></div>
      
      {/* Messaggio testuale: stile coordinato con EmptyState */}
      <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
        {message}
      </p>
      
    </div>
  );
}
