import React from 'react';

/**
 * CONFIGURAZIONE STILI:
 * Mappa le parole chiave degli stati alle classi CSS Tailwind del brand.
 * Include stati per Veicoli, Stazioni e Ticket/Segnalazioni.
 */
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
 * ============================================================
 * ATOMO: StatusBadge (Badge di Stato Unificato)
 * ============================================================
 * Visualizza un'etichetta arrotondata colorata in base allo stato
 * passato come stringa. Centralizza la logica cromatica di tutto
 * l'ecosistema Gringo.
 * 
 * @param {Object} props
 * @param {string} props.status - Il testo dello stato (es. "In Manutenzione")
 * @param {'solid' | 'soft'} [props.variant] - Stile pieno o con trasparenza
 * @param {string} [props.className] - Classi extra
 * ============================================================
 */
export default function StatusBadge({ status, variant = "solid", className = "" }) {
  
  // Se non viene passato alcuno stato, non renderizziamo nulla
  if (!status) return null;
  
  const s = status.toLowerCase();
  
  /**
   * LOGICA DI MAPPATURA:
   * Cerchiamo se la stringa 'status' contiene una delle chiavi 
   * definite nell'oggetto STYLES. Questo permette di gestire
   * variazioni testuali (es. "Asset Guasto" -> "guasto").
   */
  let styleKey = Object.keys(STYLES).find(key => s.includes(key)) || 'default';
  let styleClass = STYLES[styleKey] || 'bg-gray-100 text-gray-600 border-gray-200';

  /**
   * GESTIONE VARIANTE 'SOFT':
   * Se richiesto, trasformiamo lo stile 'solid' in una versione
   * semi-trasparente. Invece di 'bg-stato-X', usiamo 'bg-stato-X/20'
   * per un look più leggero e moderno.
   */
  if (variant === 'soft') {
    const colorPart = styleClass.split(' ')[0].replace('bg-', '');
    // Creiamo la combinazione dinamica di opacità per sfondo e bordo
    styleClass = `bg-${colorPart}/20 text-brand-testo border-${colorPart}/30`;
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${styleClass} ${className}`}>
      {status}
    </span>
  );
}
