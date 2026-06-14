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

  // ============================================================
  // USE STATE
  // ============================================================
  // useState crea una "variabile reattiva": quando il valore
  // cambia (tramite il setter, es. setTickets), il componente
  // che usa questo hook viene ri-renderizzato automaticamente.
  // ============================================================

  // Array dei ticket caricati dal backend
  const [tickets, setTickets] = useState([])

  // Tab/filtro attivo: 'Aperti' | 'In Corso' | 'Chiusi'
  const [activeStatus, setActiveStatus] = useState('Aperti')

  // Id del ticket attualmente selezionato (per apertura dettaglio)
  const [selectedTicketId, setSelectedTicketId] = useState(null)

  // Stato apertura/chiusura della modale (es. creazione ticket)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Flag di caricamento, usato per mostrare uno spinner ecc.
  const [loading, setLoading] = useState(true)

  // Mappa { 'NomeStato': id } costruita dinamicamente dal backend,
  // serve per convertire un nome di stato leggibile nel suo ID numerico
  const [statusMap, setStatusMap] = useState({})


  // ============================================================
  // USE CALLBACK
  // ============================================================
  // useCallback memoizza la funzione: con dipendenze [] (array vuoto),
  // la funzione viene creata UNA SOLA VOLTA e non viene ricreata
  // ad ogni render. Questo è fondamentale perché questa funzione
  // viene usata come dipendenza di useEffect (vedi sotto): se fosse
  // ricreata ogni volta, l'effetto si rieseguirebbe ad ogni render,
  // causando chiamate API infinite.
  // ============================================================
  const fetchInterventions = useCallback(async () => {
    setLoading(true)
    try {
      // Esegue due chiamate API in parallelo: ticket e stati possibili
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
  }, []) // <- dipendenze vuote: funzione stabile, creata una sola volta


  // ============================================================
  // USE EFFECT
  // ============================================================
  // useEffect esegue un "side effect" (qui: chiamata API) dopo
  // il render del componente. L'array di dipendenze [fetchInterventions]
  // determina quando l'effetto si rieseguirà.
  //
  // Siccome fetchInterventions è memoizzata con useCallback([]) e
  // quindi non cambia mai riferimento, questo effetto viene eseguito
  // SOLO al primo montaggio del componente (equivalente a
  // "componentDidMount" nelle classi React).
  // ============================================================
  useEffect(() => {
    fetchInterventions()
  }, [fetchInterventions])


  // ============================================================
  // USE MEMO
  // ============================================================
  // useMemo memoizza il RISULTATO di un calcolo: il valore viene
  // ricalcolato solo quando una delle dipendenze elencate cambia.
  // Evita di rifare calcoli costosi (find, filter...) ad ogni render
  // se i dati di base (tickets, activeStatus, selectedTicketId)
  // non sono cambiati.
  // ============================================================

  // Ricalcolato solo se cambiano 'tickets' o 'selectedTicketId'
  const selectedTicket = useMemo(
    () => tickets.find(t => t.id === selectedTicketId),
    [tickets, selectedTicketId]
  )

  // Ricalcolato solo se cambia 'tickets'
  // Conta quanti ticket ci sono per ogni categoria di stato
  const counts = useMemo(() => ({
    'Aperti': tickets.filter(t => t.status === 'Aperti').length,
    'In Corso': tickets.filter(t => t.status === 'In Corso').length,
    'Chiusi': tickets.filter(t => t.status === 'Chiusi').length,
  }), [tickets])

  // Ricalcolato solo se cambiano 'tickets' o 'activeStatus'
  // Restituisce solo i ticket della categoria attualmente selezionata
  const filteredTickets = useMemo(
    () => tickets.filter(t => t.status === activeStatus),
    [tickets, activeStatus]
  )


  // ============================================================
  // FUNZIONI DI MUTAZIONE / AZIONI
  // (non usano hook particolari, ma aggiornano gli stati sopra)
  // ============================================================

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


  // ============================================================
  // RETURN
  // ============================================================
  // Espone stati e funzioni al componente che usa l'hook
  return {
    tickets, filteredTickets, selectedTicket, selectedTicketId, setSelectedTicketId,
    toggleTicket: (t) => setSelectedTicketId(prev => prev === (t?.id || t) ? null : (t?.id || t)),
    activeStatus, setActiveStatus, counts, isModalOpen, setIsModalOpen, loading,
    createTicket, deleteTicket, changeStatus, addNote, editNote, deleteNote, refreshInterventions: fetchInterventions
  }
}