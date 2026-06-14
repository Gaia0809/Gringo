import React from 'react';
import StatusBadge from '../../../components/ui/StatusBadge.jsx';
import EmptyState from '../../../components/ui/EmptyState.jsx';

/**
 * ============================================================
 * COMPONENTE: TicketList (Master List)
 * ============================================================
 * Renderizza l'elenco verticale dei ticket. Gestisce lo stato 
 * visivo della selezione, evidenziando il ticket attualmente
 * aperto nel dettaglio.
 * 
 * Props:
 * - tickets: array di oggetti ticket filtrati
 * - selectedTicketId: ID del ticket attualmente evidenziato
 * - onSelect: callback per notificare il padre della selezione
 * ============================================================
 */
const TicketList = ({ tickets, selectedTicketId, onSelect }) => {
  
  // Render alternativo se la categoria selezionata non ha elementi
  if (tickets.length === 0) {
    return <EmptyState message="Nessun ticket in questa categoria" />;
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
      {tickets.map(ticket => {
        
        // Verifica se questa riga corrisponde al ticket selezionato
        const isSelected = selectedTicketId === ticket.id;
        
        return (
          <div
            key={ticket.id}
            onClick={() => onSelect(ticket)}
            className={`card !p-4 transition-all duration-300 cursor-pointer border-2 ${
              isSelected
                /* Stile quando SELEZIONATO: colori invertiti per massimo risalto */
                ? 'bg-brand-testo border-brand-testo text-brand-sfondo shadow-xl -translate-y-1'
                /* Stile standard: bordi sottili e colori brand standard */
                : 'bg-brand-sfondo border-gray-100 hover:border-gray-200 hover:shadow-md text-brand-testo'
            }`}
          >
            {/* Riga superiore: ID e Badge Priorità */}
            <div className="flex justify-between items-start mb-3">
              <span className={`text-[10px] font-bold tracking-widest uppercase ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>
                Ticket #{ticket.id}
              </span>
              <StatusBadge status={ticket.priority} />
            </div>
            
            {/* Titolo della segnalazione */}
            <h3 className={`font-bold text-sm mb-3 leading-snug ${isSelected ? 'text-brand-sfondo' : 'text-brand-testo'}`}>
              {ticket.title}
            </h3>
            
            {/* Info secondarie: Veicolo e Tecnico */}
            <div className="flex items-center gap-2 text-[11px] font-semibold">
              <span className={isSelected ? 'text-gray-300' : 'text-gray-500'}>{ticket.vehicle}</span>
              <span className={isSelected ? 'text-gray-600' : 'text-gray-200'}>·</span>
              <span className={isSelected ? 'text-gray-300' : 'text-gray-500'}>{ticket.technician}</span>
            </div>
            
            {/* Indicatore presenza note: appare solo se ci sono interventi registrati */}
            {ticket.notes.length > 0 && (
              <div className={`mt-3 pt-3 border-t ${isSelected ? 'border-white/10 text-stato-attivo' : 'border-gray-50 text-gray-400'} flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{ticket.notes.length} {ticket.notes.length === 1 ? 'nota' : 'note'}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TicketList;
