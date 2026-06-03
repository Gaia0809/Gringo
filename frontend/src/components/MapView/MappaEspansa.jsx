import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MappaEspansa.css';

const initialMarkers = [
  { id: 1, name: 'Stazione - SD-12', type: 'stazione', latitude: 45.9566, longitude: 12.6606, info: 'Batteria: 8%' },
  { id: 2, name: 'Stazione - CF-11', type: 'stazione', latitude: 45.9540, longitude: 12.6700, info: 'Batteria: 12%' },
];

export default function MappaEspansa({ onClose }) {
  const [subTab, setSubTab] = useState('Ecosistema');
  const [viewState, setViewState] = useState({
    longitude: 12.6606,
    latitude: 45.9566,
    zoom: 14
  });

  return (
    <div className="fullscreen-map-container">
      <div className="fullscreen-map-bg">
        
        {/* FILTRI DI RICERCA FLUTTUANTI IN ALTO A SINISTRA (Anche a schermo intero!) */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 50,
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', padding: '8px 16px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <span style={{ marginRight: '8px', color: '#9ca3af' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Cerca ID, Targa, Stazione" 
              style={{ border: 'none', outline: 'none', fontSize: '14px', fontFamily: "'Outfit', sans-serif", width: '180px' }} 
            />
          </div>
          <select style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '14px', fontFamily: "'Outfit', sans-serif", outline: 'none', cursor: 'pointer' }}>
            <option>Ecosistema</option>
          </select>
          <select style={{ padding: '8px 16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '14px', fontFamily: "'Outfit', sans-serif", outline: 'none', cursor: 'pointer' }}>
            <option>Stato</option>
          </select>
        </div>

        {/* Componente Maplibre Espanso */}
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapLib={import('maplibre-gl')}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          {initialMarkers.map((marker) => (
            <Marker key={marker.id} latitude={marker.latitude} longitude={marker.longitude}>
              <div style={{
                width: '14px', height: '14px', 
                backgroundColor: marker.type === 'stazione' ? '#dc2626' : '#2563eb',
                borderRadius: '50%', border: '2px solid #fff'
              }} />
            </Marker>
          ))}
        </Map>

        {/* Legenda Flottante Spostata in basso a sinistra per non sovrapporsi ai filtri */}
        <div className="floating-legend" style={{ zIndex: 10, top: 'auto', bottom: '20px', left: '20px' }}>
          <h4>Legenda</h4>
          <ul>
            <li><span style={{ color: '#22c55e' }}>●</span> Attivi</li>
            <li><span style={{ color: '#dc2626' }}>●</span> Offline</li>
            <li><span style={{ color: '#2563eb' }}>●</span> Disponibili</li>
            <li><span style={{ color: '#eab308' }}>●</span> Guasti</li>
            <li><span style={{ color: '#b96ecf' }}>●</span> Manutenzione</li>
          </ul>
        </div>

        <button className="minimize-btn" onClick={onClose} style={{ zIndex: 10 }}>🗗</button>
      </div>

      {/* SIDEBAR DI DESTRA VETRATA ORIGINALE */}
      <div className="map-sidebar">
        <div className="sub-nav">
          <button className={subTab === 'Ecosistema' ? 'active' : ''} onClick={() => setSubTab('Ecosistema')}>Vista Ecosistema</button>
          <button className={subTab === 'Tecnico' ? 'active' : ''} onClick={() => setSubTab('Tecnico')}>Supporto Tecnico</button>
          <button className={subTab === 'Interventi' ? 'active' : ''} onClick={() => setSubTab('Interventi')}>Interventi</button>
        </div>

        <input type="text" placeholder="Cerca per targa o id..." className="sidebar-search" />

        <div className="sidebar-dynamic-content">
          
          {subTab === 'Ecosistema' && (
            <div>
              <p style={{ fontSize: '14px', color: '#666' }}>Mappa interattiva sincronizzata con coordinate GPS reali.</p>
            </div>
          )}

          {subTab === 'Tecnico' && (
            <div className="form-container">
              <h4>Segnala Guasto</h4>
              <input type="text" placeholder="ID Mezzo | Targa" className="form-input" />
              <select className="form-input">
                <option>Meccanico</option>
                <option>Elettrico</option>
                <option>Software</option>
              </select>
              <button className="submit-btn">Aggiungi segnalazione</button>

              <h4 style={{ marginTop: '20px' }}>Interventi Aperti</h4>
              <div className="mini-ticket-list">
                <div className="mini-ticket">
                  <div><strong>Guasto freno anteriori</strong><br/><small>BICI-14 | 09:15</small></div>
                  <span className="status-badge red">Aperto</span>
                </div>
              </div>
            </div>
          )}

          {subTab === 'Interventi' && (
            <div>
              <button className="new-ticket-btn">+ Nuovo Ticket</button>
              <h5 className="section-title">⚠️ GUASTI IN CORSO</h5>
              <div className="large-ticket-card">
                <div className="ticket-header"><span>ID:#TK-9021</span><span>Oggi, 14:20</span></div>
                <div className="ticket-body">
                  <strong>Auto Elettrica - AA123BB</strong>
                  <p>Blocco motore rilevato in Via Roma.</p>
                </div>
                <button className="action-btn green">Aggiungi segnalazione</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}