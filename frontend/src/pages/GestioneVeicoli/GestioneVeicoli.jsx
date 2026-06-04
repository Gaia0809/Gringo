import { useState, useEffect } from 'react';
import api from '../../api.js';

export default function GestioneVeicoli() {
  const [veicoli, setVeicoli] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/vehicles')
      .then(res => {
        setVeicoli(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore caricamento veicoli:", err);
        setLoading(false);
      });
  }, []);

  const filteredVeicoli = veicoli.filter(v => 
    v.license_plate?.toLowerCase().includes(search.toLowerCase()) ||
    v.vehicle_model?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (statusName) => {
    const s = statusName?.toLowerCase() || '';
    if (s.includes('disponibile')) return 'bg-stato-disponibile/20 text-brand-testo border-stato-disponibile';
    if (s.includes('attivo') || s.includes('in uso')) return 'bg-stato-attivo/20 text-brand-testo border-stato-attivo';
    if (s.includes('manutenzione')) return 'bg-stato-manutenzione/20 text-brand-testo border-stato-manutenzione';
    if (s.includes('carica')) return 'bg-stato-inricarica/20 text-brand-testo border-stato-inricarica';
    if (s.includes('guasto')) return 'bg-stato-guasto/20 text-brand-testo border-stato-guasto';
    if (s.includes('rubato')) return 'bg-stato-rubato/20 text-brand-testo border-stato-rubato';
    if (s.includes('offline') || s.includes('inattivo')) return 'bg-stato-offline/20 text-brand-testo border-stato-offline';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  // Calcolo KPI dinamici
  const stats = {
    auto: { total: 0, available: 0, active: 0, charging: 0, maintenance: 0, broken: 0 },
    bici: { total: 0, available: 0, active: 0, charging: 0, maintenance: 0, broken: 0 },
    monopattini: { total: 0, available: 0, active: 0, charging: 0, maintenance: 0, broken: 0 }
  };

  veicoli.forEach(v => {
    const typeName = v.vehicle_model?.vehicle_type?.name || '';
    let category = '';
    if (typeName.includes('Macchina')) category = 'auto';
    else if (typeName.includes('Bicicletta')) category = 'bici';
    else if (typeName.includes('Monopattino')) category = 'monopattini';

    if (category) {
      stats[category].total++;
      const status = v.status?.name?.toLowerCase() || '';
      if (v.in_movement) stats[category].active++;
      else if (status.includes('disponibile')) stats[category].available++;
      else if (status.includes('carica')) stats[category].charging++;
      else if (status.includes('manutenzione')) stats[category].maintenance++;
      else if (status.includes('guasto')) stats[category].broken++;
    }
  });

  const getRingData = (categoryData) => {
    const total = categoryData.total || 1; // Evita divisione per zero
    const dashArray = 314;
    
    // Percentuali
    const pAvailable = (categoryData.available / total) * 100;
    const pActive = (categoryData.active / total) * 100;

    // Offsets per cerchi sovrapposti (molto semplificato)
    const offAvailable = dashArray - (dashArray * pAvailable) / 100;
    const offActive = dashArray - (dashArray * (pAvailable + pActive)) / 100;

    return { pAvailable, pActive, offAvailable, offActive, total: categoryData.total };
  };

  const ringAuto = getRingData(stats.auto);
  const ringBici = getRingData(stats.bici);
  const ringMono = getRingData(stats.monopattini);

  return (
    <div className="flex flex-col gap-6 text-brand-testo flex-1">
      
      {/* KPI & Grafici Superiori */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Pannello Anelli Circolari */}
        <div className="card flex flex-col md:flex-row justify-around items-center gap-6">
          
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

          {/* Anello 1 - Automobili */}
          <div className="flex flex-col items-center relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
              <circle cx="64" cy="64" r="50" stroke="var(--color-stato-disponibile)" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset={ringAuto.offAvailable} strokeLinecap="round" className="transition-all duration-1000" />
              <circle cx="64" cy="64" r="50" stroke="var(--color-stato-attivo)" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset={ringAuto.offActive} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-xl font-bold block">{ringAuto.total}</span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Automobili</span>
            </div>
          </div>

          {/* Anello 2 - Biciclette */}
          <div className="flex flex-col items-center relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
              <circle cx="64" cy="64" r="50" stroke="var(--color-stato-disponibile)" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset={ringBici.offAvailable} strokeLinecap="round" className="transition-all duration-1000" />
              <circle cx="64" cy="64" r="50" stroke="var(--color-stato-attivo)" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset={ringBici.offActive} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-xl font-bold block">{ringBici.total}</span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Biciclette</span>
            </div>
          </div>

          {/* Anello 3 - Monopattini */}
          <div className="flex flex-col items-center relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#f3f4f6" strokeWidth="12" fill="transparent" />
              <circle cx="64" cy="64" r="50" stroke="var(--color-stato-disponibile)" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset={ringMono.offAvailable} strokeLinecap="round" className="transition-all duration-1000" />
              <circle cx="64" cy="64" r="50" stroke="var(--color-stato-attivo)" strokeWidth="12" fill="transparent" strokeDasharray="314" strokeDashoffset={ringMono.offActive} strokeLinecap="round" className="transition-all duration-1000" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-xl font-bold block">{ringMono.total}</span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Monopattini</span>
            </div>
          </div>

        </div>

        {/* Pannello Istogramma Settimanale */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-brand-testo">Utilizzo Mezzi</h3>
            <div className="flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-auto"></span> Auto</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-moto"></span> Moto</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-bici"></span> Bici</div>
            </div>
          </div>
          
          {/* Box Barre */}
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
        </div>

      </div>

      {/* Toolbar Ricerca e Inserimento */}
      <div className="flex justify-between items-center">
        <div className="flex items-center bg-brand-sfondo px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm w-80">
          <span className="text-gray-400 mr-2">🔍</span>
          <input 
            type="text" 
            placeholder="Cerca per targa, ID o modello..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none outline-none text-sm w-full bg-transparent text-brand-testo font-medium placeholder:text-gray-400"
          />
        </div>
        <button className="bg-brand-testo text-brand-sfondo px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer">
          + Aggiungi Veicolo
        </button>
      </div>

      {/* Tabella Dati */}
      <div className="card !p-0 overflow-hidden">
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
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(veicolo.status?.name)}`}>
                      {veicolo.status?.name || 'Sconosciuto'}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center items-center gap-4 text-gray-300">
                      <button className="hover:text-brand-testo transition-colors cursor-pointer text-lg" title="Visualizza">👁</button>
                      <button className="hover:text-stato-inricarica transition-colors cursor-pointer text-lg" title="Modifica">✏️</button>
                      <button className="hover:text-stato-guasto transition-colors cursor-pointer text-lg" title="Elimina">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}