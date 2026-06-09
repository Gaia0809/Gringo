import { useState, useEffect, useMemo, useCallback } from 'react'
import api from '../api.js'

const mapStatus = (name) => {
  const s = name?.toLowerCase() || ''
  if (s.includes('corso')) return 'In Corso'
  if (s.includes('completato') || s.includes('chiuso') || s.includes('annullato')) return 'Chiusi'
  return 'Aperti'
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const diffDays = Math.floor((new Date() - date) / 86400000)
  if (diffDays === 0) return `Oggi ${date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
  if (diffDays === 1) return `Ieri ${date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`
  return diffDays < 7 ? `${diffDays} giorni fa` : date.toLocaleDateString('it-IT')
}

const mapTicket = (i) => ({
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
})

export function useInterventions() {
  const [tickets, setTickets] = useState([])
  const [activeStatus, setActiveStatus] = useState('Aperti')
  const [selectedTicketId, setSelectedTicketId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [statusMap, setStatusMap] = useState({})

  const fetchInterventions = useCallback(async () => {
    setLoading(true)
    try {
      const [res, statusesRes] = await Promise.all([
        api.get('/interventions'),
        api.get('/intervention-statuses')
      ])
      
      // Crea il mapping dinamicamente { 'NomeStato': id }
      const newStatusMap = (statusesRes.data || []).reduce((acc, s) => {
        acc[s.name] = s.id
        return acc
      }, {})
      setStatusMap(newStatusMap)
      
      setTickets((res.data || []).map(mapTicket))
    } catch (err) {
      console.error("Errore interventi:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchInterventions() }, [fetchInterventions])

  const selectedTicket = useMemo(() => tickets.find(t => t.id === selectedTicketId), [tickets, selectedTicketId])
  const counts = useMemo(() => ({
    'Aperti': tickets.filter(t => t.status === 'Aperti').length,
    'In Corso': tickets.filter(t => t.status === 'In Corso').length,
    'Chiusi': tickets.filter(t => t.status === 'Chiusi').length,
  }), [tickets])

  const filteredTickets = useMemo(() => tickets.filter(t => t.status === activeStatus), [tickets, activeStatus])

  const createTicket = async (data) => {
    // Usa il mapping dinamico per ottenere l'ID di default (es. Aperti)
    const status_id = statusMap['Aperti'] || 1
    const res = await api.post('/interventions', { title: data.title, description: data.note, category_id: 1, status_id })
    const newTicket = mapTicket(res.data)
    setTickets(prev => [newTicket, ...prev])
    setSelectedTicketId(newTicket.id)
    setActiveStatus('Aperti')
    setIsModalOpen(false)
  }

  const deleteTicket = async (id) => {
    await api.delete(`/interventions/${id}`)
    setTickets(prev => prev.filter(t => t.id !== id))
    if (selectedTicketId === id) setSelectedTicketId(null)
  }

  const changeStatus = async (id, name) => {
    const status_id = statusMap[name]
    if (!status_id) return
    await api.put(`/interventions/${id}`, { status_id })
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: name, status_id } : t))
  }

  const addNote = (id, text) => setTickets(prev => prev.map(t => t.id === id ? { ...t, notes: [...t.notes, { id: Date.now(), text, createdAt: new Date().toLocaleString('it-IT') }] } : t))
  const editNote = (id, noteId, text) => setTickets(prev => prev.map(t => t.id === id ? { ...t, notes: t.notes.map(n => n.id === noteId ? { ...n, text } : n) } : t))
  const deleteNote = (id, noteId) => setTickets(prev => prev.map(t => t.id === id ? { ...t, notes: t.notes.filter(n => n.id !== noteId) } : t))

  return {
    tickets, filteredTickets, selectedTicket, selectedTicketId, setSelectedTicketId,
    toggleTicket: (t) => setSelectedTicketId(prev => prev === (t?.id || t) ? null : (t?.id || t)),
    activeStatus, setActiveStatus, counts, isModalOpen, setIsModalOpen, loading,
    createTicket, deleteTicket, changeStatus, addNote, editNote, deleteNote, refreshInterventions: fetchInterventions
  }
}
