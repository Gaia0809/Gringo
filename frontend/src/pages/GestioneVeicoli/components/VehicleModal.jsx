import { useState, useEffect } from 'react'
import { useResource } from '../../../hooks/useResource.js'
import Modal from '../../../components/ui/Modal'
import { SmartForm, SmartInput, SmartSelect, SmartSearchableSelect, useFormContext } from '../../../components/SmartForm'

/**
 * Contenuto condizionale del form che accede al contesto per reagire ai cambiamenti
 */
const VehicleFormFields = ({ models, statuses, stations }) => {
  const { values } = useFormContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SmartSearchableSelect
        name="model_id"
        label="Modello"
        options={(models || []).map(m => ({ id: m.id, label: `${m.name} (${m.vehicle_type?.name})` }))}
        placeholder="Seleziona modello..."
      />

      <SmartInput name="license_plate" label="Targa / ID" placeholder="Es. AA123BB" />

      <SmartSelect 
        name="status_id" 
        label="Stato" 
        options={statuses} 
        required
      />

      <SmartInput name="battery_percentage" label="Batteria (%)" type="number" min="0" max="100" />
      <SmartInput name="km_total" label="Km Totali" type="number" min="0" />
      <SmartInput name="co2_saved" label="CO2 Risparmiata (kg)" type="number" min="0" />

      <div className="flex items-center gap-2 py-2">
        <SmartInput name="in_movement" label="In movimento" type="checkbox" />
      </div>

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

const VehicleModal = ({ open, onClose, onSave, vehicle = null, mode = 'create' }) => {
  const isView = mode === 'view'
  const { data: models } = useResource('/vehicle-models')
  const { data: statuses } = useResource('/statuses')
  const { data: stations } = useResource('/stations')

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
    }
  }, [vehicle, open])

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={isView ? 'Dettagli Veicolo' : vehicle ? 'Modifica Veicolo' : 'Aggiungi Nuovo Veicolo'}
      maxWidth="max-w-2xl"
    >
      <SmartForm
        initialValues={initialValues}
        onSubmit={onSave}
        onCancel={onClose}
        isReadOnly={isView}
        submitLabel={vehicle ? 'Salva Modifiche' : 'Crea Veicolo'}
      >
        <VehicleFormFields models={models} statuses={statuses} stations={stations} />
      </SmartForm>
    </Modal>
  )
}

export default VehicleModal
