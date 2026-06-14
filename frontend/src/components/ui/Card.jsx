import React from 'react';

/**
 * ============================================================
 * ATOMO: Card (Contenitore Standard)
 * ============================================================
 * Rappresenta l'unità di base per organizzare i contenuti nella UI.
 * Ogni widget, tabella o sezione informativa è avvolta in una Card
 * per mantenere un linguaggio visivo coerente (ombre, bordi, sfondo).
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Il contenuto da racchiudere
 * @param {string} [props.title] - Titolo opzionale visualizzato in alto
 * @param {string} [props.className] - Classi Tailwind extra per layout (es. flex)
 * @param {boolean} [props.noPadding] - Se true, rimuove il padding interno (utile per tabelle)
 * ============================================================
 */
export default function Card({ children, title, className = "", noPadding = false }) {
  return (
    /**
     * CLASSE 'card': 
     * È una classe CSS complessa definita globalmente in index.css.
     * Gestisce: background, border-radius, shadow e padding standard.
     */
    <div className={`card ${noPadding ? '!p-0' : ''} ${className}`}>
      
      {/* RENDER CONDIZIONALE DEL TITOLO:
          Se fornito, viene visualizzato con uno stile font-bold e colore brand. */}
      {title && (
        <h3 className="text-base font-bold text-brand-testo mb-4">
          {title}
        </h3>
      )}
      
      {/* Il corpo della card (i figli passati dal genitore) */}
      {children}
      
    </div>
  );
}
