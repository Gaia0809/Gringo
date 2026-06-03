import { useTickets } from './hooks/useTickets.js'
import Header from '../../components/Header.jsx'
import TicketFilters from './components/TicketFilters.jsx'
import TicketList from './components/TicketList.jsx'
import TicketDetailsDrawer from './components/TicketDetailsDrawer.jsx'
import NewTicketModal from './components/NewTicketModal.jsx'

const SupportoTecnico = () => {
  const {
    filteredTickets,
    selectedTicket,
    selectedTicketId,
    toggleTicket,
    activeStatus,
    setActiveStatus,
    counts,
    isModalOpen,
    setIsModalOpen,
    loading,
    error,
    createTicket,
    deleteTicket,
    changeStatus,
    addNote,
    editNote,
    deleteNote,
  } = useTickets()

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6 font-sans">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <Header activePage="Supporto tecnico" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="p-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Impostazioni"
          >
            ⚙️
          </button>
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-sm font-bold text-white">
            U
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <TicketFilters counts={counts} active={activeStatus} onChange={setActiveStatus} />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-emerald-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Nuovo ticket
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          Errore nel caricamento dei ticket: {error.message}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse">
                  <div className="h-3 bg-slate-100 rounded w-1/4 mb-3" />
                  <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              ))}
            </div>
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
  )
}

export default SupportoTecnico