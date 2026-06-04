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
    <div className="fixed inset-0 flex z-[9999] bg-brand-sfondoelementi">
      
      {/* MAPPA PRINCIPALE */}
      <div className="flex-1 relative bg-gray-200">
        
        {/* FILTRI DI RICERCA FLUTTUANTI IN ALTO A SINISTRA */}
        <div className="absolute top-5 left-5 z-50 flex gap-3 items-center">
          <div className="flex items-center bg-brand-sfondo px-4 py-2 rounded-xl shadow-lg border border-gray-100">
            <span className="mr-2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Cerca ID, Targa, Stazione" 
              className="border-none outline-none text-sm w-44 bg-transparent text-brand-testo font-semibold" 
            />
          </div>

          <select className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-lg border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer">
            <option>Ecosistema</option>
            <option>Macchine</option>
            <option>Biciclette</option>
            <option>Monopattini</option>
          </select>

          <select className="px-4 py-2 bg-brand-sfondo rounded-xl shadow-lg border border-gray-100 text-sm font-semibold text-brand-testo outline-none cursor-pointer">
            <option>Stato</option>
            <option>Disponibile</option>
            <option>In uso</option>
            <option>Guasto</option>
            <option>Manutenzione</option>
            <option>Offline</option>
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
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${marker.type === 'stazione' ? 'bg-stato-guasto' : 'bg-accent-blue'}`} />
            </Marker>
          ))}
        </Map>

        {/* Legenda Flottante */}
        <div className="absolute bottom-5 left-5 bg-brand-sfondo/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 w-44 z-10">
          <h4 className="text-xs font-bold text-brand-testo uppercase tracking-widest mb-3">Legenda</h4>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-stato-attivo"></span> Attivi</li>
            <li className="flex items-center gap-2 text-[11px] font-semibold text-gray-600"><span className="w-2.5 h-2.5 rounded-full bg-stato-offline"></span> Offline</li>
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

      {/* SIDEBAR DI DESTRA VETRATA */}
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
          <input type="text" placeholder="Cerca per targa o id..." className="w-full pl-9 pr-4 py-2.5 bg-brand-sfondo border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-testo transition-colors" />
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          
          {subTab === 'Ecosistema' && (
            <div className="flex flex-col gap-4">
              <div className="card !bg-brand-sfondowidget/50 border-none">
                <p className="text-sm text-gray-600 leading-relaxed font-medium">Mappa interattiva sincronizzata con coordinate GPS reali e stato degli asset in tempo reale.</p>
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
                  <div className="bg-brand-sfondo border border-gray-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
                    <div>
                      <strong className="text-sm text-brand-testo block">Guasto freno anteriori</strong>
                      <small className="text-[10px] text-gray-400 font-bold">BICI-14 | 09:15</small>
                    </div>
                    <span className="px-2 py-1 rounded-lg text-[9px] font-bold uppercase bg-stato-guasto/10 text-stato-guasto border border-stato-guasto/20">Aperto</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subTab === 'Interventi' && (
            <div className="flex flex-col gap-5">
              <button className="w-full py-2.5 bg-brand-sfondo border-2 border-dashed border-gray-200 text-gray-400 rounded-xl font-bold text-xs hover:border-brand-testo hover:text-brand-testo transition-all cursor-pointer">+ Nuovo Ticket</button>
              
              <div className="flex flex-col gap-3">
                <h5 className="text-[10px] font-bold text-stato-guasto uppercase tracking-[0.2em]">⚠️ Guasti in corso</h5>
                <div className="card border-l-4 border-l-stato-guasto !p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-gray-400">ID:#TK-9021</span>
                    <span className="text-[10px] font-bold text-gray-400">Oggi, 14:20</span>
                  </div>
                  <div className="mb-4">
                    <strong className="text-sm text-brand-testo block">Auto Elettrica - AA123BB</strong>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">Blocco motore rilevato in Via Roma. Necessario intervento sul posto.</p>
                  </div>
                  <button className="w-full py-2 bg-stato-attivo text-brand-testo rounded-lg font-bold text-[11px] shadow-sm hover:opacity-90 transition-all cursor-pointer">Assegna tecnico</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}