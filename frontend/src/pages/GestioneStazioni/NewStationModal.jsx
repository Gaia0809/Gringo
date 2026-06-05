import  { useState, useEffect } from 'react';
import api from '../../api';

const NewStationModal = ({ open, onClose, onStationAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    capacity: 10,
    vehicle_type_id: ''
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      // Recupera le tipologie di veicoli reali dal backend
      api.get('/vehicle-types')
        .then(res => setVehicleTypes(res.data))
        .catch(err => console.error("Errore caricamento tipologie veicoli:", err));
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // status_id = 1 di default per le stazioni appena create (verifica nel tuo DB se corrisponde a "Disponibile")
      const payload = { ...formData, status_id: 1 }; 
      const response = await api.post('/stations', payload);
      
      onStationAdded(response.data);
      onClose();
      // Reset form
      setFormData({ name: '', position: '', capacity: 10, vehicle_type_id: '' });
    } catch (error) {
      console.error("Errore salvataggio stazione:", error);
      alert("Errore durante il salvataggio. Controlla la console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-brand-sfondo rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-brand-testo">Aggiungi Stazione</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-brand-testo transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Nome Stazione</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-testo bg-brand-sfondowidget text-brand-testo"
              placeholder="es. Stazione Nord"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Indirizzo / Posizione</label>
            <input 
              type="text" 
              name="position"
              required
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-testo bg-brand-sfondowidget text-brand-testo"
              placeholder="es. Via Roma, 5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Capienza Massima</label>
              <input 
                type="number" 
                name="capacity"
                min="1"
                required
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-testo bg-brand-sfondowidget text-brand-testo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Tipologia Mezzi</label>
              <select 
                name="vehicle_type_id"
                required
                value={formData.vehicle_type_id}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-brand-testo bg-brand-sfondowidget text-brand-testo appearance-none"
              >
                <option value="" disabled>Seleziona...</option>
                {vehicleTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Annulla
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-testo text-brand-sfondo shadow-md hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Salvataggio...' : 'Salva Stazione'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStationModal;