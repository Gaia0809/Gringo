import React from 'react';

/**
 * ============================================================
 * ATOMO: Button (Pulsante Riutilizzabile)
 * ============================================================
 * Il componente base per tutte le interazioni cliccabili dell'app.
 * Centralizza lo stile (Tailwind) e garantisce che ogni bottone
 * rispetti il design system (bordi arrotondati, ombre, transizioni).
 * 
 * Supporta diverse "varianti" per distinguere azioni primarie,
 * distruttive o secondarie.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Il contenuto interno (testo/icone)
 * @param {Function} [props.onClick] - Azione da eseguire al click
 * @param {'primary' | 'outline' | 'ghost' | 'danger'} [props.variant] - Stile grafico
 * @param {string} [props.className] - Ulteriori classi CSS opzionali
 * @param {boolean} [props.disabled] - Disabilita l'interazione
 * @param {'button' | 'submit' | 'reset'} [props.type] - Tipo HTML del bottone
 * ============================================================
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = "", 
  disabled = false,
  type = 'button'
}) {

  // ============================================================
  // LOGICA STILISTICA
  // ============================================================

  // STILI BASE: comuni a tutti i pulsanti (es. padding, font, ombre)
  const baseStyles = "px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  // MAPPATURA VARIANTI: associa una chiave a un set di classi Tailwind
  const variants = {
    // Bottone principale (brand)
    primary: "bg-brand-testo text-brand-sfondo hover:opacity-90",
    
    // Bottone con bordo (secondario)
    outline: "bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50",
    
    // Bottone minimalista (solo testo)
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100 shadow-none",
    
    // Bottone per azioni pericolose (es. Elimina)
    danger: "bg-stato-guasto text-white hover:opacity-90"
  };


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      // Combinazione dinamica di classi base, variante e classi extra
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

