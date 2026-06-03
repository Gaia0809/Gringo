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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, fontFamily: "'Outfit', sans-serif" }}>
      
      {/* KPI Panel Superiori */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '15px' }}>
        <div className="card" style={{ padding: '12px', borderTop: '3px solid #dc2626', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#dc2626' }}>ALERT BATTERIA STAZIONI &lt; 15%</div>
          <div style={{ display: 'flex', fontSize: '13px', marginTop: '5px', gap: '20px' }}>
            <span>Stazione - SD-12 <strong style={{ color: '#dc2626' }}>8%</strong></span>
            <span>Stazione - CF-11 <strong style={{ color: '#dc2626' }}>12%</strong></span>
          </div>
        </div>
        <div className="card" style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#666' }}>Batteria Media</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>85%</div>
        </div>
        <div className="card" style={{ padding: '12px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '11px', color: '#666' }}>In Movimento</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>92/150</div>
        </div>
      </div>

      {/* Box Mappa Reale */}
      <div className="card" style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: 0, minHeight: '400px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {/* FILTRI DI RICERCA FLUTTUANTI SOVRAPPOSTI */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', padding: '8px 16px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
            <span style={{ marginRight: '8px', color: '#9ca3af' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Cerca ID, Targa, Stazione" 
              style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Outfit', sans-serif", width: '180px' }} 
            />
          </div>

          <select style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '14px', fontFamily: "'Outfit', sans-serif", outline: 'none', cursor: 'pointer' }}>
            <option>Ecosistema</option>
            <option>Macchine</option>
            <option>Biciclette</option>
            <option>Monopattini</option>
          </select>

          <select style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '14px', fontFamily: "'Outfit', sans-serif", outline: 'none', cursor: 'pointer' }}>
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
                style={{
                  width: '14px',
                  height: '14px',
                  backgroundColor: marker.type === 'stazione' ? '#dc2626' : '#2563eb',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              />
            </Marker>
          ))}
        </Map>

        {/* Bottone Espandi */}
        <button 
          onClick={onExpand}
          style={{
            position: 'absolute', bottom: '15px', right: '15px',
            background: '#fff', border: '1px solid #ccc', borderRadius: '6px',
            width: '32px', height: '32px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}
        >
          🗖
        </button>

        {/* Tooltip Hover */}
        {selectedMarker && (
          <div style={{
            position: 'absolute', bottom: '60px', right: '15px',
            backgroundColor: 'rgba(0,0,0,0.8)', color: '#fff', padding: '8px',
            borderRadius: '6px', fontSize: '11px', zIndex: 20
          }}>
            <strong>{selectedMarker.name}</strong>
            <div>{selectedMarker.info}</div>
          </div>
        )}
      </div>
    </div>
  );
}