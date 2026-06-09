import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMapMarkers } from '../../../hooks/useMapMarkers';
import MapFilters from './MapFilters';

export default function MapView({ onExpand, stations = [], vehicles = [], statuses = [], vehicleTypes = [] }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Ecosistema');
  const [statusFilter, setStatusFilter] = useState('Stato');

  const [viewState, setViewState] = useState({
    longitude: 12.6606,
    latitude: 45.9566,
    zoom: 13
  });

  const markers = useMapMarkers(stations, vehicles, searchQuery, typeFilter, statusFilter);

  // KPIs
  const avgBattery = vehicles.length > 0 
    ? Math.round(vehicles.reduce((acc, v) => acc + (v.battery_percentage || 0), 0) / vehicles.length) 
    : 0;

  const inMovement = vehicles.filter(v => v.in_movement).length;

  return (
    <div className="flex flex-col gap-5 flex-1">
      
      {/* KPI Panel Superiori */}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
        {/* ... */}
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
        
        <MapFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            vehicleTypes={vehicleTypes}
            statuses={statuses}
        />

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
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform ${marker.colorClass}`}
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