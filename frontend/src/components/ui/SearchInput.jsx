import React from 'react';

/**
 * Atomo: Input di ricerca standardizzato.
 * Include l'icona lente predefinita per coerenza visiva.
 * 
 * @param {Object} props
 * @param {string} props.value - Valore dell'input
 * @param {Function} props.onChange - Gestore cambio testo
 * @param {string} [props.placeholder] - Testo suggerimento
 * @param {string} [props.className] - Classi extra per il contenitore
 */
export default function SearchInput({ value, onChange, placeholder = "Cerca...", className = "" }) {
  return (
    <div className={`flex items-center bg-brand-sfondo px-4 py-2 rounded-xl border border-gray-200 shadow-sm ${className}`}>
      <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
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
