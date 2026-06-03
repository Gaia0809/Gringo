import { useState, useEffect } from 'react'
import Button from '../../../components/Button.jsx'
import SearchableSelect from './SearchableSelect.jsx'
import api from '../../../services/Api.js'

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
    {children}
  </div>
)

const inputClass = "p-2.5 border border-slate-200 rounded-xl outline-none focus:border-slate-400 transition-colors text-sm bg-white"

const NewTicketModal = ({ open, onClose, onSave }) => {
  const [vehicleId, setVehicleId] = useState('')
  const [title, setTitle] = useState('')
  const [stationId, setStationId] = useState('')
  const [priority, setPriority] = useState('Media')
  const [userId, setUserId] = useState('')
  const [note, setNote] = useState('')

  const [vehicles, setVehicles] = useState([])
  const [stations, setStations] = useState([])
  const [technicians, setTechnicians] = useState([])

  useEffect(() => {
    if (!open) return
    Promise.all([
      api.get('/vehicles'),
      api.get('/stations'),
      api.get('/technicians'),
    ]).then(([v, s, t]) => {
      setVehicles(v.map(x => ({ id: x.id, label: x.license_plate })))
      setStations(s.map(x => ({ id: x.id, label: x.name })))
      setTechnicians(t.map(x => ({ id: x.id, label: x.name })))
    }).catch(() => {})
  }, [open])

  if (!open) return null

  const reset = () => {
    setVehicleId(''); setTitle(''); setStationId('')
    setPriority('Media'); setUserId(''); setNote('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      title: title || 'Nuovo ticket',
      vehicle_id: vehicleId ? Number(vehicleId) : null,
      station_id: stationId ? Number(stationId) : null,
      technician_id: userId ? Number(userId) : null,
      priority,
      note: note.trim() || null,
    })
    reset()
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
              <SearchableSelect
                value={vehicleId}
                onChange={setVehicleId}
                options={vehicles}
                placeholder="Seleziona asset"
              />
            </Field>

            <Field label="Stazione">
              <select value={stationId} onChange={e => setStationId(e.target.value)} className={inputClass}>
                <option value="">Seleziona stazione</option>
                {stations.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
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
              <SearchableSelect
                value={userId}
                onChange={setUserId}
                options={technicians}
                placeholder="Non assegnato"
              />
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
