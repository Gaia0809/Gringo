import { useState, useEffect } from 'react'
import SearchableSelect from './SearchableSelect.jsx'
import api from '../../../api.js'

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
    {children}
  </div>
)

const inputClass = "p-2.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-colors text-sm bg-brand-sfondo text-brand-testo"

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
      setVehicles((v.data || []).map(item => ({ ...item, label: item.license_plate || `ID: ${item.id}` })))
      setStations((s.data || []).map(item => ({ 
        ...item, 
        label: `${item.name} (${item.vehicle_type?.name || 'Tipo n.d.'})` 
      })))
      setTechnicians(t.data || [])
    }).catch(err => console.error("Errore di caricamento form:", err))
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !vehicleId) return
    onSave({
      vehicle_id: vehicleId,
      title,
      station_id: stationId || null,
      priority,
      user_id: userId || null,
      note: note.trim() ? note : null
    })
    onClose()
    setTitle('')
    setVehicleId('')
    setStationId('')
    setPriority('Media')
    setUserId('')
    setNote('')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-testo/40 backdrop-blur-sm p-4">
      <div className="bg-brand-sfondo rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-testo">Nuovo Ticket Assistenza</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-brand-sfondowidget transition-colors text-gray-400 hover:text-brand-testo cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Titolo / Problema riscontrato">
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Es. Sostituzione batteria"
                  className={inputClass}
                  required
                />
              </Field>
            </div>

            <Field label="Veicolo coinvolto">
              <SearchableSelect
                value={vehicleId}
                onChange={setVehicleId}
                options={vehicles}
                placeholder="Seleziona veicolo..."
              />
            </Field>

            <Field label="Stazione (Opzionale)">
              <SearchableSelect
                value={stationId}
                onChange={setStationId}
                options={stations}
                placeholder="Nessuna stazione"
              />
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
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-sfondowidget text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">Annulla</button>
            <button type="submit" className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-testo text-brand-sfondo hover:bg-opacity-90 transition-colors cursor-pointer">Crea ticket</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTicketModal