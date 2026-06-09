import React from 'react';
import { useInterventions } from '../../hooks/useInterventions.js';
import TicketFilters from './components/TicketFilters.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetailsDrawer from './components/TicketDetailsDrawer.jsx';
import NewTicketModal from './components/NewTicketModal.jsx';
import Button from '../../components/ui/Button.jsx';
import LoadingState from '../../components/ui/LoadingState.jsx';

const SupportoTecnico = () => {
  const {
    tickets,
    filteredTickets,
    selectedTicket,
    selectedTicketId,
    toggleTicket,
    activeStatus,
    setActiveStatus,
    counts,
    isModalOpen,
    setIsModalOpen,
    createTicket,
    deleteTicket,
    changeStatus,
    addNote,
    editNote,
    deleteNote,
    loading
  } = useInterventions();

  return (
    <div className="flex flex-col gap-6 text-brand-testo flex-1">
      {/* Header Supporto Tecnico */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <TicketFilters counts={counts} active={activeStatus} onChange={setActiveStatus} />
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 w-full sm:w-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Nuovo ticket
        </Button>
      </div>

      {loading && tickets.length === 0 ? (
        <LoadingState message="Caricamento ticket..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-1 overflow-y-auto pr-1">
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicketId}
              onSelect={toggleTicket}
            />
          </div>

          <div className="lg:col-span-2 overflow-y-auto">
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

      <NewTicketModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createTicket}
      />
    </div>
  );
};

export default SupportoTecnico;
