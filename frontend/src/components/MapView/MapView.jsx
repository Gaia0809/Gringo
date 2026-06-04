import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const initialMarkers = [
  { id: 1, name: 'Stazione - SD-12', type: 'stazione', latitude: 45.9566, longitude: 12.6606, info: 'Batteria: 8% | Bici disponibili: 2' },
  { id: 2, name: 'Stazione - CF-11', type: 'stazione', latitude: 45.9540, longitude: 12.6700, info: 'Batteria: 12% | Bici disponibili: 1' },
  { id: 3, name: 'Bici in movimento #102', type: 'bici', latitude: 45.9502, longitude: 12.6550, info: 'Velocità: 15 km/h | Batteria: 76%' },
];

export default function MapView({ onExpand }) {
  const [markers] = useState(initialMarkers);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [viewState, setViewState] = useState({
    longitude: 12.6606,
    latitude: 45.9566,
    zoom: 13
  });

  return (
    <div className="flex flex-col gap-5 flex-1">
      
      {/* KPI Panel Superiori */}
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
        <div className="card p-3 border-t-4 border-t-stato-guasto">
          <div className="text-[10px] font-bold text-stato-guasto uppercase tracking-widest">Alert Batteria Stazioni &lt; 15%</div>
          <div className="flex text-xs mt-1.5 gap-5 font-semibold">
            <span>Stazione - SD-12 <strong className="text-stato-guasto ml-1">8%</strong></span>
            <span>Stazione - CF-11 <strong className="text-stato-guasto ml-1">12%</strong></span>
          </div>
        </div>
        <div className="card p-3 text-center flex flex-col justify-center">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Batteria Media</div>
          <div className="text-2xl font-bold text-stato-attivo leading-none">85%</div>
        </div>
        <div className="card p-3 text-center flex flex-col justify-center">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">In Movimento</div>
          <div className="text-2xl font-bold text-brand-testo leading-none">92/150</div>
        </div>
      </div>

      {/* Box Mappa Reale */}
      <div className="card flex-1 relative overflow-hidden !p-0 min-h-[400px]">
        
        {/* FILTRI DI RICERCA FLUTTUANTI SOVRAPPOSTI */}
        <div className="absolute top-5 left-5 z-10 flex gap-3 items-center">
          <div className="flex items-center bg-brand-sfondo px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <span className="mr-2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Cerca ID, Targa, Stazione" 
              className="border-none outline-none text-sm w-44 bg-transparent text-brand-testo font-semibold" 
            />
          </div>

          <select className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer hover:bg-gray-50 transition-colors">
            <option>Ecosistema</option>
            <option>Macchine</option>
            <option>Biciclette</option>
            <option>Monopattini</option>
          </select>

          <select className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-md border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer hover:bg-gray-50 transition-colors">
            <option>Stato</option>
            <option>Disponibile</option>
            <option>In uso</option>
            <option>Guasto</option>
            <option>Manutenzione</option>
            <option>Offline</option>
          </select>
        </div>

        {/* Componente Maplibre */}
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapLib={import('maplibre-gl')}
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
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform ${marker.type === 'stazione' ? 'bg-stato-guasto' : 'bg-accent-blue'}`}
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