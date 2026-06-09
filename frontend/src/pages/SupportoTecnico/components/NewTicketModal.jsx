import { useState, useEffect } from 'react'
import api from '../../../api.js'
import Modal from '../../../components/ui/Modal'
import { SmartForm, SmartInput, SmartSelect, SmartSearchableSelect } from '../../../components/SmartForm'

const NewTicketModal = ({ open, onClose, onSave }) => {
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
      setVehicles((v.data || []).map(item => ({ id: item.id, label: item.license_plate || `ID: ${item.id}` })))
      setStations((s.data || []).map(item => ({ 
        id: item.id, 
        label: `${item.name} (${item.vehicle_type?.name || 'Tipo n.d.'})` 
      })))
      setTechnicians((t.data || []).map(item => ({ id: item.id, label: item.name })))
    }).catch(err => console.error("Errore di caricamento form:", err))
  }, [open])

  const handleSubmit = (values) => {
    onSave({
      ...values,
      station_id: values.station_id || null,
      user_id: values.user_id || null,
      note: values.note?.trim() || null
    })
    onClose()
  }

  const initialValues = {
    vehicle_id: '',
    title: '',
    station_id: '',
    priority: 'Media',
    user_id: '',
    note: ''
  }

  return (
    <Modal open={open} onClose={onClose} title="Nuovo Ticket Assistenza" maxWidth="max-w-xl">
      <SmartForm 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Crea ticket"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-2">
            <SmartInput name="title" label="Titolo / Problema riscontrato" placeholder="Es. Sostituzione batteria" required />
          </div>

          <SmartSearchableSelect name="vehicle_id" label="Veicolo coinvolto" options={vehicles} placeholder="Seleziona veicolo..." />
          <SmartSearchableSelect name="station_id" label="Stazione (Opzionale)" options={stations} placeholder="Nessuna stazione" />

          <SmartSelect name="priority" label="Priorità" options={[
            { id: 'Bassa', label: 'Bassa' },
            { id: 'Media', label: 'Media' },
            { id: 'Alta', label: 'Alta' }
          ]} />

          <SmartSearchableSelect name="user_id" label="Tecnico" options={technicians} placeholder="Non assegnato" />

          <div className="col-span-2">
            <SmartInput name="note" label="Note iniziali" placeholder="Dettagli del problema..." rows={3} />
          </div>
        </div>
      </SmartForm>
    </Modal>
  )
}

export default NewTicketModal
