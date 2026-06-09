import React from 'react';

const STYLES = {
  // Stati Veicoli/Stazioni
  disponibile: 'bg-stato-disponibile text-brand-testo border-stato-disponibile',
  attivo: 'bg-stato-attivo text-brand-testo border-stato-attivo',
  'in uso': 'bg-stato-attivo text-brand-testo border-stato-attivo',
  'in ricarica': 'bg-stato-inricarica text-brand-testo border-stato-inricarica',
  carica: 'bg-stato-inricarica text-brand-testo border-stato-inricarica',
  manutenzione: 'bg-stato-manutenzione text-white border-stato-manutenzione',
  guasto: 'bg-stato-guasto text-white border-stato-guasto',
  rubato: 'bg-stato-rubato text-white border-stato-rubato',
  offline: 'bg-stato-offline text-white border-stato-offline',
  inattivo: 'bg-stato-offline text-white border-stato-offline',
  
  // Priorità Ticket
  alta: 'bg-stato-guasto text-white border-stato-guasto',
  media: 'bg-stato-inricarica text-brand-testo border-stato-inricarica',
  bassa: 'bg-gray-100 text-gray-600 border-gray-200',
  
  // Stati Ticket
  aperti: 'bg-stato-attivo text-brand-testo border-stato-attivo',
  'in corso': 'bg-stato-inricarica text-brand-testo border-stato-inricarica',
  chiusi: 'bg-stato-disponibile text-brand-testo border-stato-disponibile',
};

/**
 * Atomo: StatusBadge (Unificato).
 * Visualizza uno stato o una priorità con colori coerenti.
 */
export default function StatusBadge({ status, variant = "solid", className = "" }) {
  if (!status) return null;
  const s = status.toLowerCase();
  
  // Trova lo stile corrispondente o usa un default
  let styleKey = Object.keys(STYLES).find(key => s.includes(key)) || 'default';
  let styleClass = STYLES[styleKey] || 'bg-gray-100 text-gray-600 border-gray-200';

  if (variant === 'soft') {
    // Trasforma in versione 'soft' usando opacità (Tailwind handle this well with /20)
    // Ma per semplicità, se lo stile base è 'bg-stato-X', usiamo 'bg-stato-X/20 text-brand-testo'
    const colorPart = styleClass.split(' ')[0].replace('bg-', '');
    styleClass = `bg-${colorPart}/20 text-brand-testo border-${colorPart}/30`;
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styleClass} ${className}`}>
      {status}
    </span>
  );
}
