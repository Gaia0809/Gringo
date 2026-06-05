import { useState, useEffect } from 'react';
import api from '../../api.js';
import VehicleModal from './components/VehicleModal.jsx';
import Card from '../../components/common/Card.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import Button from '../../components/common/Button.jsx';
import SearchInput from '../../components/common/SearchInput.jsx';

// Componente interno per l'anello multi-segmento
function StatusRing({ data, label }) {
  const total = data.total || 0;
  const dashArray = 314; // 2 * PI * r (r=50)
  
  const segments = [
    { value: data.disponibile, color: 'var(--color-stato-disponibile)' },
    { value: data.attivo, color: 'var(--color-stato-attivo)' },
    { value: data.inricarica, color: 'var(--color-stato-inricarica)' },
    { value: data.manutenzione, color: 'var(--color-stato-manutenzione)' },
    { value: data.offline, color: 'var(--color-stato-offline)' },
    { value: data.guasto, color: 'var(--color-stato-guasto)' },
    { value: data.rubato, color: 'var(--color-stato-rubato)' },
  ];

  let currentRotation = 0;

  return (
    <div className="flex flex-col items-center relative">
      <svg className="w-32 h-32 transform -rotate-90 overflow-visible">
        <circle cx="64" cy="64" r="50" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
        {total > 0 && segments.map((s, i) => {
          if (s.value === 0) return null;
          const percentage = s.value / total;
          const strokeLength = dashArray * percentage;
          const rotation = currentRotation;
          currentRotation += percentage * 360;
          
          return (
            <circle 
              key={i}
              cx="64" cy="64" r="50" 
              stroke={s.color} 
              strokeWidth="12" 
              fill="transparent" 
              strokeDasharray={`${strokeLength} ${dashArray}`} 
              style={{ 
                transform: `rotate(${rotation}deg)`, 
                transformOrigin: '64px 64px',
                transition: 'all 1s ease-in-out'
              }}
            />
          );
        })}
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-xl font-bold block">{total}</span>
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{label}</span>
      </div>
    </div>
  );
}

