import React, { useState } from 'react';
import StatusBadge from '../../../components/ui/StatusBadge'
import Button from '../../../components/ui/Button'

/**
 * Configurazione degli stili per i pulsanti di cambio stato.
 * Associa ogni macro-stato (Aperti, In Corso, Chiusi) ai colori del brand.
 */
const STATUS_STYLES = {
  Aperti: {
    default: 'bg-stato-attivo text-brand-testo hover:opacity-90',
    outline: 'bg-stato-attivo/10 text-brand-testo border border-stato-attivo hover:bg-stato-attivo/20',
    badge: 'bg-stato-attivo/20 text-brand-testo border border-stato-attivo/30',
  },
  'In Corso': {
    default: 'bg-stato-inricarica text-brand-testo hover:opacity-90',
    outline: 'bg-stato-inricarica/10 text-brand-testo border border-stato-inricarica hover:bg-stato-inricarica/20',
    badge: 'bg-stato-inricarica/20 text-brand-testo border border-stato-inricarica/30',
  },
  Chiusi: {
    default: 'bg-stato-disponibile text-brand-testo hover:opacity-90',
    outline: 'bg-stato-disponibile/10 text-brand-testo border border-stato-disponibile hover:bg-stato-disponibile/20',
    badge: 'bg-stato-disponibile/20 text-brand-testo border border-stato-disponibile/30',
  },
}

/**
 * Componente interno: StatusButton
 * Un pulsante stilizzato per il cambio rapido di stato del ticket.
 */
const StatusButton = ({ status, onClick, variant = 'default', className = '', disabled = false }) => {
  const styles = STATUS_STYLES[status] || STATUS_STYLES['Aperti']
  const style = styles[variant] || styles.default

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-xl transition-all py-2 px-4 text-sm outline-none cursor-pointer ${style} ${className}`}
    >
      {status}
    </button>
  )
}

/**
 * Componente interno: DetailCard
 * Visualizza una singola informazione di dettaglio (etichetta + valore).
 */
const DetailCard = ({ label, value }) => (
  <div className="bg-brand-sfondo rounded-xl border border-gray-100 p-3">
    <p className="text-xs text-gray-400 mb-0.5">{label}</p>
    <p className="font-semibold text-brand-testo text-sm">{value || '—'}</p>
  </div>
)

/**
 * ============================================================
 * COMPONENTE: TicketDetailsDrawer (Dettaglio Operativo)
 * ============================================================
 * Visualizza tutte le informazioni di un singolo ticket selezionato.
 * Permette di interagire con il ticket attraverso:
 * 1. Cambio di stato (Workflow tecnico)
 * 2. Gestione Timeline delle note (Aggiunta/Modifica/Eliminazione)
 * 3. Eliminazione del ticket stesso
 * ============================================================
 */
const TicketDetailsDrawer = ({ 
  ticket, 
  onAddNote, 
  onEditNote, 
  onDeleteNote, 
  onDeleteTicket, 
  onChangeStatus 
}) => {

  // ============================================================
  // USE STATE: Gestione Note e Editing
  // ============================================================
  
  // Testo per una nuova nota in fase di scrittura
  const [newNote, setNewNote] = useState('')
  
  // ID della nota attualmente in fase di modifica (null se nessuna)
  const [editingNoteId, setEditingNoteId] = useState(null)
  
  // Buffer temporaneo per il testo della nota in modifica
  const [editNoteText, setEditNoteText] = useState('')


  // ============================================================
  // GESTORI AZIONI
  // ============================================================

  // Salva una nuova nota tecnica
  const handleAddNote = (e) => {
    e.preventDefault()
    if (!newNote.trim()) return
    onAddNote(ticket.id, newNote.trim())
    setNewNote('')
  }

  // Avvia la modalità di editing per una nota esistente
  const startEdit = (nota) => {
    setEditingNoteId(nota.id)
    setEditNoteText(nota.text)
  }

  // Salva le modifiche a una nota esistente
  const saveEdit = (notaId) => {
    if (!editNoteText.trim()) return
    onEditNote(ticket.id, notaId, editNoteText.trim())
    setEditingNoteId(null)
    setEditNoteText('')
  }


  // ============================================================
  // RENDER: Caso Vuoto (Nessun Ticket Selezionato)
  // ============================================================
  if (!ticket) {
    return (
      <div className="lg:col-span-2 bg-brand-sfondowidget/50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center py-20 text-gray-400 animate-in fade-in duration-300">
        <svg className="w-14 h-14 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <p className="text-sm font-medium">Seleziona un ticket dalla lista per vederne i dettagli</p>
      </div>
    )
  }


  // ============================================================
  // RENDER: Dettaglio Ticket
  // ============================================================
  return (
    <div className="lg:col-span-2 bg-brand-sfondo rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 h-fit animate-in slide-in-from-right-4 duration-300">
      
      {/* 1. HEADER: Titolo, ID e Bottoni Workflow */}
      <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-sm font-bold text-gray-400">#{ticket.id}</span>
            <StatusBadge status={ticket.priority} />
          </div>
          <h2 className="text-lg font-bold text-brand-testo leading-snug">{ticket.title}</h2>
        </div>
        
        {/* Pulsantiera per il cambio di stato */}
        <div className="flex items-center gap-2">
          {ticket.status !== 'Aperti' && (
            <StatusButton
              status="Aperti"
              onClick={() => onChangeStatus(ticket.id, 'Aperti')}
              variant="outline"
              className="text-[10px] px-3 py-1.5"
            />
          )}
          {ticket.status !== 'In Corso' && (
            <StatusButton
              status="In Corso"
              onClick={() => onChangeStatus(ticket.id, 'In Corso')}
              variant="outline"
              className="text-[10px] px-3 py-1.5"
            />
          )}
          {ticket.status !== 'Chiusi' && (
            <StatusButton
              status="Chiusi"
              onClick={() => onChangeStatus(ticket.id, 'Chiusi')}
              variant="outline"
              className="text-[10px] px-3 py-1.5"
            />
          )}
          {/* Tasto Eliminazione */}
          <button
            onClick={() => { if (window.confirm('Eliminare questo ticket?')) onDeleteTicket(ticket.id) }}
            className="p-2.5 rounded-xl text-stato-guasto hover:bg-stato-guasto/10 transition-colors cursor-pointer"
            title="Elimina ticket"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. AREA INFORMAZIONI (GRID) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-brand-sfondowidget/50 p-3 rounded-2xl">
        <DetailCard label="Stato Attuale" value={ticket.status} />
        <DetailCard label="Veicolo" value={ticket.vehicle} />
        <DetailCard label="Tecnico Assegnato" value={ticket.technician} />
        <DetailCard label="Creato il" value={ticket.createdAt} />
      </div>

      {/* 3. TIMELINE DELLE NOTE: Cronologia interventi dei tecnici */}
      {ticket.notes.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Timeline Interventi</p>
          <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {ticket.notes.map(nota => (
              <div key={nota.id} className="bg-brand-sfondowidget/50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-2 relative group animate-in slide-in-from-top-2">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span className="font-semibold text-gray-600">Report Tecnico</span>
                  <span>{nota.createdAt}</span>
                </div>
                
                {/* Visualizzazione Condizionale: Edit vs Read */}
                {editingNoteId === nota.id ? (
                  <div className="flex flex-col gap-2 mt-1">
                    <textarea
                      value={editNoteText}
                      onChange={e => setEditNoteText(e.target.value)}
                      className="w-full p-2 text-sm border border-gray-200 bg-brand-sfondo rounded-xl outline-none"
                      rows={2}
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" onClick={() => setEditingNoteId(null)} className="text-xs px-2.5 py-1.5">Annulla</Button>
                      <Button onClick={() => saveEdit(nota.id)} className="text-xs px-2.5 py-1.5">Salva</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{nota.text}</p>
                    {/* Pulsanti Edit/Delete a comparsa (hover) */}
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity absolute top-3 right-3 bg-brand-sfondowidget/80 pl-2 rounded-lg shadow-sm">
                      <button onClick={() => startEdit(nota)} className="hover:text-brand-testo text-gray-400 p-1 cursor-pointer">✏️</button>
                      <button onClick={() => onDeleteNote(ticket.id, nota.id)} className="hover:text-stato-guasto text-gray-400 p-1 cursor-pointer">🗑️</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FORM NUOVA NOTA */}
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Aggiungi nota</p>
        <form onSubmit={handleAddNote} className="flex flex-col gap-3">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Scrivi qui i dettagli del report..."
            rows={3}
            className="w-full p-3 border border-gray-200 rounded-2xl text-sm outline-none focus:border-brand-testo transition-colors bg-brand-sfondo resize-none shadow-inner"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!newNote.trim()}>
              Aggiungi nota
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TicketDetailsDrawer