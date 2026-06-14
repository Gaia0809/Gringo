import React from 'react';

/**
 * ============================================================
 * ATOMO: SearchInput (Campo di Ricerca)
 * ============================================================
 * Fornisce un input di testo stilizzato con icona "lente" inclusa.
 * È progettato per essere usato all'interno di PageHeader o sidebar
 * per il filtraggio in tempo reale dei dati.
 * 
 * @param {Object} props
 * @param {string} props.value - Valore testuale corrente
 * @param {Function} props.onChange - Handler per il cambio testo
 * @param {string} [props.placeholder] - Testo suggerimento
 * @param {string} [props.className] - Classi extra per il contenitore
 * ============================================================
 */
export default function SearchInput({ value, onChange, placeholder = "Cerca...", className = "" }) {
  return (
    /**
     * WRAPPER: Agisce come il reale bordo dell'input.
     * Include padding interno e l'icona SVG fissa.
     */
    <div className={`flex items-center bg-brand-sfondo px-4 py-2 rounded-xl border border-gray-200 shadow-sm transition-all focus-within:border-brand-testo ${className}`}>
      
      {/* Icona Lente (SVG) in grigio per non distrarre */}
      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* INPUT REALE:
          Reso "invisibile" (border-none e bg-transparent) per far sì
          che l'utente percepisca il div esterno come l'input stesso. */}
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="border-none outline-none text-sm w-full bg-transparent text-brand-testo font-medium placeholder:text-gray-400"
      />
      
    </div>
  );
}
