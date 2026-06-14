import { useState, useEffect } from 'react'
import { useResource } from '../../../hooks/useResource.js'
import Modal from '../../../components/ui/Modal'
import { SmartForm, SmartInput, SmartSelect, SmartSearchableSelect, useFormContext } from '../../../components/SmartForm'

/**
 * ============================================================
 * COMPONENTE: VehicleFormFields (Sotto-componente)
 * ============================================================
 * Definisce i campi del form per il veicolo.
 * Utilizza 'useFormContext' per accedere in tempo reale ai valori
 * del form (SmartForm) e implementare logiche condizionali (es.
 * mostrare la stazione solo se il veicolo non è in movimento).
 * ============================================================
 */
const VehicleFormFields = ({ models, statuses, stations }) => {
  // Accediamo allo stato interno del form fornito da SmartForm
  const { values } = useFormContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Selezione Modello: utilizza una ricerca avanzata per liste lunghe */}
      <SmartSearchableSelect
        name="model_id"
        label="Modello"
        options={(models || []).map(m => ({ id: m.id, label: `${m.name} (${m.vehicle_type?.name})` }))}
        placeholder="Seleziona modello..."
      />

      <SmartInput name="license_plate" label="Targa / ID" placeholder="Es. AA123BB" />

      {/* Selezione Stato: Disponibile, Guasto, ecc. */}
      <SmartSelect 
        name="status_id" 
        label="Stato" 
        options={statuses} 
        required
      />

      {/* Dati tecnici del veicolo */}
      <SmartInput name="battery_percentage" label="Batteria (%)" type="number" min="0" max="100" />
      <SmartInput name="km_total" label="Km Totali" type="number" min="0" />
      <SmartInput name="co2_saved" label="CO2 Risparmiata (kg)" type="number" min="0" />

      {/* Checkbox per lo stato di movimento */}
      <div className="flex items-center gap-2 py-2">
        <SmartInput name="in_movement" label="In movimento" type="checkbox" />
      </div>

      {/* LOGICA CONDIZIONALE:
          - Se il veicolo è FERMO (!in_movement), chiediamo a quale stazione è assegnato.
          - Se il veicolo è IN MOVIMENTO, chiediamo le coordinate GPS attuali (Position). */}
      {!values.in_movement ? (
        <SmartSearchableSelect
          name="station_id"
          label="Stazione"
          options={(stations || []).map(s => ({ id: s.id, label: s.name }))}
          placeholder="Nessuna stazione"
        />
      ) : (
        <SmartInput name="position" label="Posizione (Lat, Long)" placeholder="Es. 45.123, 9.456" />
      )}
    </div>
  )
}

/**
 * ============================================================
 * COMPONENTE: VehicleModal (Main)
 * ============================================================
 * Modale "intelligente" che gestisce l'intero ciclo di vita di un 
 * veicolo (Creazione, Modifica o sola Visualizzazione).
 * 
 * Si occupa di:
 * 1. Caricare i dati di lookup necessari (modelli, stati, stazioni)
 * 2. Inizializzare i valori del form in base al veicolo selezionato
 * 3. Passare le funzioni di salvataggio al componente SmartForm
 * ============================================================
 */
const VehicleModal = ({ open, onClose, onSave, vehicle = null, mode = 'create' }) => {
  
  // Flag per determinare se il form deve essere bloccato (sola lettura)
  const isView = mode === 'view'

  // ============================================================
  // RECUPERO RISORSE DI SUPPORTO
  // ============================================================
  const { data: models } = useResource('/vehicle-models')
  const { data: statuses } = useResource('/statuses')
  const { data: stations } = useResource('/stations')


  // ============================================================
  // USE STATE: Valori iniziali del form
  // ============================================================
  const [initialValues, setInitialValues] = useState({
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


  // ============================================================
  // USE EFFECT: Sincronizzazione Dati
  // ============================================================
  // Ogni volta che il 'vehicle' passato cambia (o la modale si apre),
  // aggiorniamo i valori iniziali del form.
  useEffect(() => {
    if (vehicle) {
      setInitialValues({
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
      // Reset se stiamo creando un nuovo veicolo
      setInitialValues({
        model_id: '', license_plate: '', status_id: '', battery_percentage: 100,
        km_total: 0, co2_saved: 0, in_movement: false, station_id: '', position: ''
      })
    }
  }, [vehicle, open])


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={isView ? 'Dettagli Veicolo' : vehicle ? 'Modifica Veicolo' : 'Aggiungi Nuovo Veicolo'}
      maxWidth="max-w-2xl"
    >
      {/* SmartForm centralizza la logica di invio e lo stato dei bottoni */}
      <SmartForm
        initialValues={initialValues}
        onSubmit={onSave}
        onCancel={onClose}
        isReadOnly={isView} // Disabilita tutti gli input se in modalità visualizzazione
        submitLabel={vehicle ? 'Salva Modifiche' : 'Crea Veicolo'}
      >
        <VehicleFormFields models={models} statuses={statuses} stations={stations} />
      </SmartForm>
    </Modal>
  )
}

export default VehicleModal
