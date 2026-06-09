import { useState, useEffect } from 'react';
import api from '../../../api';
import Modal from '../../../components/ui/Modal';
import { SmartForm, SmartInput, SmartSelect } from '../../../components/SmartForm';

const NewStationModal = ({ open, onClose, onStationAdded }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    if (open) {
      api.get('/vehicle-types')
        .then(res => setVehicleTypes(res.data))
        .catch(err => console.error("Errore caricamento tipologie veicoli:", err));
    }
  }, [open]);

  const handleSubmit = async (values) => {
    // status_id = 1 di default per le stazioni appena create
    const payload = { ...values, status_id: 1 }; 
    const response = await api.post('/stations', payload);
    onStationAdded(response.data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Aggiungi Stazione">
      <SmartForm 
        initialValues={{ name: '', position: '', capacity: 10, vehicle_type_id: '' }}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Salva Stazione"
      >
        <SmartInput name="name" label="Nome Stazione" placeholder="es. Stazione Nord" required />
        <SmartInput name="position" label="Indirizzo / Posizione" placeholder="es. Via Roma, 5" required />

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
