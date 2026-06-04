import { useTickets } from './hooks/useTickets.js';
import TicketFilters from './components/TicketFilters.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetailsDrawer from './components/TicketDetailsDrawer.jsx';
import NewTicketModal from './components/NewTicketModal.jsx';

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
  } = useTickets();

  return (
    <div className="flex flex-col gap-6 text-brand-testo">
      <div className="flex items-center justify-between mb-2">
        <TicketFilters counts={counts} active={activeStatus} onChange={setActiveStatus} />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-testo hover:bg-opacity-90 text-brand-sfondo px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Nuovo ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {loading && tickets.length === 0 ? (
            <div className="p-10 text-center text-gray-400 font-bold">Caricamento in corso...</div>
          ) : (
            <TicketList
              tickets={filteredTickets}
              selectedTicketId={selectedTicketId}
              onSelect={toggleTicket}
            />
          )}
        </div>

        <TicketDetailsDrawer
          ticket={selectedTicket}
          onAddNote={addNote}
          onEditNote={editNote}
          onDeleteNote={deleteNote}
          onDeleteTicket={deleteTicket}
          onChangeStatus={changeStatus}
        />
      </div>

      <NewTicketModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={createTicket}
      />
    </div>
  );
};

export default SupportoTecnico;
