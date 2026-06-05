import { useState, useMemo } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import SearchInput from '../../../components/common/SearchInput.jsx';

export default function MapView({ onExpand, stations = [], vehicles = [] }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Ecosistema');
  const [statusFilter, setStatusFilter] = useState('Stato');

  const [viewState, setViewState] = useState({
    longitude: 12.6606,
    latitude: 45.9566,
    zoom: 13
  });

  const markers = useMemo(() => {
    let sMarkers = stations.map(s => ({
      id: `s-${s.id}`,
      name: s.name,
      type: 'stazione',
      latitude: s.coordinates?.[0],
      longitude: s.coordinates?.[1],
      vehicleTypeName: s.vehicle_type?.name,
      statusName: s.status?.name,
      info: `Capacità: ${s.capacity} | Veicoli: ${s.vehicles_count}`
    }));

    let vMarkers = vehicles.map(v => {
      // Add a tiny jitter if the vehicle is not in movement (so it's at a station)
      // to avoid perfect overlapping of markers
      const jitterLat = v.in_movement ? 0 : (Math.random() - 0.5) * 0.0004;
      const jitterLng = v.in_movement ? 0 : (Math.random() - 0.5) * 0.0004;

      return {
        id: `v-${v.id}`,
        name: `${v.vehicle_model?.name || 'Veicolo'} - ${v.license_plate || v.id}`,
        type: 'veicolo',
        latitude: (v.coordinates?.[0] || 0) + jitterLat,
        longitude: (v.coordinates?.[1] || 0) + jitterLng,
        vehicleTypeName: v.vehicle_model?.vehicle_type?.name,
        statusName: v.status?.name,
        info: `Batteria: ${v.battery_percentage}% | Stato: ${v.status?.name || 'n.d.'}`
      };
    });

    let allMarkers = [...sMarkers, ...vMarkers].filter(m => m.latitude !== undefined && m.longitude !== undefined);

    // Apply Filters
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
      allMarkers = allMarkers.filter(m => m.vehicleTypeName === typeMap[typeFilter]);
    }

    if (statusFilter !== 'Stato') {
      allMarkers = allMarkers.filter(m => m.statusName === statusFilter);
    }

    return allMarkers;
  }, [stations, vehicles, searchQuery, typeFilter, statusFilter]);

  const getMarkerColor = (marker) => {
    if (marker.type === 'stazione') {
      return marker.statusName === 'Disponibile' ? 'bg-stato-attivo' : 'bg-gray-400';
    }
    
    switch (marker.statusName) {
      case 'Disponibile': return 'bg-stato-disponibile';
      case 'Guasto': return 'bg-stato-guasto';
      case 'In Manutenzione': return 'bg-stato-manutenzione';
      case 'In Carica': return 'bg-stato-inricarica';
      default: return 'bg-gray-400';
    }
  };

  // KPIs
  const avgBattery = vehicles.length > 0 
    ? Math.round(vehicles.reduce((acc, v) => acc + (v.battery_percentage || 0), 0) / vehicles.length) 
    : 0;

  const inMovement = vehicles.filter(v => v.in_movement).length;

  return (
    <div className="flex flex-col gap-5 flex-1">
      
      {/* KPI Panel Superiori */}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
        <div className="card p-3 border-t-4 border-t-stato-guasto overflow-hidden">
          <div className="text-[10px] font-bold text-stato-guasto uppercase tracking-widest">Alert Veicoli Batteria &lt; 15%</div>
          <div className="flex text-xs mt-1.5 gap-5 font-semibold overflow-x-auto whitespace-nowrap pb-1">
            {vehicles.filter(v => v.battery_percentage < 15).length > 0 ? (
              vehicles.filter(v => v.battery_percentage < 15).map(v => (
                <span key={v.id}>{v.license_plate || v.id} <strong className="text-stato-guasto ml-1">{v.battery_percentage}%</strong></span>
              ))
            ) : (
              <span className="text-gray-400">Tutti i veicoli carichi</span>
            )}
          </div>
        </div>
        <div className="card p-3 text-center flex flex-col justify-center">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Batteria Media</div>
          <div className="text-2xl font-bold text-stato-attivo leading-none">{avgBattery}%</div>
        </div>
        <div className="card p-3 text-center flex flex-col justify-center">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">In Movimento</div>
          <div className="text-2xl font-bold text-brand-testo leading-none">{inMovement}/{vehicles.length}</div>
        </div>
      </div>

      {/* Box Mappa Reale */}
      <div className="card flex-1 relative overflow-hidden !p-0 min-h-[400px]">
        
        {/* FILTRI DI RICERCA FLUTTUANTI SOVRAPPOSTI */}
        <div className="absolute top-5 left-5 z-10 flex gap-3 items-center">
          <SearchInput 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cerca ID, Targa, Stazione" 
            className="w-56"
          />

          <select 
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <option>Ecosistema</option>
            <option>Macchine</option>
            <option>Biciclette</option>
            <option>Monopattini</option>
          </select>

          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <option>Stato</option>
            <option>Disponibile</option>
            <option>In Manutenzione</option>
            <option>Guasto</option>
            <option>In Carica</option>
          </select>
        </div>

        {/* Componente Maplibre */}
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapLib={maplibregl}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          {markers.map((marker) => (
            <Marker 
              key={marker.id} 
              latitude={marker.latitude} 
              longitude={marker.longitude}
            >
              <div
                onMouseEnter={() => setSelectedMarker(marker)}
                onMouseLeave={() => setSelectedMarker(null)}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform ${getMarkerColor(marker)}`}
              />
            </Marker>
          ))}
        </Map>

        {/* Bottone Espandi */}
        <button 
          onClick={onExpand}
          className="absolute bottom-4 right-4 bg-brand-sfondo border border-gray-200 rounded-lg w-9 h-9 flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 transition-colors z-10 text-brand-testo font-bold"
        >
          🗖
        </button>

        {/* Tooltip Hover */}
        {selectedMarker && (
          <div className="absolute bottom-16 right-4 bg-brand-testo/90 backdrop-blur-sm text-brand-sfondo p-3 rounded-xl text-[11px] z-20 shadow-xl border border-white/10 min-w-[150px]">
            <strong className="block text-xs mb-1 border-b border-white/10 pb-1">{selectedMarker.name}</strong>
            <div className="opacity-90">{selectedMarker.info}</div>
          </div>
        )}
      </div>
    </div>
  );
}