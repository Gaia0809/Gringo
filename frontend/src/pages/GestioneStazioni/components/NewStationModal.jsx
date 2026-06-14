import { useState, useEffect } from 'react';
import api from '../../../api';
import Modal from '../../../components/ui/Modal';
import { SmartForm, SmartInput, SmartSelect } from '../../../components/SmartForm';

/**
 * ============================================================
 * COMPONENTE: NewStationModal
 * ============================================================
 * Modale specializzata per la creazione di una nuova stazione.
 * Utilizza 'SmartForm' per gestire in modo dichiarativo lo stato
 * degli input e le validazioni lato server.
 * 
 * Props:
 * - open: booleano per la visibilità
 * - onClose: chiusura della modale
 * - onStationAdded: callback invocata dopo il successo dell'API
 * ============================================================
 */
const NewStationModal = ({ open, onClose, onStationAdded }) => {

  // ============================================================
  // USE STATE
  // ============================================================
  // Lista delle tipologie di veicoli supportati (es. Bici, Auto...)
  // Caricata dal backend per popolare la select nel form.
  const [vehicleTypes, setVehicleTypes] = useState([]);


  // ============================================================
  // USE EFFECT
  // ============================================================
  // Recupera le tipologie di veicoli ogni volta che la modale viene
  // aperta. Assicura che i dati siano sempre aggiornati.
  useEffect(() => {
    if (open) {
      api.get('/vehicle-types')
        .then(res => setVehicleTypes(res.data))
        .catch(err => console.error("Errore caricamento tipologie veicoli:", err));
    }
  }, [open]);


  // ============================================================
  // GESTORE SUBMIT
  // ============================================================
  // Elabora i dati del form e invia la richiesta POST al backend.
  const handleSubmit = async (values) => {
    // Aggiungiamo 'status_id: 1' di default per impostare la nuova 
    // stazione come 'Disponibile' automaticamente alla creazione.
    const payload = { ...values, status_id: 1 }; 
    
    const response = await api.post('/stations', payload);
    
    // Notifica il componente padre del successo per ricaricare la lista
    onStationAdded(response.data);
    onClose();
  };


  // ============================================================
  // RENDER
  // ============================================================
  return (
    <Modal open={open} onClose={onClose} title="Aggiungi Stazione">
      
      {/* SmartForm automatizza il ciclo di vita del form (valori, errori, caricamento) */}
      <SmartForm 
        initialValues={{ name: '', position: '', capacity: 10, vehicle_type_id: '' }}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Salva Stazione"
      >
        <SmartInput name="name" label="Nome Stazione" placeholder="es. Stazione Nord" required />
        <SmartInput name="position" label="Indirizzo / Posizione" placeholder="es. Via Roma, 5" required />

        {/* Layout a due colonne per i parametri tecnici */}
        <div className="grid grid-cols-2 gap-4">
          <SmartInput name="capacity" label="Capienza Massima" type="number" min="1" required />
          <SmartSelect 
            name="vehicle_type_id" 
            label="Tipologia Mezzi" 
            options={vehicleTypes} 
            required 
          />
        </div>
      </SmartForm>
      
    </Modal>
  );
};

export default NewStationModal;
