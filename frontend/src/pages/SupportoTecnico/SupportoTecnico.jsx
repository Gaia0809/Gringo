import { useState, useMemo, useEffect } from 'react';
import TicketFilters from './components/TicketFilters.jsx';
import TicketList from './components/TicketList.jsx';
import TicketDetailsDrawer from './components/TicketDetailsDrawer.jsx';
import NewTicketModal from './components/NewTicketModal.jsx';
import api from '../../api.js';

const mapStatus = (statusName) => {
  const s = statusName?.toLowerCase() || '';
  if (s.includes('attesa') || s.includes('aperto')) return 'Aperti';
  if (s.includes('corso')) return 'In Corso';
  if (s.includes('completato') || s.includes('chiuso')) return 'Chiusi';
  return 'Aperti';
};

const SupportoTecnico = () => {
  const [activeStatus, setActiveStatus] = useState('Aperti');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  const fetchTickets = () => {
    api.get('/interventions')
      .then(res => {
        // Mappatura dati backend -> frontend
        const mapped = res.data.map(t => ({
          id: t.id,
          title: t.title,
          vehicle: t.issue?.booking?.vehicle?.license_plate || 'Generico',
          technician: t.issue?.assignedTo?.name || 'Non assegnato',
          priority: t.issue?.priority || 'Media',
          status: mapStatus(t.status?.name),
          createdAt: new Date(t.created_at).toLocaleString('it-IT'),
          notes: [] // Le note potrebbero essere interventi correlati o un campo dedicato
        }));
        setTickets(mapped);
      })
      .catch(err => {
        console.error("Errore caricamento ticket:", err);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => t.status === activeStatus);
  }, [tickets, activeStatus]);

  const selectedTicket = useMemo(() => {
    return tickets.find(t => t.id === selectedTicketId) || null;
  }, [tickets, selectedTicketId]);

  const toggleTicket = (ticket) => {
    setSelectedTicketId(selectedTicketId === ticket.id ? null : ticket.id);
  };

  const counts = useMemo(() => {
    return {
      Aperti: tickets.filter(t => t.status === 'Aperti').length,
      'In Corso': tickets.filter(t => t.status === 'In Corso').length,
      Chiusi: tickets.filter(t => t.status === 'Chiusi').length,
    };
  }, [tickets]);

  const changeStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const deleteTicket = (ticketId) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    if (selectedTicketId === ticketId) setSelectedTicketId(null);
  };

  const createTicket = (newTicketData) => {
    const nuovo = {
      id: tickets.length + 1,
      title: newTicketData.title,
      vehicle: `Veicolo #${newTicketData.vehicle_id || 'Generico'}`,
      technician: "Non assegnato",
      priority: newTicketData.priority,
      status: "Aperti",
      createdAt: new Date().toLocaleString('it-IT'),
      notes: newTicketData.note ? [{ id: Date.now(), text: newTicketData.note, createdAt: new Date().toLocaleString('it-IT') }] : []
    };
    setTickets(prev => [nuovo, ...prev]);
  };

  const addNote = (ticketId, text) => {
    const nuovaNota = { id: Date.now(), text, createdAt: new Date().toLocaleString('it-IT') };
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, notes: [...t.notes, nuovaNota] } : t));
  };

  const editNote = (ticketId, noteId, text) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t, notes: t.notes.map(n => n.id === noteId ? { ...n, text } : n)
    } : t));
  };

  const deleteNote = (ticketId, noteId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t, notes: t.notes.filter(n => n.id !== noteId)
    } : t));
  };

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
          <TicketList
            tickets={filteredTickets}
            selectedTicketId={selectedTicketId}
            onSelect={toggleTicket}
          />
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