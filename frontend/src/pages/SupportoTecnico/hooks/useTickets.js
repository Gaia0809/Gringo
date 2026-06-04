import { useState, useEffect, useMemo } from 'react'
import api from '../../../api.js'

const STATUS_MAP = {
  'Aperti': 1,
  'In Corso': 2,
  'Chiusi': 3,
}

const REVERSE_STATUS_MAP = {
  1: 'Aperti',
  2: 'In Corso',
  3: 'Chiusi',
  4: 'Chiusi', // Annullato mappato a Chiusi per semplicità
}

function mapStatus(statusName) {
  const s = statusName?.toLowerCase() || '';
  if (s.includes('attesa') || s.includes('aperto')) return 'Aperti';
  if (s.includes('corso')) return 'In Corso';
  if (s.includes('completato') || s.includes('chiuso') || s.includes('annullato')) return 'Chiusi';
  return 'Aperti';
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return `Oggi ${date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
  } else if (diffDays === 1) {
    return `Ieri ${date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
  } else if (diffDays < 7) {
    return `${diffDays} giorni fa`
  } else if (diffDays < 14) {
    return '1 settimana fa'
  } else {
    return date.toLocaleDateString('it-IT')
  }
}

function mapTicket(i) {
  return {
    id: i.id,
    title: i.title,
    status: mapStatus(i.status?.name),
    status_id: i.status_id,
    vehicle: i.issue?.booking?.vehicle?.license_plate ?? 'Generico',
    vehicle_id: i.issue?.booking?.vehicle_id,
    station: i.issue?.booking?.vehicle?.station?.name ?? '',
    station_id: i.issue?.booking?.vehicle?.station_id,
    priority: i.issue?.priority ?? 'Media',
    technician: i.issue?.assigned_to?.name ?? 'Non assegnato',
    technician_id: i.issue?.assigned_to?.id,
    notes: i.notes ?? [],
    createdAt: formatDate(i.created_at),
  }
}

export function useTickets() {
  const [tickets, setTickets] = useState([])
  const [activeStatus, setActiveStatus] = useState('Aperti')
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTickets = () => {
    setLoading(true)
    api.get('/interventions')
      .then(res => setTickets(res.data.map(mapTicket)))
      .catch(setError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const selectedTicket = useMemo(
    () => tickets.find(t => t.id === selectedTicketId) || null,
    [tickets, selectedTicketId]
  )

  const counts = useMemo(() => ({
    'Aperti': tickets.filter(t => t.status === 'Aperti').length,
    'In Corso': tickets.filter(t => t.status === 'In Corso').length,
    'Chiusi': tickets.filter(t => t.status === 'Chiusi').length,
  }), [tickets])

  const filteredTickets = useMemo(
    () => tickets.filter(t => t.status === activeStatus),
    [tickets, activeStatus]
  )

  const toggleTicket = (ticket) => {
    const id = typeof ticket === 'object' ? ticket.id : ticket;
    setSelectedTicketId(prev => prev === id ? null : id)
  }

  const createTicket = async (ticketData) => {
    try {
      // Per semplicità usiamo la categoria 1 e status 1 se non specificati
      const payload = {
        title: ticketData.title,
        description: ticketData.note,
        category_id: 1, // Tagliando di default
        status_id: 1,   // In Attesa
        // Se avessimo un sistema per creare l'issue andrebbe qui
      }
      const res = await api.post('/interventions', payload)
      const newTicket = mapTicket(res.data)
      setTickets(prev => [newTicket, ...prev])
      setSelectedTicketId(newTicket.id)
      setActiveStatus('Aperti')
      setIsModalOpen(false)
    } catch (err) {
      console.error("Errore creazione ticket:", err)
      throw err
    }
  }

  const deleteTicket = async (ticketId) => {
    try {
      await api.delete(`/interventions/${ticketId}`)
      setTickets(prev => prev.filter(t => t.id !== ticketId))
      if (selectedTicketId === ticketId) setSelectedTicketId(null)
    } catch (err) {
      console.error("Errore eliminazione ticket:", err)
    }
  }

  const changeStatus = async (ticketId, newStatusName) => {
    try {
      const status_id = STATUS_MAP[newStatusName]
      if (!status_id) return

      const res = await api.put(`/interventions/${ticketId}`, { status_id })
      // Laravel ritorna l'oggetto aggiornato ma senza relazioni caricate a volte,
      // meglio rinfrescare o mappare se possibile. 
      // Qui facciamo una patch locale per non rifare la get di tutto
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatusName, status_id } : t))
      
      // Se il ticket cambia tab e non è più visibile, lo deselezioniamo
      if (selectedTicketId === ticketId && newStatusName !== activeStatus) {
        setSelectedTicketId(null)
      }
    } catch (err) {
      console.error("Errore cambio stato:", err)
    }
  }

  const addNote = (ticketId, text) => {
    // Nota locale per ora, o implementare API note
    const nuovaNota = { id: Date.now(), text, createdAt: new Date().toLocaleString('it-IT') };
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, notes: [...t.notes, nuovaNota] } : t));
  }

  const editNote = (ticketId, noteId, text) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t, notes: t.notes.map(n => n.id === noteId ? { ...n, text } : n)
    } : t));
  }

  const deleteNote = (ticketId, noteId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t, notes: t.notes.filter(n => n.id !== noteId)
    } : t));
  }

  return {
    tickets,
    filteredTickets,
    selectedTicket,
    selectedTicketId,
    setSelectedTicketId,
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
    fetchTickets
  }
}
