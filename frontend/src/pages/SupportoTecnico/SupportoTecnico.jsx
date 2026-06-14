import React from 'react';
import { useInterventions } from '../../hooks/useInterventions.js';
import TicketFilters from './components/TicketFilters.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetailsDrawer from './components/TicketDetailsDrawer.jsx';
import NewTicketModal from './components/NewTicketModal.jsx';
import Button from '../../components/ui/Button.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';

/**
 * ============================================================
 * COMPONENTE: SupportoTecnico (Pagina di Gestione Ticket)
 * ============================================================
 * Gestisce l'intero workflow di assistenza tecnica.
 * Implementa un pattern "Master-Detail": a sinistra l'elenco dei
 * ticket (Master) e a destra il dettaglio operativo (Detail) per
 * aggiungere note, cambiare stato o eliminare.
 * ============================================================
 */
const SupportoTecnico = () => {
  
  // ============================================================
  // CUSTOM HOOK: useInterventions
  // ============================================================
  // Questo hook centralizza tutta la logica di business relativa
  // agli interventi. Gestisce lo stato globale della pagina, 
  // inclusi i filtri, la selezione e le operazioni di mutazione.
  const {
    tickets,              // Lista completa di tutti i ticket
    filteredTickets,      // Ticket filtrati per lo stato attivo (Aperti/In Corso/Chiusi)
    selectedTicket,      // Oggetto completo del ticket attualmente selezionato
    selectedTicketId,    // ID del ticket selezionato
    toggleTicket,        // Funzione per selezionare/deselezionare un ticket
    activeStatus,        // Stato del filtro attivo
    setActiveStatus,     // Funzione per cambiare il filtro di stato
    counts,              // Conteggi dinamici per i badge dei filtri
    isModalOpen,         // Stato della modale di creazione
    setIsModalOpen,      // Funzione per aprire/chiudere la modale
    createTicket,        // Operazione di creazione
    deleteTicket,        // Operazione di eliminazione
    changeStatus,        // Operazione di avanzamento workflow
    addNote,             // Operazioni sulle note tecniche
    editNote,
    deleteNote,
    loading              // Flag di caricamento API
  } = useInterventions();


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="flex flex-col gap-6 text-brand-testo flex-1 animate-in fade-in duration-500">
      
      {/* HEADER: Filtri di stato e Azione di creazione */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Widget Filtri: Mostra i tab 'Aperti', 'In Corso', 'Chiusi' con i relativi contatori */}
        <TicketFilters 
          counts={counts} 
          active={activeStatus} 
          onChange={setActiveStatus} 
        />
        
        {/* Pulsante per l'apertura della modale di creazione */}
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Nuovo ticket
        </Button>
      </div>

      {/* BODY: Stato di caricamento o Layout Master-Detail */}
      {loading && tickets.length === 0 ? (
        <LoadingState message="Caricamento ticket..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* COLONNA SINISTRA (Master): Elenco dei ticket filtrati */}
          <div className="lg:col-span-1 overflow-y-auto pr-1 custom-scrollbar">
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicketId}
              onSelect={toggleTicket}
            />
          </div>

          {/* COLONNA DESTRA (Detail): Dettaglio, Cronologia Note e Azioni operative */}
          <div className="lg:col-span-2 overflow-y-auto custom-scrollbar">
            <TicketDetailsDrawer
              ticket={selectedTicket}
              onAddNote={addNote}
              onEditNote={editNote}
              onDeleteNote={deleteNote}
              onDeleteTicket={deleteTicket}
              onChangeStatus={changeStatus}
            />
          </div>
        </div>
      )}

      {/* MODALE DI CREAZIONE: Gestisce il form per un nuovo intervento */}
      <NewTicketModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createTicket}
      />
    </div>
  );
};

export default SupportoTecnico;
