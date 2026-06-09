import React from 'react';

/**
 * Atomo: Card riutilizzabile.
 * Contenitore standard per widget, tabelle o informazioni raggruppate.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenuto interno
 * @param {string} [props.title] - Titolo opzionale in alto
 * @param {string} [props.className] - Classi Tailwind extra
 * @param {boolean} [props.noPadding] - Rimuove il padding di default
 */
export default function Card({ children, title, className = "", noPadding = false }) {
  return (
    // 'card' è una classe CSS custom definita in index.css
    <div className={`card ${noPadding ? '!p-0' : ''} ${className}`}>
      {title && <h3 className="text-base font-bold text-brand-testo mb-4">{title}</h3>}
      {children}
    </div>
  );
}
