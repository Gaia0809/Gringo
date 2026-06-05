import React from 'react';

/**
 * Common StatusBadge component
 * @param {Object} props
 * @param {string} props.status - The status text
 * @param {'solid' | 'soft'} [props.variant] - Visual style
 * @param {string} [props.className] - Additional classes
 */
export default function StatusBadge({ status, variant = "solid", className = "" }) {
  if (!status) return null;
  const s = status.toLowerCase();
  
  // Mappatura colori basata sul nome dello stato
  const getStyle = () => {
    if (s.includes('disponibile')) return variant === 'soft' ? 'bg-stato-disponibile/20 text-brand-testo border-stato-disponibile' : 'bg-stato-disponibile text-brand-testo border-stato-disponibile';
    if (s.includes('attivo') || s.includes('in uso')) return variant === 'soft' ? 'bg-stato-attivo/20 text-brand-testo border-stato-attivo' : 'bg-stato-attivo text-brand-testo border-stato-attivo';
    if (s.includes('carica') || s.includes('piena')) return variant === 'soft' ? 'bg-stato-inricarica/20 text-brand-testo border-stato-inricarica' : 'bg-stato-inricarica text-brand-testo border-stato-inricarica';
    if (s.includes('manutenzione')) return variant === 'soft' ? 'bg-stato-manutenzione/20 text-brand-testo border-stato-manutenzione' : 'bg-stato-manutenzione text-white border-stato-manutenzione';
    if (s.includes('guasto')) return variant === 'soft' ? 'bg-stato-guasto/20 text-brand-testo border-stato-guasto' : 'bg-stato-guasto text-white border-stato-guasto';
    if (s.includes('rubato')) return variant === 'soft' ? 'bg-stato-rubato/20 text-brand-testo border-stato-rubato' : 'bg-stato-rubato text-white border-stato-rubato';
    if (s.includes('offline') || s.includes('inattivo')) return variant === 'soft' ? 'bg-stato-offline/20 text-brand-testo border-stato-offline' : 'bg-stato-offline text-white border-stato-offline';
    
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStyle()} ${className}`}>
      {status}
    </span>
  );
}
