import React from 'react';

/**
 * Componente interno: FilterButton
 * Gestisce l'aspetto e il comportamento di un singolo tab di filtraggio.
 * Include una logica complessa di mappatura colori basata sul macro-stato.
 */
const FilterButton = ({ label, isActive, onClick, count, color = 'emerald' }) => {
  
  // Configurazione degli stili dinamici per ogni categoria di filtro
  const colorMap = {
    emerald: {
      active: 'bg-stato-attivo text-brand-testo shadow-md shadow-stato-attivo/20',
      inactive: 'bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50',
      badge: { active: 'bg-brand-testo/10 text-brand-testo', inactive: 'bg-stato-attivo/20 text-brand-testo' },
    },
    orange: {
      active: 'bg-stato-inricarica text-brand-testo shadow-md shadow-stato-inricarica/20',
      inactive: 'bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50',
      badge: { active: 'bg-brand-testo/10 text-brand-testo', inactive: 'bg-stato-inricarica/20 text-brand-testo' },
    },
    cyan: {
      active: 'bg-stato-disponibile text-brand-testo shadow-md shadow-stato-disponibile/20',
      inactive: 'bg-brand-sfondo text-brand-testo border border-gray-200 hover:bg-gray-50',
      badge: { active: 'bg-brand-testo/10 text-brand-testo', inactive: 'bg-stato-disponibile/20 text-brand-testo' },
    },
  }

  const s = colorMap[color]

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer ${isActive ? s.active : s.inactive}`}
    >
      {label}
      
      {/* Badge del conteggio: indica quanti ticket appartengono a questa categoria */}
      {count !== undefined && (
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? s.badge.active : s.badge.inactive}`}>
          {count}
        </span>
      )}
    </button>
  )
}

// Configurazione delle schede disponibili (Tab)
const TABS = [
  { label: 'Aperti', color: 'emerald' },
  { label: 'In Corso', color: 'orange' },
  { label: 'Chiusi', color: 'cyan' },
]

/**
 * ============================================================
 * COMPONENTE: TicketFilters (Barra di Navigazione Stati)
 * ============================================================
 * Fornisce i controlli per filtrare l'elenco dei ticket in base 
 * al loro avanzamento nel workflow tecnico.
 * 
 * Props:
 * - counts: oggetto { Stato: numero } con i totali dinamici
 * - active: lo stato attualmente selezionato
 * - onChange: callback per cambiare la selezione nel padre
 * ============================================================
 */
const TicketFilters = ({ counts, active, onChange }) => (
  <div className="flex items-center gap-3">
    {TABS.map(tab => (
      <FilterButton
        key={tab.label}
        label={tab.label}
        color={tab.color}
        isActive={active === tab.label}
        onClick={() => onChange(tab.label)}
        count={counts[tab.label] ?? 0}
      />
    ))}
  </div>
)

export default TicketFilters
