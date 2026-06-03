import { useState, useEffect, useMemo } from 'react'
import api from '../../../services/Api.js'

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
    status: i.status ?? 'Aperti',
    vehicle: i.vehicle ?? '',
    vehicle_id: i.vehicle_id,
    station: i.station ?? '',
    station_id: i.station_id,
    priority: i.priority ?? 'Media',
    technician: i.technician ?? 'Non assegnato',
    technician_id: i.technician_id,
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
  const [error, setError] = useState(/** @type {Error|null} */ (null))

  useEffect(() => {
    setLoading(true)
    api.get('/interventions')
      .then(data => setTickets(data.map(mapTicket)))
      .catch(setError)
      .finally(() => setLoading(false))
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

  const toggleTicket = (ticketId) => {
    setSelectedTicketId(prev => prev === ticketId ? null : ticketId)
  }

  const createTicket = async (ticketData) => {
    const created = await api.post('/interventions', ticketData)
    const newTicket = mapTicket(created)
    setTickets(prev => [newTicket, ...prev])
    setSelectedTicketId(newTicket.id)
    setActiveStatus('Aperti')
    setIsModalOpen(false)
  }

  const deleteTicket = async (ticketId) => {
    await api.delete(`/interventions/${ticketId}`)
    setTickets(prev => prev.filter(t => t.id !== ticketId))
    if (selectedTicketId === ticketId) setSelectedTicketId(null)
  }

  const changeStatus = async (ticketId, newStatus) => {
    const updated = await api.put(`/interventions/${ticketId}`, { status: newStatus })
    const mapped = mapTicket(updated)
    setTickets(prev => prev.map(t => t.id === ticketId ? mapped : t))
    if (selectedTicketId === ticketId && newStatus !== activeStatus) setSelectedTicketId(null)
  }

  const addNote = async (ticketId, noteText) => {
    const note = await api.post(`/interventions/${ticketId}/notes`, { text: noteText })
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      return { ...t, notes: [...t.notes, note] }
    }))
  }

  const editNote = async (ticketId, noteId, newText) => {
    const note = await api.put(`/interventions/${ticketId}/notes/${noteId}`, { text: newText })
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      return { ...t, notes: t.notes.map(n => n.id === noteId ? note : n) }
    }))
  }

  const deleteNote = async (ticketId, noteId) => {
    await api.delete(`/interventions/${ticketId}/notes/${noteId}`)
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      return { ...t, notes: t.notes.filter(n => n.id !== noteId) }
    }))
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
  }
}
