import React from 'react';

/**
 * Atomo: Bottone riutilizzabile.
 * Rappresenta l'azione principale o secondaria in ogni pagina.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenuto (testo o icone)
 * @param {Function} [props.onClick] - Gestore del click
 * @param {'primary' | 'outline' | 'ghost' | 'danger'} [props.variant] - Stile visivo
 * @param {string} [props.className] - Classi Tailwind extra
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = "", 
  disabled = false,
  type = 'button'
}) {
  // Stili base definiti per coerenza visiva
  const baseStyles = "px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  // Mappatura varianti stilistiche
  const variants = {
    primary: "bg-brand-testo text-brand-sfondo hover:opacity-90",
    outline: "bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100 shadow-none",
    danger: "bg-stato-guasto text-white hover:opacity-90"
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