export default function GestioneVeicoli() {
  const [veicoli, setVeicoli] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'

  const fetchVehicles = () => {
    setLoading(true);
    api.get('/vehicles')
      .then(res => {
        setVeicoli(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore caricamento veicoli:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo veicolo?")) return;
    try {
      await api.delete(`/vehicles/${id}`);
      setVeicoli(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      console.error("Errore eliminazione:", err);
      alert("Errore durante l'eliminazione.");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (modalMode === 'edit' && selectedVehicle) {
        await api.put(`/vehicles/${selectedVehicle.id}`, formData);
      } else {
        await api.post('/vehicles', formData);
      }
      setIsModalOpen(false);
      fetchVehicles();
    } catch (err) {
      console.error("Errore salvataggio:", err);
      alert("Errore durante il salvataggio.");
    }
  };

  const openCreate = () => {
    setModalMode('create');
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };

  const openEdit = (vehicle) => {
    setModalMode('edit');
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const openView = (vehicle) => {
    setModalMode('view');
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const filteredVeicoli = veicoli.filter(v => 
    v.license_plate?.toLowerCase().includes(search.toLowerCase()) ||
    v.vehicle_model?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Calcolo KPI dinamici per 7 stati
  const stats = {
    auto: { total: 0, disponibile: 0, attivo: 0, inricarica: 0, manutenzione: 0, offline: 0, guasto: 0, rubato: 0 },
    bici: { total: 0, disponibile: 0, attivo: 0, inricarica: 0, manutenzione: 0, offline: 0, guasto: 0, rubato: 0 },
    monopattini: { total: 0, disponibile: 0, attivo: 0, inricarica: 0, manutenzione: 0, offline: 0, guasto: 0, rubato: 0 }
  };

  veicoli.forEach(v => {
    const typeName = v.vehicle_model?.vehicle_type?.name || '';
    let category = '';
    if (typeName.includes('Macchina')) category = 'auto';
    else if (typeName.includes('Bicicletta')) category = 'bici';
    else if (typeName.includes('Monopattino')) category = 'monopattini';

    if (category) {
      stats[category].total++;
      const statusName = v.status?.name?.toLowerCase() || '';
      
      if (v.in_movement) stats[category].attivo++;
      else if (statusName.includes('disponibile')) stats[category].disponibile++;
      else if (statusName.includes('carica')) stats[category].inricarica++;
      else if (statusName.includes('manutenzione')) stats[category].manutenzione++;
      else if (statusName.includes('guasto')) stats[category].guasto++;
      else if (statusName.includes('rubato')) stats[category].rubato++;
      else if (statusName.includes('offline') || statusName.includes('inattivo') || statusName.includes('fuori area')) stats[category].offline++;
    }
  });

  return (
    <div className="flex flex-col gap-6 text-brand-testo flex-1">
      
      {/* KPI & Grafici Superiori */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Pannello Anelli Circolari */}
        <Card className="flex flex-col md:flex-row justify-around items-center gap-6">
          
          {/* Legenda Stati */}
          <div className="flex flex-col gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider self-start md:self-center">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-disponibile"></span> Disponibili</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-attivo"></span> Attivi</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-inricarica"></span> In ricarica</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-manutenzione"></span> Manutenzione</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-offline"></span> Offline</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-guasto"></span> Guasto</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-stato-rubato"></span> Rubato</div>
          </div>

          <StatusRing data={stats.auto} label="Automobili" />
          <StatusRing data={stats.bici} label="Biciclette" />
          <StatusRing data={stats.monopattini} label="Monopattini" />

        </Card>

        {/* Pannello Istogramma Settimanale (Dati fittizi per ora) */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-brand-testo">Utilizzo Mezzi</h3>
            <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-auto"></span> Auto</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-moto"></span> Moto</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-bici"></span> Bici</div>
            </div>
          </div>
          
          <div className="flex justify-between items-end h-32 pt-2 border-b border-gray-100">
            {['LU', 'MA', 'ME', 'GI', 'VE', 'SA', 'DO'].map((giorno, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 flex-1">
                <div className="flex items-end gap-1 h-24">
                  <div className="w-2 bg-mezzo-auto rounded-t-sm shadow-sm" style={{ height: `${[70, 45, 90, 65, 55, 20, 60][idx]}%` }}></div>
                  <div className="w-2 bg-mezzo-moto rounded-t-sm shadow-sm" style={{ height: `${[40, 65, 50, 30, 60, 10, 60][idx]}%` }}></div>
                  <div className="w-2 bg-mezzo-bici rounded-t-sm shadow-sm" style={{ height: `${[55, 50, 75, 20, 65, 25, 60][idx]}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-gray-400">{giorno}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* Toolbar Ricerca e Inserimento */}
      <div className="flex justify-between items-center">
        <SearchInput 
          placeholder="Cerca per targa, ID o modello..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
        <Button onClick={openCreate}>
          + Aggiungi Veicolo
        </Button>
      </div>

      {/* Tabella Dati */}
      <Card noPadding className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] bg-brand-sfondowidget/50">
              <th className="p-5">Targa / ID</th>
              <th className="p-5">Modello</th>
              <th className="p-5">Batteria</th>
              <th className="p-5">Km totali</th>
              <th className="p-5">Posizione</th>
              <th className="p-5">Stato</th>
              <th className="p-5 text-center">Azioni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="7" className="p-10 text-center text-gray-400 font-bold">Caricamento in corso...</td></tr>
            ) : filteredVeicoli.length === 0 ? (
              <tr><td colSpan="7" className="p-10 text-center text-gray-400 font-bold">Nessun veicolo trovato</td></tr>
            ) : (
              filteredVeicoli.map((veicolo) => (
                <tr key={veicolo.id} className="hover:bg-brand-sfondowidget/30 transition-colors group">
                  <td className="p-5 font-bold text-brand-testo">{veicolo.license_plate || `ID: ${veicolo.id}`}</td>
                  <td className="p-5 text-sm font-semibold text-gray-600">{veicolo.vehicle_model?.name || '—'}</td>
                  <td className="p-5 w-60">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-brand-sfondowidget h-2 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${veicolo.battery_percentage > 50 ? 'bg-stato-attivo' : veicolo.battery_percentage > 20 ? 'bg-stato-inricarica' : 'bg-stato-guasto'}`}
                          style={{ width: `${veicolo.battery_percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-500 min-w-[35px]">{veicolo.battery_percentage}%</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm font-semibold text-gray-600">{veicolo.km_total} km</td>
                  <td className="p-5 text-sm font-semibold text-gray-600">{veicolo.station?.name || veicolo.position || 'In movimento'}</td>
                  <td className="p-5">
                    <StatusBadge status={veicolo.status?.name} variant="soft" />
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center items-center gap-4 text-gray-300">
                      <button onClick={() => openView(veicolo)} className="hover:text-brand-testo transition-colors cursor-pointer text-lg" title="Visualizza">👁</button>
                      <button onClick={() => openEdit(veicolo)} className="hover:text-stato-inricarica transition-colors cursor-pointer text-lg" title="Modifica">✏️</button>
                      <button onClick={() => handleDelete(veicolo.id)} className="hover:text-stato-guasto transition-colors cursor-pointer text-lg" title="Elimina">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <VehicleModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        vehicle={selectedVehicle}
        mode={modalMode}
      />

    </div>
  );
}

