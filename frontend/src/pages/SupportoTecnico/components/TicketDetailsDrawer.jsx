import { useState } from 'react'
import StatusButton from './StatusButton.jsx'
import PriorityBadge from './PriorityBadge.jsx'
import Button from '../../../components/Button.jsx'

const DetailCard = ({ label, value }) => (
  <div className="bg-white rounded-xl border border-slate-100 p-3">
    <p className="text-xs text-slate-400 mb-0.5">{label}</p>
    <p className="font-semibold text-slate-800 text-sm">{value || '—'}</p>
  </div>
)

const TicketDetailsDrawer = ({ ticket, onAddNote, onEditNote, onDeleteNote, onDeleteTicket, onChangeStatus }) => {
  const [newNote, setNewNote] = useState('')
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editNoteText, setEditNoteText] = useState('')

  if (!ticket) {
    return (
      <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center py-20 text-slate-400">
        <svg className="w-14 h-14 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
        </svg>
        <p className="text-sm font-medium">Seleziona un ticket per vedere i dettagli</p>
      </div>
    )
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!newNote.trim()) return
    onAddNote(ticket.id, newNote.trim())
    setNewNote('')
  }

  const startEdit = (note) => {
    setEditingNoteId(note.id)
    setEditNoteText(note.text)
  }

  const saveEdit = () => {
    if (!editNoteText.trim()) return
    onEditNote(ticket.id, editingNoteId, editNoteText.trim())
    setEditingNoteId(null)
  }

  return (
    <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col gap-6">

      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1">
            #{ticket.id} · {ticket.createdAt}
          </p>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">{ticket.title}</h2>
        </div>
        <button
          onClick={() => onDeleteTicket(ticket.id)}
          className="p-2 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Elimina ticket"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="flex gap-2">
        {['Aperti', 'In Corso', 'Chiusi'].map(status => (
          <StatusButton
            key={status}
            status={status}
            variant={ticket.status === status ? 'default' : 'outline'}
            onClick={() => onChangeStatus(ticket.id, status)}
          />
        ))}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Dettagli</p>
        <div className="grid grid-cols-2 gap-3">
          <DetailCard label="Veicolo / Asset" value={ticket.vehicle} />
          <DetailCard label="Stazione" value={ticket.station} />
          <div className="bg-white rounded-xl border border-slate-100 p-3">
            <p className="text-xs text-slate-400 mb-1">Priorità</p>
            <PriorityBadge priority={ticket.priority} />
          </div>
          <DetailCard label="Tecnico assegnato" value={ticket.technician} />
        </div>
      </div>

      {ticket.notes.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Note</p>
          <div className="flex flex-col gap-2">
            {ticket.notes.map(nota => (
              <div key={nota.id} className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
                {editingNoteId === nota.id ? (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={editNoteText}
                      onChange={e => setEditNoteText(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm resize-none focus:border-slate-400 transition-colors"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingNoteId(null)} className="text-xs px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors">Annulla</button>
                      <button onClick={saveEdit} className="text-xs px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors">Salva</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start gap-3">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{nota.text}</p>
                    <div className="flex gap-1.5 shrink-0 text-slate-300">
                      <button onClick={() => startEdit(nota)} className="hover:text-blue-500 transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button onClick={() => onDeleteNote(ticket.id, nota.id)} className="hover:text-red-500 transition-colors p-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Aggiungi nota</p>
        <form onSubmit={handleAddNote} className="flex flex-col gap-3">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Scrivi qui i dettagli del report..."
            rows={3}
            className="w-full p-3 rounded-xl border border-slate-200 outline-none resize-none text-sm focus:border-slate-400 transition-colors bg-white"
          />
          <div>
            <Button type="submit" variant="primary" disabled={!newNote.trim()}>
              Aggiungi nota
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default TicketDetailsDrawer