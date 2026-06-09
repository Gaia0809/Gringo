import React from 'react';

/**
 * Atomo: Stato vuoto standard.
 */
export default function EmptyState({ 
  message = "Nessun elemento trovato", 
  icon, 
  className = "" 
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-16 text-center bg-brand-sfondo rounded-2xl border border-gray-100 ${className}`}>
      {icon ? (
        <div className="text-4xl mb-4 opacity-20">{icon}</div>
      ) : (
        <svg className="w-16 h-16 mb-4 opacity-10 text-brand-testo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      )}
      <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">{message}</p>
    </div>
  );
}
