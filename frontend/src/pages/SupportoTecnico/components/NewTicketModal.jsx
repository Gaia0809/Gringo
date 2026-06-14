import { useState, useEffect } from 'react'
import api from '../../../api.js'
import Modal from '../../../components/ui/Modal'
import { SmartForm, SmartInput, SmartSelect, SmartSearchableSelect } from '../../../components/SmartForm'

/**
 * ============================================================
 * COMPONENTE: NewTicketModal
 * ============================================================
 * Modale dedicata alla creazione di una nuova segnalazione (Ticket).
 * Si occupa di caricare tutte le entità collegate (veicoli, 
 * stazioni, tecnici) per permettere una compilazione assistita.
 * 
 * Props:
 * - open: booleano per la visibilità
 * - onClose: chiusura della modale
 * - onSave: callback per salvare il nuovo ticket sul backend
 * ============================================================
 */
const NewTicketModal = ({ open, onClose, onSave }) => {
  
  // ============================================================
  // USE STATE
  // ============================================================
  // Liste per i dropdown/select del form
  const [vehicles, setVehicles] = useState([])
  const [stations, setStations] = useState([])
  const [technicians, setTechnicians] = useState([])


  // ============================================================
  // USE EFFECT
  // ============================================================
  // Caricamento asincrono parallelo di tutti i dati necessari.
  // Viene eseguito solo quando la modale viene aperta (open = true).
  useEffect(() => {
    if (!open) return
    
    // Eseguiamo tre chiamate API simultanee per ottimizzare i tempi di attesa
    Promise.all([
      api.get('/vehicles'),
      api.get('/stations'),
      api.get('/technicians'),
    ]).then(([v, s, t]) => {
      // Normalizzazione dati per i componenti SmartSelect
      setVehicles((v.data || []).map(item => ({ id: item.id, label: item.license_plate || `ID: ${item.id}` })))
      setStations((s.data || []).map(item => ({ 
        id: item.id, 
        label: `${item.name} (${item.vehicle_type?.name || 'Tipo n.d.'})` 
      })))
      setTechnicians((t.data || []).map(item => ({ id: item.id, label: item.name })))
    }).catch(err => console.error("Errore di caricamento form:", err))
  }, [open])


  // ============================================================
  // GESTORE SUBMIT
  // ============================================================
  const handleSubmit = (values) => {
    // Pulizia e normalizzazione dei dati prima dell'invio al genitore
    onSave({
      ...values,
      station_id: values.station_id || null,
      user_id: values.user_id || null,
      note: values.note?.trim() || null
    })
    onClose()
  }

  // Valori predefiniti per un nuovo ticket
  const initialValues = {
    vehicle_id: '',
    title: '',
    station_id: '',
    priority: 'Media',
    user_id: '',
    note: ''
  }


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <Modal open={open} onClose={onClose} title="Nuovo Ticket Assistenza" maxWidth="max-w-xl">
      
      {/* SmartForm gestisce lo stato interno e gli errori automaticamente */}
      <SmartForm 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Crea ticket"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Titolo occupante l'intera riga */}
          <div className="col-span-2">
            <SmartInput name="title" label="Titolo / Problema riscontrato" placeholder="Es. Sostituzione batteria" required />
          </div>

          {/* Asset coinvolti con ricerca integrata */}
          <SmartSearchableSelect name="vehicle_id" label="Veicolo coinvolto" options={vehicles} placeholder="Seleziona veicolo..." />
          <SmartSearchableSelect name="station_id" label="Stazione (Opzionale)" options={stations} placeholder="Nessuna stazione" />

          {/* Priorità e Assegnazione Tecnica */}
          <SmartSelect name="priority" label="Priorità" options={[
            { id: 'Bassa', label: 'Bassa' },
            { id: 'Media', label: 'Media' },
            { id: 'Alta', label: 'Alta' }
          ]} />

          <SmartSearchableSelect name="user_id" label="Tecnico" options={technicians} placeholder="Non assegnato" />

          {/* Area note occupante l'intera riga */}
          <div className="col-span-2">
            <SmartInput name="note" label="Note iniziali" placeholder="Dettagli del problema..." rows={3} />
          </div>
        </div>
      </SmartForm>
    </Modal>
  )
}

export default NewTicketModal
