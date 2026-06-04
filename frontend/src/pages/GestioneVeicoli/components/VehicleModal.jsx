import { useState, useEffect } from 'react'
import api from '../../../api.js'

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
    {children}
  </div>
)

const inputClass = "p-2.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-colors text-sm bg-brand-sfondo text-brand-testo disabled:bg-brand-sfondowidget disabled:text-gray-400"

const VehicleModal = ({ open, onClose, onSave, vehicle = null, mode = 'create' }) => {
  const isView = mode === 'view'

  const [formData, setFormData] = useState({
    model_id: '',
    license_plate: '',
    status_id: '',
    battery_percentage: 100,
    km_total: 0,
    co2_saved: 0,
    in_movement: false,
    station_id: '',
    position: ''
  })

  const [models, setModels] = useState([])
  const [statuses, setStatuses] = useState([])
  const [stations, setStations] = useState([])

  useEffect(() => {
    if (!open) return
    
    Promise.all([
      api.get('/vehicle-models'),
      api.get('/statuses'),
      api.get('/stations')
    ]).then(([m, s, st]) => {
      setModels(m.data || [])
      setStatuses(s.data || [])
      setStations(st.data || [])
    }).catch(err => console.error("Errore caricamento dati modal:", err))

    if (vehicle) {
      setFormData({
        model_id: vehicle.model_id || '',
        license_plate: vehicle.license_plate || '',
        status_id: vehicle.status_id || '',
        battery_percentage: vehicle.battery_percentage || 0,
        km_total: vehicle.km_total || 0,
        co2_saved: vehicle.co2_saved || 0,
        in_movement: !!vehicle.in_movement,
        station_id: vehicle.station_id || '',
        position: vehicle.position || ''
      })
    } else {
      setFormData({
        model_id: '',
        license_plate: '',
        status_id: '',
        battery_percentage: 100,
        km_total: 0,
        co2_saved: 0,
        in_movement: false,
        station_id: '',
        position: ''
      })
    }
  }, [open, vehicle])

  const handleChange = (e) => {
    if (isView) return
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isView) return
    onSave(formData)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-testo/40 backdrop-blur-sm p-4">
      <div className="bg-brand-sfondo rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 p-6 flex flex-col gap-5 max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-testo">
            {isView ? 'Dettagli Veicolo' : vehicle ? 'Modifica Veicolo' : 'Aggiungi Nuovo Veicolo'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-brand-sfondowidget transition-colors text-gray-400 hover:text-brand-testo cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Modello">
              <select 
                name="model_id" 
                value={formData.model_id} 
                onChange={handleChange} 
                className={inputClass} 
                required
                disabled={isView}
              >
                <option value="">Seleziona modello...</option>
                {models.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.vehicle_type?.name})</option>
                ))}
              </select>
            </Field>

            <Field label="Targa / ID">
              <input
                type="text"
                name="license_plate"
                value={formData.license_plate}
                onChange={handleChange}
                placeholder="Es. AA123BB"
                className={inputClass}
                disabled={isView}
              />
            </Field>

            <Field label="Stato">
              <select 
                name="status_id" 
                value={formData.status_id} 
                onChange={handleChange} 
                className={inputClass} 
                required
                disabled={isView}
              >
                <option value="">Seleziona stato...</option>
                {statuses.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Batteria (%)">
              <input
                type="number"
                name="battery_percentage"
                min="0"
                max="100"
                value={formData.battery_percentage}
                onChange={handleChange}
                className={inputClass}
                disabled={isView}
              />
            </Field>

            <Field label="Km Totali">
              <input
                type="number"
                name="km_total"
                min="0"
                value={formData.km_total}
                onChange={handleChange}
                className={inputClass}
                disabled={isView}
              />
            </Field>

            <Field label="CO2 Risparmiata (kg)">
              <input
                type="number"
                name="co2_saved"
                min="0"
                value={formData.co2_saved}
                onChange={handleChange}
                className={inputClass}
                disabled={isView}
              />
            </Field>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                id="in_movement"
                name="in_movement"
                checked={formData.in_movement}
                onChange={handleChange}
                className="w-4 h-4 text-brand-testo accent-brand-testo"
                disabled={isView}
              />
              <label htmlFor="in_movement" className="text-sm font-semibold text-gray-600">In movimento</label>
            </div>

            {!formData.in_movement ? (
              <Field label="Stazione">
                <select 
                  name="station_id" 
                  value={formData.station_id} 
                  onChange={handleChange} 
                  className={inputClass}
                  disabled={isView}
                >
                  <option value="">Nessuna stazione</option>
                  {stations.map(s => (
                    <option key={s.id} value={s.id}>{s.label || s.name}</option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field label="Posizione (Lat, Long)">
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Es. 45.123, 9.456"
                  className={inputClass}
                  disabled={isView}
                />
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-sfondowidget text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
              {isView ? 'Chiudi' : 'Annulla'}
            </button>
            {!isView && (
              <button type="submit" className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-testo text-brand-sfondo hover:bg-opacity-90 transition-colors cursor-pointer">
                {vehicle ? 'Salva Modifiche' : 'Crea Veicolo'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default VehicleModal
