import { useState, useMemo } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MappaEspansa.css';
import NewTicketModal from '../../SupportoTecnico/components/NewTicketModal';
import api from '../../../api';

export default function MappaEspansa({ onClose, stations, vehicles, issues }) {
  const [subTab, setSubTab] = useState('Ecosistema');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Ecosistema');
  const [statusFilter, setStatusFilter] = useState('Stato');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [assignModal, setAssignModal] = useState({ open: false, issue: null });
  const [technicians, setTechnicians] = useState([]);
  const [assigningTechId, setAssigningTechId] = useState('');
  const [assigning, setAssigning] = useState(false);

  const [viewState, setViewState] = useState({
    longitude: 12.6606,
    latitude: 45.9566,
    zoom: 14
  });

  const markers = useMemo(() => {
    // 1. Process Stations
    let sMarkers = (stations || []).map(s => ({
      id: `s-${s.id}`,
      type: 'stazione',
      name: s.name,
      latitude: s.coordinates?.[0],
      longitude: s.coordinates?.[1],
      vehicleTypeName: s.vehicle_type?.name,
      statusName: s.status?.name,
      info: `Capacità: ${s.capacity} | Veicoli: ${s.vehicles_count}`,
      colorClass: s.status?.name === 'Disponibile' ? 'bg-stato-attivo' : 'bg-gray-400'
    }));

    // 2. Process Vehicles (Robust, data-driven mapping with stable jitter)
    let vMarkers = (vehicles || []).map(v => {
      const seed = parseInt(v.id) || 0;
      const jitterLat = v.in_movement ? 0 : ((seed % 1000) / 1000 - 0.5) * 0.0004;
      const jitterLng = v.in_movement ? 0 : (((seed * 7) % 1000) / 1000 - 0.5) * 0.0004;

      let displayStatus = v.status?.name || 'n.d.';
      let colorClass = 'bg-gray-400';

      if (v.in_movement) {
        displayStatus = 'In Movimento';
        colorClass = 'bg-stato-attivo';
      } else {
        switch (v.status?.name) {
          case 'Disponibile': colorClass = 'bg-accent-blue'; break;
          case 'Guasto': colorClass = 'bg-stato-guasto'; break;
          case 'In Manutenzione': colorClass = 'bg-stato-manutenzione'; break;
          case 'In Carica': colorClass = 'bg-stato-inricarica'; break;
        }
      }

      return {
        id: `v-${v.id}`,
        type: 'veicolo',
        name: `${v.vehicle_model?.name || 'Veicolo'} - ${v.license_plate || v.id}`,
        latitude: (v.coordinates?.[0] || 0) + jitterLat,
        longitude: (v.coordinates?.[1] || 0) + jitterLng,
        vehicleTypeName: v.vehicle_model?.vehicle_type?.name,
        statusName: v.status?.name,
        in_movement: v.in_movement,
        info: `Batteria: ${v.battery_percentage}% | Stato: ${displayStatus}`,
        colorClass: colorClass
      };
    });

    let allMarkers = [...sMarkers, ...vMarkers].filter(m => m.latitude !== undefined && m.longitude !== undefined);

    // 3. Robust Filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      allMarkers = allMarkers.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.id.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== 'Ecosistema') {
      const typeMap = {
        'Macchine': 'Macchina Elettrica',
        'Biciclette': 'Bicicletta Elettrica',
        'Monopattini': 'Monopattino Elettrico'
      };
      allMarkers = allMarkers.filter(m => m.type === 'stazione' || m.vehicleTypeName === typeMap[typeFilter]);
    }

    if (statusFilter !== 'Stato') {
      allMarkers = allMarkers.filter(m => m.type === 'stazione' || m.statusName === statusFilter);
    }

    return allMarkers;
  }, [stations, vehicles, searchQuery, typeFilter, statusFilter]);

  const getMarkerColor = (marker) => {
    return marker.colorClass;
  };

  const createTicket = async (ticketData) => {
    try {
      const payload = {
        title: ticketData.title,
        description: ticketData.note,
        category_id: 1,
        status_id: 1,
      };
      await api.post('/interventions', payload);
    } catch (err) {
      console.error('Errore creazione ticket:', err);
    }
  };

  const openAssignModal = async (issue) => {
    setAssigningTechId('');
    setAssignModal({ open: true, issue });
    if (technicians.length === 0) {
      try {
        const res = await api.get('/technicians');
        setTechnicians(res.data || []);
      } catch (err) {
        console.error('Errore caricamento tecnici:', err);
      }
    }
  };

  const confirmAssign = async () => {
    if (!assigningTechId || !assignModal.issue) return;
    setAssigning(true);
    try {
      await api.put(`/issues/${assignModal.issue.id}`, { assigned_to: assigningTechId });
      setAssignModal({ open: false, issue: null });
    } catch (err) {
      console.error('Errore assegnazione tecnico:', err);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 flex z-[9999] bg-brand-sfondoelementi">
      <div className="flex-1 relative bg-gray-200">
        <div className="absolute top-5 left-5 z-50 flex gap-3 items-center">
          <div className="flex items-center bg-brand-sfondo px-4 py-2 rounded-xl shadow-lg border border-gray-100">
            <span className="mr-2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cerca ID, Targa, Stazione"
              className="border-none outline-none text-sm w-44 bg-transparent text-brand-testo font-semibold"
            />
          </div>

          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-lg border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer"
          >
            <option>Ecosistema</option>
            <option>Macchine</option>
            <option>Biciclette</option>
            <option>Monopattini</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-lg border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer"
          >
            <option>Stato</option>
            <option>Disponibile</option>
            <option>In Manutenzione</option>
            <option>Guasto</option>
            <option>In Carica</option>
          </select>
        </div>

        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapLib={import('maplibre-gl')}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          {markers.map((marker) => (
            <Marker key={marker.id} latitude={marker.latitude} longitude={marker.longitude}>
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform ${getMarkerColor(marker)}`} title={marker.name} />
            </Marker>
          ))}
        </Map>

        <div className="absolute bottom-5 left-5 bg-brand-sfondo/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 w-44 z-10">
          <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest mb-3">Legenda</h4>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-stato-attivo"></span> Attivi</li>
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span> Offline</li>
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-accent-blue"></span> Disponibili</li>
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-stato-guasto"></span> Guasti</li>
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-mezzo-moto"></span> Manutenzione</li>
          </ul>
        </div>

        <button
          className="absolute bottom-5 right-5 w-10 h-10 bg-brand-sfondo border border-gray-200 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-50 transition-colors z-10 text-brand-testo font-bold"
          onClick={onClose}
        >
          🗗
        </button>
      </div>

      <div className="w-96 bg-brand-sfondo/80 backdrop-blur-xl border-l border-white/20 p-6 flex flex-col gap-5 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
        <div className="flex bg-brand-sfondowidget p-1 rounded-full gap-1">
          <button
            className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${subTab === 'Ecosistema' ? 'bg-brand-sfondo text-brand-testo shadow-sm' : 'text-gray-500'}`}
            onClick={() => setSubTab('Ecosistema')}
          >
            Ecosistema
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${subTab === 'Tecnico' ? 'bg-brand-sfondo text-brand-testo shadow-sm' : 'text-gray-500'}`}
            onClick={() => setSubTab('Tecnico')}
          >
            Tecnico
          </button>
          <button
            className={`flex-1 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${subTab === 'Interventi' ? 'bg-brand-sfondo text-brand-testo shadow-sm' : 'text-gray-500'}`}
            onClick={() => setSubTab('Interventi')}
          >
            Interventi
          </button>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cerca per targa o id..."
            className="w-full pl-9 pr-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo transition-colors"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          {subTab === 'Ecosistema' && (
            <div className="flex flex-col gap-4">
              <div className="card !bg-brand-sfondowidget/50 border-none">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">Mappa interattiva sincronizzata con coordinate GPS reali e stato degli asset in tempo reale.</p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest mb-1">Stazioni</h4>
                {stations.slice(0, 10).map(s => (
                  <div key={s.id} className="bg-brand-sfondo/50 p-3 rounded-xl flex justify-between items-center border border-white/20">
                    <span className="text-sm font-semibold">{s.name}</span>
                    <span className="text-xs text-gray-500">{s.vehicles_count}/{s.capacity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subTab === 'Tecnico' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest">Segnala Guasto</h4>
                <input type="text" placeholder="ID Mezzo | Targa" className="w-full px-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo" />
                <select className="w-full px-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo cursor-pointer">
                  <option>Meccanico</option>
                  <option>Elettrico</option>
                  <option>Software</option>
                </select>
                <button className="w-full py-3 bg-brand-testo text-brand-sfondo rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all cursor-pointer">Aggiungi segnalazione</button>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest">Interventi Aperti</h4>
                <div className="flex flex-col gap-2">
                  {issues.filter(i => !i.interventions || i.interventions.length === 0).slice(0, 5).map(i => (
                    <div key={i.id} className="bg-brand-sfondo border border-gray-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
                      <div>
                        <strong className="text-sm text-brand-testo block">{i.title}</strong>
                        <small className="text-[10px] text-gray-400 font-bold">{i.booking?.vehicle?.license_plate || `ID:${i.id}`}</small>
                      </div>
                      <span className="px-2 py-1 rounded-lg text-[9px] font-bold uppercase bg-stato-guasto/10 text-stato-guasto border border-stato-guasto/20">Aperto</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {subTab === 'Interventi' && (
            <div className="flex flex-col gap-5">
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="w-full py-2.5 bg-brand-sfondo border-2 border-dashed border-gray-200 text-gray-400 rounded-xl font-bold text-xs hover:border-brand-testo hover:text-brand-testo transition-all cursor-pointer"
              >
                + Nuovo Ticket
              </button>

              <div className="flex flex-col gap-3">
                <h5 className="text-[10px] font-bold text-stato-guasto uppercase tracking-[0.2em]">⚠️ Guasti in corso</h5>
                {issues.slice(0, 5).map(i => (
                  <div key={i.id} className="card border-l-4 border-l-stato-guasto !p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-gray-400">ID:#TK-{i.id}</span>
                    </div>
                    <div className="mb-4">
                      <strong className="text-sm text-brand-testo block">{i.title}</strong>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{i.description || 'Segnalazione in attesa di diagnosi.'}</p>
                    </div>
                    <button
                      onClick={() => openAssignModal(i)}
                      className="w-full py-2 bg-stato-attivo text-brand-testo rounded-lg font-bold text-[11px] shadow-sm hover:opacity-90 transition-all cursor-pointer"
                    >
                      Assegna tecnico
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <NewTicketModal
        open={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSave={createTicket}
      />

      {assignModal.open && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-brand-testo/40 backdrop-blur-sm p-4">
          <div className="bg-brand-sfondo rounded-3xl w-full max-w-sm shadow-2xl border border-gray-100 p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-brand-testo">Assegna Tecnico</h2>
              <button
                onClick={() => setAssignModal({ open: false, issue: null })}
                className="p-1.5 rounded-full hover:bg-brand-sfondowidget transition-colors text-gray-400 hover:text-brand-testo cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Ticket: <span className="font-semibold text-brand-testo">{assignModal.issue?.title}</span>
            </p>
            <select
              value={assigningTechId}
              onChange={e => setAssigningTechId(e.target.value)}
              className="p-2.5 border border-gray-200 rounded-xl outline-none focus:border-gray-400 transition-colors text-sm bg-brand-sfondo text-brand-testo"
            >
              <option value="">Seleziona tecnico...</option>
              {technicians.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAssignModal({ open: false, issue: null })}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-sfondowidget text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={confirmAssign}
                disabled={!assigningTechId || assigning}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-testo text-brand-sfondo hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {assigning ? 'Salvataggio...' : 'Conferma'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
