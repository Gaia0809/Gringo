import { useState, useMemo } from 'react'
import { MOCK_TICKETS } from '../mockData.js'

export function useTickets() {
  const [tickets, setTickets] = useState(MOCK_TICKETS)
  const [activeStatus, setActiveStatus] = useState('Aperti')
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(/** @type {Error|null} */ (null))

  // --- Quando il backend sarà pronto, sostituire useState(MOCK_TICKETS) con:
  // useEffect(() => {
  //   setLoading(true)
  //   api.get('/issues').then(data => setTickets(data)).catch(setError).finally(() => setLoading(false))
  // }, [])

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

  const createTicket = (ticketData) => {
    const nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1
    const newTicket = { ...ticketData, id: nextId }
    setTickets(prev => [newTicket, ...prev])
    setSelectedTicketId(newTicket.id)
    setActiveStatus('Aperti')
    setIsModalOpen(false)
  }

  const deleteTicket = (ticketId) => {
    const updated = tickets.filter(t => t.id !== ticketId)
    setTickets(updated)
    if (selectedTicketId === ticketId) {
      setSelectedTicketId(null)
    }
  }

  const changeStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t))
    if (selectedTicketId === ticketId && newStatus !== activeStatus) {
      setSelectedTicketId(null)
    }
  }

  const addNote = (ticketId, noteText) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      const nextNoteId = t.notes.length > 0 ? Math.max(...t.notes.map(n => n.id)) + 1 : 1
      return { ...t, notes: [...t.notes, { id: nextNoteId, text: noteText }] }
    }))
  }

  const editNote = (ticketId, noteId, newText) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t
      return { ...t, notes: t.notes.map(n => n.id === noteId ? { ...n, text: newText } : n) }
    }))
  }

  const deleteNote = (ticketId, noteId) => {
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