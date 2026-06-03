import { useState } from 'react'
import Button from '../../../components/Button.jsx'
import { MOCK_VEHICLES, MOCK_STATIONS, MOCK_TECHNICIANS } from '../mockData.js'

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
    {children}
  </div>
)

const inputClass = "p-2.5 border border-slate-200 rounded-xl outline-none focus:border-slate-400 transition-colors text-sm bg-white"

const NewTicketModal = ({ open, onClose, onSave }) => {
  const [vehicle, setVehicle] = useState('')
  const [title, setTitle] = useState('')
  const [station, setStation] = useState('')
  const [priority, setPriority] = useState('Media')
  const [technician, setTechnician] = useState('')
  const [note, setNote] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      status: 'Aperti',
      vehicle: vehicle || 'Asset sconosciuto',
      title: title || 'Nuovo ticket',
      station,
      priority,
      technician: technician || 'Non assegnato',
      notes: note.trim() ? [{ id: 1, text: note.trim() }] : [],
      createdAt: 'Adesso',
    })
    setVehicle(''); setTitle(''); setStation(''); setPriority('Media'); setTechnician(''); setNote('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Crea nuovo ticket</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Titolo problema">
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Es. Gomma bucata"
                  className={inputClass}
                  required
                />
              </Field>
            </div>

            <Field label="Veicolo / Asset">
              <select value={vehicle} onChange={e => setVehicle(e.target.value)} className={inputClass}>
                <option value="">Seleziona asset</option>
                {MOCK_VEHICLES.map(v => (
                  <option key={v.id} value={v.license_plate}>{v.license_plate}</option>
                ))}
              </select>
            </Field>

            <Field label="Stazione">
              <select value={station} onChange={e => setStation(e.target.value)} className={inputClass}>
                <option value="">Seleziona stazione</option>
                {MOCK_STATIONS.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Priorità">
              <select value={priority} onChange={e => setPriority(e.target.value)} className={inputClass}>
                <option>Bassa</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </Field>

            <Field label="Tecnico">
              <select value={technician} onChange={e => setTechnician(e.target.value)} className={inputClass}>
                <option value="">Non assegnato</option>
                {MOCK_TECHNICIANS.map(t => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))}
              </select>
            </Field>

            <div className="col-span-2">
              <Field label="Note iniziali">
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Dettagli del problema..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" onClick={onClose} variant="secondary">Annulla</Button>
            <Button type="submit" variant="primary">Crea ticket</Button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default NewTicketModal